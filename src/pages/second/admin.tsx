import React, { useState, useEffect } from "react";
import { useProducts } from "../../hooks/useProduct";

// Interface for Product structure to match your existing code
interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  image?: string; // Add image property to the Product interface
}

export default function SecondAdmin() {
  // Use your existing hook
  const { products, addProduct, deleteProduct } = useProducts("second");

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Image handling state
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load saved products from localStorage on component mount
  useEffect(() => {
    console.log(image);
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        console.log(parsedProducts);
        // Update the products state with the saved products
        // Assuming your useProducts hook has a way to set the products
        // If not, you might need to modify the hook or handle it differently
        // For simplicity, we'll assume the hook can handle it
        // This is just a placeholder, adjust according to your actual implementation
        // setProducts(parsedProducts);
      } catch (error) {
        console.error("Error parsing products from localStorage:", error);
        localStorage.removeItem("products");
      }
    }
  }, []);

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);

      // Create preview using FileReader
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Form submission handler - extending your existing function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new product using your existing pattern
    const newProduct: any = {
      name,
      price: Number(price),
      description,
      image: imagePreview || undefined, // Add image data to the product
    };

    // Add product using your hook
    const addedProduct = addProduct(newProduct);

    // Save product to localStorage
    // if (addedProduct) {
    const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    savedProducts.push(addedProduct);
    localStorage.setItem("products", JSON.stringify(savedProducts));
    // }

    // Reset form - using your existing pattern
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
  };

  // Extended delete handler to also remove products from localStorage
  const handleDeleteProduct = (id: string) => {
    // Call your existing delete function
    deleteProduct(id);

    // Also remove product from localStorage
    const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const updatedProducts = savedProducts.filter(
      (product: Product) => product.id !== id
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Second Site Admin Dashboard
        </h1>

        {/* Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Price Input */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-auto object-contain border border-gray-200 rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Products List
          </h2>

          {products.length === 0 ? (
            <p className="text-gray-500 italic">No products available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow"
                >
                  {/* Product Image (if exists) */}
                  {product.image && (
                    <div className="h-40 flex items-center justify-center mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full w-auto object-contain rounded-md"
                      />
                    </div>
                  )}

                  {/* Product Details */}
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-green-600 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                  <p
                    className="text-gray-600 text-sm mt-1 overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Delete Button */}
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-1 bg-[red] text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
