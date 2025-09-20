/**
 * Custom Hook: useToast - ShoppyGlobe E-commerce
 * 
 * This custom hook provides toast notification functionality inspired by react-hot-toast.
 * It manages a global toast state and provides methods to show, update, and dismiss toasts.
 * 
 * Features:
 * - Global toast state management
 * - Toast queue with limit
 * - Auto-dismiss functionality
 * - Toast updates and dismissals
 * - JavaScript with JSDoc support
 */

"use client"

// Inspired by react-hot-toast library
import * as React from "react"


// Configuration constants
const TOAST_LIMIT = 1                    // Maximum number of toasts to show
const TOAST_REMOVE_DELAY = 1000000      // Delay before removing toast (in ms)

/**
 * Toast Structure Definition
 * 
 * Extends the base toast properties with additional properties for management.
 */
/**
 * ToasterToast Structure
 * @typedef {Object} ToasterToast
 * @property {string} id - Unique identifier
 * @property {React.ReactNode} [title] - Toast title
 * @property {React.ReactNode} [description] - Toast description
 * @property {React.ReactElement} [action] - Action button element
 */

/**
 * Action Types for Toast Management
 * 
 * Defines the available actions for the toast reducer.
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",             // Add a new toast
  UPDATE_TOAST: "UPDATE_TOAST",       // Update an existing toast
  DISMISS_TOAST: "DISMISS_TOAST",     // Dismiss a toast (mark as closed)
  REMOVE_TOAST: "REMOVE_TOAST",       // Remove a toast from state
}

// Counter for generating unique toast IDs
let count = 0

/**
 * Generate Unique Toast ID
 * 
 * Creates a unique identifier for each toast using a counter.
 * Uses modulo to prevent integer overflow.
 * 
 * @returns {string} Unique toast ID
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

/**
 * Action Type Definitions
 * 
 * Defines the structure of actions that can be dispatched to the toast reducer.
 */
/**
 * Action types for toast management
 */

/**
 * Toast State Interface
 * 
 * Defines the structure of the toast state.
 */
/**
 * Toast State Structure
 * @typedef {Object} State
 * @property {ToasterToast[]} toasts - Array of active toasts
 */

/**
 * Toast Timeout Management
 * 
 * Map to track timeouts for auto-removing toasts.
 * Key: toast ID, Value: timeout reference
 */
const toastTimeouts = new Map()

/**
 * Add Toast to Remove Queue
 * 
 * Schedules a toast for removal after the specified delay.
 * Prevents duplicate timeouts for the same toast.
 * 
 * @param toastId - ID of the toast to remove
 */
const addToRemoveQueue = (toastId) => {
  // Prevent duplicate timeouts
  if (toastTimeouts.has(toastId)) {
    return
  }

  // Set timeout to remove toast
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  // Store timeout reference
  toastTimeouts.set(toastId, timeout)
}

/**
 * Toast Reducer
 * 
 * Handles state updates for toast management.
 * Implements all CRUD operations for toasts.
 * 
 * @param state - Current toast state
 * @param action - Action to process
 * @returns New toast state
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        // Add new toast to beginning and limit total count
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        // Update existing toast by ID
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // Schedule toasts for removal
      if (toastId) {
        // Dismiss specific toast
        addToRemoveQueue(toastId)
      } else {
        // Dismiss all toasts
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        // Mark toasts as closed (but don't remove yet)
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        // Remove all toasts
        return {
          ...state,
          toasts: [],
        }
      }
      // Remove specific toast
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

/**
 * Global State Management
 * 
 * Manages global toast state and listeners for cross-component communication.
 */
const listeners = []    // Array of state change listeners
let memoryState = { toasts: [] }                // Global toast state

/**
 * Dispatch Function
 * 
 * Updates global state and notifies all listeners.
 * 
 * @param action - Action to dispatch
 */
function dispatch(action) {
  // Update global state
  memoryState = reducer(memoryState, action)
  
  // Notify all listeners
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

/**
 * Toast Creation Properties
 * 
 * Toast properties for creation (ID is generated automatically).
 */

/**
 * Toast Creation Function
 * 
 * Creates a new toast and returns control methods.
 * 
 * @param props - Toast properties (without ID)
 * @returns Object with toast ID and control methods
 */
function toast({ ...props }) {
  const id = genId()

  // Create update function for this toast
  const update = (props) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  
  // Create dismiss function for this toast
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Add toast to state
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

/**
 * useToast Hook
 * 
 * Custom hook that provides access to toast state and methods.
 * 
 * @returns Object containing:
 *   - toasts: Array of active toasts
 *   - toast: Function to create new toasts
 *   - dismiss: Function to dismiss toasts
 */
function useToast() {
  // Local state that syncs with global state
  const [state, setState] = React.useState(memoryState)

  // Subscribe to global state changes
  React.useEffect(() => {
    listeners.push(setState)
    
    // Cleanup: remove listener on unmount
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,                                                    // Spread toast state
    toast,                                                       // Toast creation function
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }), // Dismiss function
  }
}

// Export the hook and toast function
export { useToast, toast }
