import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPaginate from 'react-paginate';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { ConferenceCard } from '../components/molecules/ConferenceCard';
import ConferenceFilters from '../components/molecules/ConferenceFilters';
import { Conference } from '../types';
import { ConferenceCardSkeleton } from '../components/molecules/ConferenceCardSkeleton';
import { conferences as mockConferences } from '../services/mockData';

const ITEMS_PER_PAGE = 12;

export default function ConferencesPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConferences = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setConferences(mockConferences);
      } catch (error) {
        console.error('Error fetching conferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConferences();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(conferences.map((conf) => conf.category));
    return Array.from(uniqueCategories).sort();
  }, [conferences]);

  const filteredConferences = useMemo(() => {
    return conferences.filter((conference) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(conference.category);
      const matchesDate =
        !selectedDate || new Date(conference.date).toDateString() === selectedDate.toDateString();
      const matchesLocation =
        !selectedLocation ||
        conference.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesPrice = conference.price >= priceRange[0] && conference.price <= priceRange[1];
      const matchesSearch =
        !searchTerm ||
        conference.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conference.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesDate && matchesLocation && matchesPrice && matchesSearch;
    });
  }, [selectedCategories, selectedDate, selectedLocation, priceRange, searchTerm, conferences]);

  const pageCount = Math.ceil(filteredConferences.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentConferences = filteredConferences.slice(offset, offset + ITEMS_PER_PAGE);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filters: {
    categories: string[];
    date: Date | null;
    location: string;
  }) => {
    setSelectedCategories(filters.categories);
    setSelectedDate(filters.date);
    setSelectedLocation(filters.location);
    setCurrentPage(0);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    setCurrentPage(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Conferências</h1>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
            placeholder="Buscar conferências..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-80 flex-shrink-0">
          <div className="sticky top-8">
            <ConferenceFilters
              categories={categories}
              onFilterChange={handleFilterChange}
              onPriceRangeChange={handlePriceRangeChange}
              icons={{
                filter: FunnelIcon,
                calendar: CalendarIcon,
                location: MapPinIcon,
                price: CurrencyDollarIcon,
              }}
            />
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {filteredConferences.length}{' '}
              {filteredConferences.length === 1
                ? 'conferência encontrada'
                : 'conferências encontradas'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              Array(6)
                .fill(null)
                .map((_, index) => <ConferenceCardSkeleton key={`skeleton-${index}`} />)
            ) : currentConferences.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {currentConferences.map((conference, index) => (
                  <motion.div
                    key={conference.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ConferenceCard conference={conference} delay={index * 0.1} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma conferência encontrada
                </h3>
                <p className="text-gray-500">Tente ajustar seus filtros ou fazer uma nova busca</p>
              </motion.div>
            )}
          </AnimatePresence>

          {pageCount > 1 && (
            <div className="mt-8">
              <ReactPaginate
                previousLabel="Anterior"
                nextLabel="Próxima"
                pageCount={pageCount}
                onPageChange={handlePageChange}
                forcePage={currentPage}
                containerClassName="flex items-center justify-center gap-2"
                pageClassName="px-3 py-1 rounded hover:bg-purple-100 transition-colors"
                previousClassName="px-3 py-1 rounded hover:bg-purple-100 transition-colors"
                nextClassName="px-3 py-1 rounded hover:bg-purple-100 transition-colors"
                activeClassName="!bg-purple-600 text-white"
                disabledClassName="opacity-50 cursor-not-allowed hover:bg-transparent"
                breakLabel="..."
                breakClassName="px-3 py-1"
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
