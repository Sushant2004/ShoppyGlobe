// App entry point - sets up React, Redux, and routing

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./lib/store"
import App from "./App"
import "./index.css"

// Get the root element
const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Root element not found. Please ensure there's a div with id='root' in your HTML.")
}

// Render the app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

// Updated: feat: Add main entry point with React 18 setup
