import { useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export function useProducts(site: "main" | "second") {
  // Initialize state from localStorage immediately
  const getInitialProducts = () => {
    const storedProducts = localStorage.getItem(`${site}_products`);
    return storedProducts ? JSON.parse(storedProducts) : [];
  };
  const [products, setProducts] = useState<Product[]>(getInitialProducts());

  // Get all products from both sites
  const getAllProducts = (): Product[] => {
    const mainProducts = localStorage.getItem("main_products");
    const secondProducts = localStorage.getItem("second_products");

    const parsedMainProducts = mainProducts ? JSON.parse(mainProducts) : [];
    const parsedSecondProducts = secondProducts
      ? JSON.parse(secondProducts)
      : [];

    return [...parsedMainProducts, ...parsedSecondProducts];
  };

  // Only save to localStorage when products change
  useEffect(() => {
    // Make sure we're only saving when there's actual data
    if (products.length > 0 || localStorage.getItem(`${site}_products`)) {
      localStorage.setItem(`${site}_products`, JSON.stringify(products));
    }
  }, [products, site]);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };

    // Update state and explicitly save to localStorage
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
