
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Inventory from './components/Inventory/Inventory';
import Orders from './components/Orders/Orders';
import Shop from './components/Shop/Shop';
import Main from './Layout/Main/Main';
import { productsAndCartLoader } from './Loaders/productsAndCartLoader';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: () => {
            return fetch("products.json");
          },
          element: <Shop></Shop>,
        },
        {
          path: "/shop",
          loader: () => {
            return fetch("products.json");
          },
          element: <Shop></Shop>,
        },
        {
          path: "/orders",
          // loader: async () => {
          //   return fetch('products.json')
          // },
          loader: productsAndCartLoader,
          element: <Orders></Orders>,
        },
        {
          path: "/inventory",
          element: <Inventory></Inventory>,
        },
        {
          path: "about",
          element: <About></About>,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
