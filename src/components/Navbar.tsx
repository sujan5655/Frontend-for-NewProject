import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-blue-600" : "text-white hover:text-blue-600"
    }`;
  return (
    <nav className="border-b border-gray-200 bg-mist-500 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold text-white">
          MyApp
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>

          <NavLink to="/services" className={navLinkClass}>
            Services
          </NavLink>

          <NavLink
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-100 hover:text-blue-600"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
