import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProduct";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts("second");
  //@ts-ignore
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl flex mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Product Image */}
        <Link to={`/second`} className="p-5" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            id="back-arrow"
          >
            <path fill="none" d="M0 0h24v24H0V0z" opacity=".87" />
            <path d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z" />
          </svg>
        </Link>
        {product.image && (
          <div className="w-1/3 aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Product Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-green-600 mb-4">
            {product.price.toFixed(2)} TMT
          </p>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
