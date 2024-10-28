import { useState } from "react";
import "../styles/tailwind.css";
import { useTranslation } from "react-i18next";
import { Cart, Product } from "../types/IAppState";
import { useEffect } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState<Product[]>();

  const [cart, setCart] = useState<Cart[]>([]);

  const [total, setTotal] = useState<number>(0);

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/products",
          config
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart",);
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchProducts();
    fetchCart();
  },[]);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await axios.get("http://localhost:3000/total");
        setTotal(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchTotal();
  }, [cart]);

  const addToCart = async (product: number) => {
    try {
      const response = await axios.post("http://localhost:3000/add", {
        product,
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (product: number) => {
    try {
      const response = await axios.post("http://localhost:3000/remove", {
        product,
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }

    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-4">Grocery Store</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            <ul>
              {products &&
                products.map((product) => (
                  <li
                    key={product.name}
                    className="flex justify-between items-center"
                  >
                    <span>{product.name}</span>
                    <span>${product.unitPrice}</span>

                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Cart</h2>
            <ul>
              {cart.map((product) => (
                <li
                  key={product.name}
                  className="flex justify-between items-center"
                >
                  <span>{product.name}</span>
                  <span>
                    ${product.unitPrice} x {product.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4"></div>
            <h3 className="text-xl font-bold">Total</h3>
            <p>${total}</p>
          </div>
        </div>
      </div>
    );
  };
}

export default Home;
