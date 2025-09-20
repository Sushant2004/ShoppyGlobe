# ShoppyGlobe E-commerce App

A modern e-commerce app built with React, JavaScript, and Vite. It's got everything you need - product browsing, shopping cart, checkout, and it looks great on all devices.

**Repository:** [https://github.com/Sushant2004/ShoppyGlobe](https://github.com/Sushant2004/ShoppyGlobe)


## 📦 Installation

### Step 1: Clone the repo
```bash
git clone https://github.com/Sushant2004/ShoppyGlobe.git
cd ShoppyGlobe
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Start the dev server
```bash
npm run dev
```

### Step 4: Open in browser
Go to `http://localhost:5173` (or whatever port Vite shows you)

That's it! The app should be running.


## 🏗️ Project Structure

```
react-ecommerce-application-/
├── public/             # Static files
├── src/
│   ├── components/     # UI components
│   │   ├── ui/         # Basic components (buttons, cards, etc.)
│   │   ├── cart.jsx    # Shopping cart
│   │   ├── header.jsx  # Top navigation
│   │   ├── product-list.jsx # Product grid
│   │   └── ...         # Other components
│   ├── hooks/          # Custom hooks
│   │   ├── use-products.js
│   │   └── use-debounce.js
│   ├── lib/            # Utilities
│   │   ├── features/   # Redux slices
│   │   ├── store.js    # Redux setup
│   │   └── utils.js    # Helper functions
│   ├── pages/          # Page components
│   │   ├── HomePage.jsx
│   │   ├── CartPage.jsx
│   │   └── ...
│   ├── App.jsx         # Main app
│   └── main.jsx        # Entry point
├── package.json        # Dependencies
└── vite.config.js      # Vite config
```

## 🔧 Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check code quality

## 🌐 API Integration

Uses [DummyJSON API](https://dummyjson.com/) for product data:
- Fetches real product catalog
- Dynamic category filtering
- Search functionality
- Proper error handling

## 🐛 Troubleshooting

### Common issues:

**Port already in use:**
```bash
# If port 5173 is busy, Vite will use the next available port
# Check the terminal output for the actual port
```

**Dependencies not installing:**
```bash
# Clear npm cache and try again
npm cache clean --force
npm install
```

**Build errors:**
```bash
# Make sure you're using Node 16+ and npm 8+
node --version
npm --version
```

