import { useState } from "react";
import "../styles/tailwind.css";
import { useTranslation } from "react-i18next";

interface product {
  name: string;
  unitPrice: number;
  quantity: number;
}
function Home() {
  const inventories = [
    { name: "bacon", unitPrice: 10.99, quantity: 10 },
    { name: "eggs", unitPrice: 3.99, quantity: 10 },
    { name: "cheese", unitPrice: 6.99, quantity: 10 },
    { name: "chives", unitPrice: 1.0, quantity: 10 },
    { name: "wine", unitPrice: 11.99, quantity: 10 },
    { name: "brandy", unitPrice: 17.55, quantity: 10 },
    { name: "bananas", unitPrice: 0.69, quantity: 10 },
    { name: "ham", unitPrice: 2.69, quantity: 10 },
    { name: "tomatoes", unitPrice: 3.26, quantity: 10 },
    { name: "tissue", unitPrice: 8.45, quantity: 10 },
  ];
  const [products, setProducts] = useState<product[]>(inventories);

  const [cart, setCart] = useState<product[]>([]);

  const addToCart = (product: string) => {
    const newCart = [...cart];
    const inventory = [...products];
    const existingProduct = newCart.find((p) => p.name === product);
    const inventoryProduct = inventory.find((p) => p.name === product);

    if (inventoryProduct && inventoryProduct.quantity > 0) {
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        newCart.push({ ...inventoryProduct, quantity: 1 });
      }
      setCart(newCart);
      inventoryProduct.quantity -= 1;
      inventory[inventory.findIndex((p) => p.name === product)] =
        inventoryProduct;
      setProducts(inventory);
    }
  };

  const removeFromCart = (product: string) => {
    const newCart = [...cart];
    const inventory = [...products];
    const existingProduct = newCart.find((p) => p.name === product);
    const inventoryProduct = inventory.find((p) => p.name === product);

    if (existingProduct && inventoryProduct && existingProduct.quantity > 0) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity === 0) {
        const updatedCart = newCart.filter((p) => p.name !== product);
        setCart(updatedCart);
      }

      inventoryProduct.quantity += 1;
      inventory[inventory.findIndex((p) => p.name === product)] =
        inventoryProduct;
      setProducts(inventory);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-4">Grocery Store</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <ul>
            {products.map((product) => (
              <li
                key={product.name}
                className="flex justify-between items-center"
              >
                <span>{product.name}</span>
                <span>${product.unitPrice}</span>
                <span>{product.quantity} in stock</span>
                <button
                  onClick={() => addToCart(product.name)}
                  disabled={product.quantity === 0}
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
                  onClick={() => removeFromCart(product.name)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
