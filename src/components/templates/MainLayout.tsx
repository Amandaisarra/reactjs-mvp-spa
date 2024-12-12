import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClass = (path: string) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive(path)
        ? 'bg-primary text-white shadow-lg shadow-primary/30'
        : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="h-16 flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors flex items-center gap-2"
            >
              <span className="bg-primary text-white p-1 rounded">CT</span>
              Conferências Tech
            </Link>

            <div className="flex space-x-2">
              <Link to="/" className={navLinkClass('/')}>
                Início
              </Link>
              <Link to="/conferences" className={navLinkClass('/conferences')}>
                Conferências
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-100 mt-auto">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start">
              <Link
                to="/"
                className="text-xl font-bold text-primary hover:text-primary/90 transition-colors flex items-center gap-2"
              >
                <span className="bg-primary text-white p-1 rounded text-sm">CT</span>
                Conferências Tech
              </Link>
              <p className="text-gray-500 mt-2 text-sm">
                {new Date().getFullYear()} Todos os direitos reservados.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Navegação</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
                      Início
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/conferences"
                      className="text-gray-500 hover:text-primary transition-colors"
                    >
                      Conferências
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                      Privacidade
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                      Termos
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
