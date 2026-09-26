// import React, { useEffect, useState } from "react";
// interface Product {
//   id: number;
//   product_name: string;
//   slug: string;
//   product_description: string;
//   price: number;
//   images: string;
//   image_url: string | null;
//   stock: number;
//   is_available: boolean;
//   category: number;
//   category_name: string;
//   created_date: string;
//   modified_date: string;
// }
// interface ProductResponse {
//   product_count: number;
//   products: Product[];
// }
// function BuyerDashboard() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");
//   const API_URL = "http://127.0.0.1:8000/api/store/";
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data: ProductResponse = await response.json();
//         setProducts(data.products);
//       } catch (error) {
//         console.error(error);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);
//   if (loading) {
//     return <h2>Loading products...</h2>;
//   }
//   if (error) {
//     return <h2>{error}</h2>;
//   }
//   return (
//     <div>
//       {" "}
//       <h1>Hello from Buyer Dashboard</h1>
//       <h2>Products ({products.length})</h2>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: "20px",
//           padding: "20px",
//         }}
//       >
//         {" "}
//         {products.map((product) => (
//           <div
//             key={product.id}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "10px",
//               padding: "15px",
//             }}
//           >
//             {" "}
//             <img
//               src={product.image_url || "/placeholder.png"}
//               alt={product.product_name}
//               style={{
//                 width: "100%",
//                 height: "220px",
//                 objectFit: "cover",
//                 borderRadius: "8px",
//               }}
//             />
//             <h3>{product.product_name}</h3> <p>{product.product_description}</p>{" "}
//             <p>
//               {" "}
//               <strong>Price:</strong> Rs. {product.price}{" "}
//             </p>{" "}
//             <p>
//               {" "}
//               <strong>Stock:</strong> {product.stock}{" "}
//             </p>{" "}
//             <p>
//               {" "}
//               <strong>Category:</strong> {product.category_name}{" "}
//             </p>{" "}
//             <p>
//               {" "}
//               <strong>Status:</strong>{" "}
//               {product.is_available ? "Available" : "Unavailable"}{" "}
//             </p>{" "}
//           </div>
//         ))}{" "}
//       </div>{" "}
//     </div>
//   );
// }
// export default BuyerDashboard;

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface ProductResponse {
  products: Product[];
}

function BuyerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Dropdown states
  const [analyticsOpen, setAnalyticsOpen] = useState<boolean>(true);
  const [teamOpen, setTeamOpen] = useState<boolean>(false);

  const API_URL = "http://127.0.0.1:8000/api/store/";

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: ProductResponse = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error(error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="flex  bg-gray-100">
      ```
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 h-screen flex-shrink-0 bg-pink-900 text-white flex flex-col overflow-y-auto">
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <img
              src="https://tailwindflex.com/images/logo.svg"
              alt="Logo"
              className="h-8 w-auto"
            />

            <span className="text-xl font-bold">Admin Pro</span>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search..."
            />

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-2 flex-1">
          <div className="space-y-4">
            {/* Dashboard */}
            <a
              href="#"
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 text-white group transition-all duration-200 hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </a>

            {/* ================= ANALYTICS ================= */}
            <div className="space-y-1">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
                aria-expanded={analyticsOpen}
                aria-controls="analytics-dropdown"
                onClick={() => setAnalyticsOpen((previous) => !previous)}
              >
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Analytics
                </div>

                <svg
                  className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
                    analyticsOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                id="analytics-dropdown"
                className={`space-y-1 pl-11 ${analyticsOpen ? "" : "hidden"}`}
              >
                <a
                  href="#"
                  className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  Overview
                </a>

                <a
                  href="#"
                  className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  Reports
                </a>

                <a
                  href="#"
                  className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  Statistics
                </a>
              </div>
            </div>

            {/* ================= TEAM ================= */}
            <div className="space-y-1">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
                aria-expanded={teamOpen}
                aria-controls="team-dropdown"
                onClick={() => setTeamOpen((previous) => !previous)}
              >
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Team
                </div>

                <svg
                  className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
                    teamOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                id="team-dropdown"
                className={`space-y-1 pl-11 ${teamOpen ? "" : "hidden"}`}
              >
                <a
                  href="#"
                  className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  Members
                </a>

                <a
                  href="#"
                  className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  Calendar
                </a>

                <a
                  href="#"
                  className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  Settings
                </a>
              </div>
            </div>

            {/* Projects */}
            <a
              href="#"
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg
                className="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              Projects
            </a>

            {/* Calendar */}
            <a
              href="#"
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg
                className="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Calendar
            </a>

            {/* Documents */}
            <a
              href="#"
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg
                className="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Documents
            </a>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
            />

            <div className="ml-3">
              <p className="text-sm font-medium text-white">Tom Cook</p>

              <p className="text-xs text-gray-400">View profile</p>
            </div>
          </div>
        </div>
      </aside>
      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 min-w-0 min-h-screen p-6 bg-pink-900 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>

        <div className="mt-4 p-6 bg-pink-900 rounded-lg shadow-md">
          {/* Products */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group border rounded-lg p-4 bg-white hover:bg-cyan-900 hover:scale-105 transition-all duration-300 ease-in-out "
                >
                  {product.images && (
                    <img
                      src={product.image_url || "/placeholder.png"}
                      alt={product.product_name}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}

                  <h3 className="mt-3 font-semibold group-hover:text-white transition-colors duration-300">
                    {product.product_name}
                  </h3>

                  <p className="text-gray-600 hover:text-white group-hover:text-white transition-colors duration-300">
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BuyerDashboard;
