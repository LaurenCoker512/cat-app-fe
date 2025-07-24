import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

const Header = ({ isLoggedIn, user, onLogout }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate("/");
    }
  };

  return (
    <header className="bg-deep-teal text-cream-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <Link
            to="/"
            className="text-2xl font-bold hover:text-dusty-coral transition-colors"
          >
            Purrfect Health
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-dusty-coral transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/cats"
                className="hover:text-dusty-coral transition-colors font-medium"
              >
                My Cats
              </Link>
              <Link
                to="/activities"
                className="hover:text-dusty-coral transition-colors font-medium"
              >
                Activities
              </Link>
              <div className="relative group">
                <button
                  className="flex items-center space-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-dusty-coral rounded-md"
                  id="user-menu-button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-controls="user-menu"
                  tabIndex={0}
                  type="button"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name + " avatar"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {user?.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="sr-only">
                    Open user menu for {user?.name}
                  </span>
                  <span className="font-medium">{user?.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  id="user-menu"
                  role="menu"
                  aria-labelledby="user-menu-button"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 hover:visible hover:opacity-100 transition-all duration-150 border border-gray-200"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-900 hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-none"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-900 hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-none"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-none"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/features"
                className="hover:text-dusty-coral transition-colors font-medium"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="hover:text-dusty-coral transition-colors font-medium"
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="hover:text-dusty-coral transition-colors font-medium"
              >
                About
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-white text-dusty-coral font-medium hover:bg-dusty-coral hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md bg-dusty-coral text-white font-medium hover:bg-white hover:text-dusty-coral transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-700 px-4 py-2">
          <nav className="flex flex-col space-y-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-indigo-200 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/cats"
                  className="hover:text-indigo-200 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Cats
                </Link>
                <Link
                  to="/activities"
                  className="hover:text-indigo-200 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Activities
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-indigo-200 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="hover:text-indigo-200 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left hover:text-indigo-200 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/features"
                  className="hover:text-indigo-200 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className="hover:text-indigo-200 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="/about"
                  className="hover:text-indigo-200 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md bg-white text-indigo-600 font-medium hover:bg-indigo-100 transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-indigo-700 text-white font-medium hover:bg-indigo-800 transition-colors border border-white text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
