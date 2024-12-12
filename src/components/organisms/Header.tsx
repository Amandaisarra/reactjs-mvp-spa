import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm relative">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/assets/images/logo.png"
                alt="Tech Conference Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-purple-600 hidden sm:inline">
                Conferências Tech
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                isActive('/')
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Home
            </Link>
            <Link
              to="/conferences"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                isActive('/conferences')
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Conferências
            </Link>
            <Link
              to="/about"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                isActive('/about')
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sobre Nós
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block pl-3 pr-4 py-2 text-base font-medium ${
                  isActive('/')
                    ? 'text-purple-600 bg-purple-50 border-l-4 border-purple-500'
                    : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300 border-l-4 border-transparent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/conferences"
                className={`block pl-3 pr-4 py-2 text-base font-medium ${
                  isActive('/conferences')
                    ? 'text-purple-600 bg-purple-50 border-l-4 border-purple-500'
                    : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300 border-l-4 border-transparent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Conferências
              </Link>
              <Link
                to="/about"
                className={`block pl-3 pr-4 py-2 text-base font-medium ${
                  isActive('/about')
                    ? 'text-purple-600 bg-purple-50 border-l-4 border-purple-500'
                    : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300 border-l-4 border-transparent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nós
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
