import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import type { RootState, AppDispatch } from "../store";
import { fetchProductDetail } from "../product/productThunk";
import { addToCart } from "../cart/cartThunk";

function ProductDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { categorySlug, productSlug } = useParams<{
    categorySlug: string;
    productSlug: string;
  }>();

  // Product state
  const product = useSelector(
    (state: RootState) => state.products.selectedProduct,
  );

  const status = useSelector((state: RootState) => state.products.detailStatus);

  const error = useSelector((state: RootState) => state.products.detailError);

  // Cart state
  const addStatus = useSelector((state: RootState) => state.cart.addStatus);

  const addError = useSelector((state: RootState) => state.cart.addError);

  // Fetch product when page loads
  useEffect(() => {
    if (categorySlug && productSlug) {
      dispatch(
        fetchProductDetail({
          categorySlug,
          productSlug,
        }),
      );
    }
  }, [dispatch, categorySlug, productSlug]);

  // Loading state
  if (status === "loading") {
    return <h2>Loading product...</h2>;
  }

  // Error state
  if (status === "failed") {
    return <h2>{error}</h2>;
  }

  // Product not found
  if (!product) {
    return <h2>Product not found</h2>;
  }

  // Add product to cart
  const handleAddToCart = async () => {
    const result = await dispatch(addToCart(product.id));

    // Only navigate if adding to cart was successful
    if (addToCart.fulfilled.match(result)) {
      navigate("/cart");
    }
  };

  return (
    <div className="min-h-screen bg-olive-400 p-8">
      <Link
        to="/"
        className="inline-block mb-6 bg-cyan-900 text-white px-5 py-2 rounded-lg hover:bg-cyan-700 transition"
      >
        ← Back to Home
      </Link>

      <div className="max-w-6xl mx-auto bg-white rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 mb-2">{product.category_name}</p>

            <h1 className="text-4xl font-bold">{product.product_name}</h1>

            <p className="text-2xl font-semibold mt-4">${product.price}</p>

            <p className="text-gray-600 mt-6">{product.product_description}</p>

            <p className="mt-6">Stock: {product.stock}</p>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addStatus === "loading" || product.stock <= 0}
              className="mt-6 bg-cyan-900 text-white py-3 px-6 rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock <= 0
                ? "Out of Stock"
                : addStatus === "loading"
                  ? "Adding..."
                  : "Add to Cart"}
            </button>

            {/* Cart Error */}
            {addStatus === "failed" && (
              <p className="text-red-500 mt-2">
                {addError || "Failed to add product to cart"}
              </p>
            )}

            {/* Cart Success */}
            {addStatus === "succeeded" && (
              <p className="text-green-600 mt-2">Product added to cart!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
