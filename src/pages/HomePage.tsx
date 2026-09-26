// import React from "react";

// import { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";

// import type { RootState, AppDispatch } from "../store";

// import { fetchProducts } from "../product/productThunk";

// function HomePage() {
//   // const [products, setProducts] = useState<Product[]>([]);
//   // const [loading, setLoading] = useState<boolean>(true);
//   // const [error, setError] = useState<string>("");

//   const dispatch = useDispatch<AppDispatch>();

//   const { products, productCount, status, error } = useSelector(
//     (state: RootState) => state.products,
//   );

//   const [search, setSearch] = useState("");
// const [maxPrice, setMaxPrice] = useState(5000);

// useEffect(()=>{
//   dispatch(
//     fetchProducts(
//       {
//         search:"",

//       }
//     )
//   )
// },[dispatch])
// const handleSearch = (e: React.FormEvent) => {
//   e.preventDefault();

//   dispatch(
//     fetchProducts({
//       search,
//       maxPrice,
//     })
//   );
// };

//   if (status === "loading") {
//     return <h2>Loading products...</h2>;
//   }

//   if (status === "failed") {
//     return <h2>{error}</h2>;
//   }

//   return (
//     <div className="min-h-screen bg-olive-400">
//       <div>
//        <form
//   onSubmit={handleSearch}
//   className="flex flex-col md:flex-row gap-3 justify-center"
// >
//   <div className="flex">

//     <input
//       type="text"
//       value={search}
//       onChange={(e) => setSearch(e.target.value)}
//       placeholder="Search for the tool you like"
//       className="w-full md:w-80 px-3 h-10 rounded-l bg-white border-2 border-black focus:outline-none focus:border-sky-500"
//     />

//     <button
//       type="submit"
//       className="bg-sky-500 text-white rounded-r px-2 md:px-3"
//     >
//       Search
//     </button>

//   </div>
// </form>
// <div className="flex flex-col items-center mt-5">

//   <label className="text-white mb-2">
//     Maximum Price: {maxPrice}
//   </label>

//   <input
//     type="range"
//     min="0"
//     max="5000"
//     step="100"
//     value={maxPrice}
//     onChange={(e) => {
//       const value = Number(e.target.value);

//       setMaxPrice(value);

//       dispatch(
//         fetchProducts({
//           search,
//           maxPrice: value,
//         })
//       );
//     }}
//     className="w-80"
//   />

// </div>

//       </div>

//       <div className="bg-olive-400 p-8">
//         <div className="">
//           <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-1">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 className="group border rounded-lg p-4 bg-white hover:bg-cyan-900 hover:scale-105 transition-all duration-300 ease-in-out "
//               >
//                 {product.images && (
//                   <img
//                     src={product.image_url || "/placeholder.png"}
//                     alt={product.product_name}
//                     style={{
//                       width: "100%",
//                       height: "220px",
//                       objectFit: "cover",
//                       borderRadius: "8px",
//                     }}
//                   />
//                 )}

//                 <h3 className="mt-3 font-semibold group-hover:text-white transition-colors duration-300">
//                   {product.product_name}
//                 </h3>

//                 <p className="text-gray-600 hover:text-white group-hover:text-white transition-colors duration-300">
//                   ${product.price}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../store";

import { fetchProducts } from "../product/productThunk";

import { fetchCategories } from "../category/categoryThunk";

import {
  setSearch,
  setMaxPrice,
  setCategory,
  clearFilters,
} from "../product/productSlice";

import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  // =========================================
  // PRODUCTS FROM REDUX
  // =========================================

  const {
    products,
    productCount,
    status,
    error,
    productsLoaded,

    filters,
  } = useSelector((state: RootState) => state.products);

  // =========================================
  // CATEGORIES FROM REDUX
  // =========================================

  const { categories, status: categoryStatus } = useSelector(
    (state: RootState) => state.categories,
  );

  // =========================================
  // LOAD CATEGORIES ONLY ONCE
  // =========================================

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoryStatus]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    dispatch(setMaxPrice(value));
  };
  // =========================================
  // LOAD PRODUCTS ONLY FIRST TIME
  // =========================================
  // Initial products
  useEffect(() => {
    if (!productsLoaded) {
      dispatch(
        fetchProducts({
          search: filters.search,
          maxPrice: filters.maxPrice,
          category: filters.category,
        }),
      );
    }
  }, [dispatch, productsLoaded]);

  // Filter changes
  useEffect(() => {
    if (!productsLoaded) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(
        fetchProducts({
          search: filters.search,
          maxPrice: filters.maxPrice,
          category: filters.category,
        }),
      );
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [
    dispatch,
    filters.search,
    filters.maxPrice,
    filters.category,
    productsLoaded,
  ]);
  // =========================================
  // CLEAR FILTERS
  // =========================================

  const handleClear = () => {
    dispatch(clearFilters());

    dispatch(
      fetchProducts({
        search: "",
        maxPrice: 5000,
        category: undefined,
      }),
    );
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || undefined;

    dispatch(setCategory(value));
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      fetchProducts({
        search: filters.search,
        maxPrice: filters.maxPrice,
        category: filters.category,
      }),
    );
  };

  // =========================================
  // LOADING
  // =========================================

  if (status === "loading" && !productsLoaded) {
    return <h2>Loading products...</h2>;
  }

  // =========================================
  // ERROR
  // =========================================

  if (status === "failed") {
    return <h2>{error}</h2>;
  }

  // =========================================
  // UI
  // =========================================

  return (
    <div className="min-h-screen bg-olive-400">
      {/* ================================= */}
      {/* SEARCH + FILTERS */}
      {/* ================================= */}

      <div className="pt-8 flex justify-center">
        <form onSubmit={handleSearch} className="flex items-center gap-4">
          {/* SEARCH */}

          <input
            type="text"
            value={filters.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search for the tool you like"
            className="w-80 h-10 px-3 rounded bg-white border-2 border-black focus:outline-none focus:border-sky-500"
          />

          {/* SEARCH BUTTON */}

          <button
            type="submit"
            className="bg-sky-500 text-white px-4 h-10 rounded"
          >
            Search
          </button>

          {/* CATEGORY */}

          <select
            value={filters.category ?? ""}
            onChange={handleCategoryChange}
            className="w-80 h-10 px-3 bg-white border-2 border-black rounded"
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.category_name}
              </option>
            ))}
          </select>

          {/* PRICE */}

          <div className="flex items-center gap-3">
            <label className="text-white whitespace-nowrap">
              Maximum Price: ${filters.maxPrice}
            </label>

            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="w-80"
            />
          </div>

          {/* CLEAR */}

          <button
            type="button"
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
        </form>
      </div>

      {/* ================================= */}
      {/* PRODUCT COUNT */}
      {/* ================================= */}

      <div className="text-white text-center mt-6">
        <p>{productCount} products found</p>
      </div>

      {/* ================================= */}
      {/* PRODUCTS */}
      {/* ================================= */}

      <div className="bg-olive-400 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.category_slug}/${product.slug}`}
              className="group border rounded-lg p-4 bg-white hover:bg-cyan-900 hover:scale-105 transition-all duration-300"
            >
              {/* IMAGE */}

              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-full h-[220px] object-cover rounded-lg"
                />
              )}

              {/* NAME */}

              <h3 className="mt-3 font-semibold group-hover:text-white">
                {product.product_name}
              </h3>

              {/* PRICE */}

              <p className="text-gray-600 group-hover:text-white">
                ${product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
