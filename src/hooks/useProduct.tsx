import { useState, useEffect } from "react";
import DUMMY_PRODUCTS from "../assets/dummyproducts";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  position: "main" | "second";
}

export function useProducts(site: "main" | "second" | "all") {
  // Initialize state from localStorage or dummy data if empty
  const getInitialProducts = () => {
    const storedProducts = localStorage.getItem(`${site}_products`);
    if (storedProducts) return JSON.parse(storedProducts);
    return [];
  };

  const [products, setProducts] = useState<Product[]>(getInitialProducts());

  // Get all products from both sites and initialize if empty
  const getAllProducts = (): Product[] => {
    let mainProducts = localStorage.getItem("main_products");
    let secondProducts = localStorage.getItem("second_products");

    // Parse the products or initialize as empty arrays
    let parsedMainProducts = mainProducts ? JSON.parse(mainProducts) : [];
    let parsedSecondProducts = secondProducts ? JSON.parse(secondProducts) : [];

    // If either main or second products are empty, initialize both from DUMMY_PRODUCTS
    if (parsedMainProducts.length === 0 && parsedSecondProducts.length === 0) {
      parsedMainProducts = DUMMY_PRODUCTS.filter((p) => p.position === "main");
      parsedSecondProducts = DUMMY_PRODUCTS.filter(
        (p) => p.position === "second"
      );

      console.log("products", parsedMainProducts, parsedSecondProducts);

      // Save the initialized products to localStorage
      localStorage.setItem("main_products", JSON.stringify(parsedMainProducts));
      localStorage.setItem(
        "second_products",
        JSON.stringify(parsedSecondProducts)
      );
    }

    // Return all products (main + second)
    return [...parsedMainProducts, ...parsedSecondProducts];
  };

  // Persist changes to localStorage
  // useEffect(() => {
  //   localStorage.setItem(`${site}_products`, JSON.stringify(products));
  // }, [products, site]);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: Date.now() };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem(`${site}_products`, JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    const updatedProducts = products.map((product) =>
      product.id == id ? { ...product, ...updatedProduct } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem(`${site}_products`, JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem(`${site}_products`, JSON.stringify(updatedProducts));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    allProducts: getAllProducts(),
  };
}
