import { useState } from "react";
import { useProducts } from "../../hooks/useProduct";
import Fuse from "fuse.js"; // Import Fuse.js
import { Link } from "react-router-dom"; // Import Link for navigation

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const { allProducts } = useProducts("main"); // Use 'main' or 'second' based on your requirement

  // Configure Fuse.js options
  const fuseOptions = {
    keys: ["name"], // Search only by product name
    includeScore: true, // Include a score for each result
    threshold: 0.5, // Adjust the threshold for fuzzy matching (0 = exact match, 1 = very loose)
    minMatchCharLength: 1, // Minimum number of characters that must match
  };

  // Initialize Fuse.js with the products and options
  const fuse = new Fuse(allProducts, fuseOptions);

  // Perform fuzzy search
  const fuzzyResults = searchQuery ? fuse.search(searchQuery) : [];

  // Extract the matched products and sort them by price
  const filteredProducts = fuzzyResults
    .map((result) => result.item) // Extract the product from Fuse.js result
    .sort((a, b) => a.price - b.price); // Sort by price

  // Filter products to display only the cheapest one for each name
  const uniqueProducts = filteredProducts.reduce((acc: any, product) => {
    // Check if the product name already exists in the accumulator
    if (!acc[product.name] || acc[product.name].price > product.price) {
      acc[product.name] = product; // Store the cheapest product for each name
    }
    return acc;
  }, {});

  // Convert the unique products object back to an array
  const uniqueProductsArray = Object.values(uniqueProducts);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Product Search
        </h1>

        {/* Search Input */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for a product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueProductsArray.length > 0 ? (
              uniqueProductsArray.map((product: any) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {/* Product Image (if available) */}
                  {product.image && (
                    <div className="w-full aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-green-600 mb-2">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {product.description}
                    </p>

                    {/* Link Button */}
                    <Link
                      to={`${product.position}`} // Adjust the route based on your product source
                      className="w-full inline-block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No matching products found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
