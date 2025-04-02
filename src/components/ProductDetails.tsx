import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/productsSlice";
import { addToCart } from "../redux/slices/cartSlice";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { items: products, status } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const product = products.find((p) => p.id === Number(productId));

  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const handleAddToCart = (quantity: number) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
      })
    );
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mb-4"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded shadow-md overflow-hidden flex items-center justify-center p-4">
          <img src={product.image} alt={product.title} className="w-1/2" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-blue-600">{product.title}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-xl font-semibold mt-4">
            Price: <span className="text-green-500">${product.price}</span>
          </p>
          <p className="text-gray-500 mt-2">Category: {product.category}</p>

          <div className="mt-6">
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="quantity" className="font-medium">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                className="w-16 border border-gray-300 rounded px-2 py-1"
                min="1"
                defaultValue="1"
              />
            </div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center space-x-2"
              onClick={() =>
                handleAddToCart(
                  Number(
                    (document.getElementById("quantity") as HTMLInputElement)
                      .value
                  )
                )
              }
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
