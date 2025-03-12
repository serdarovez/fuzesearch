import { useState, useEffect } from "react";
import DUMMY_PRODUCTS from "../assets/dummyproducts";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  position: "main" | "second";
}

export function useProducts(site: "main" | "second") {
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

    let parsedMainProducts = mainProducts ? JSON.parse(mainProducts) : [];
    let parsedSecondProducts = secondProducts ? JSON.parse(secondProducts) : [];

    if (parsedMainProducts.length === 0 || parsedSecondProducts.length === 0) {
      parsedMainProducts = DUMMY_PRODUCTS.filter((p) => p.position === "main");
      parsedSecondProducts = DUMMY_PRODUCTS.filter(
        (p) => p.position === "second"
      );

      localStorage.setItem("main_products", JSON.stringify(parsedMainProducts));
      localStorage.setItem(
        "second_products",
        JSON.stringify(parsedSecondProducts)
      );
    }

    return [...parsedMainProducts, ...parsedSecondProducts];
  };

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${site}_products`, JSON.stringify(products));
  }, [products, site]);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: Date.now().toString() };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem(`${site}_products`, JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...updatedProduct } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem(`${site}_products`, JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
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
