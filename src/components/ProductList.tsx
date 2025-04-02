import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/productsSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice"; // Import funkcji dodawania do koszyka
const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: products,
    status,
    error,
  } = useSelector((state: RootState) => state.products);
  const [hoveredProductId, setHoveredProductId] = React.useState<number | null>(
    null
  );

  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product: any) => {
    const productWithQuantity = { ...product, quantity: 1 };
    dispatch(addToCart(productWithQuantity));
  };

  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 group"
            onMouseEnter={() => setHoveredProductId(product.id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            <Link
              to={`/product/${product.id}`}
              className="text-decoration-none"
            >
              <div className="h-48 overflow-hidden rounded-md mb-4 flex justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className={`object-cover rounded-md mb-4 transition-transform duration-300 transform ${
                    hoveredProductId === product.id ? "scale-110" : ""
                  }`}
                />
              </div>
              <h5 className="text-lg font-semibold text-gray-800 truncate overflow-hidden whitespace-nowrap">
                {product.title}
              </h5>
              <p className="text-gray-600">${product.price}</p>
            </Link>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center space-x-2"
              onClick={() => handleAddToCart(product)}
            >
              <span>Add to Cart</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
