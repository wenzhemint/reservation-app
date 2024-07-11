import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { routerConfig } from './router/router'
import ThemeContext from './context/themeContext'

const router = createBrowserRouter(routerConfig)

function App() {
  return (
    <div className="App">
      <ThemeContext>
        <RouterProvider router={router} />
      </ThemeContext>
    </div>
  );
}

export default App;
