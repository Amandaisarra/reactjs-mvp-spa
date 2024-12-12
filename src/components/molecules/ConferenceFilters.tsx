import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useDebounce } from 'use-debounce';
import { formatCurrency } from '../../utils/currency';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';

// Register pt-BR locale for DatePicker
registerLocale('pt-BR', ptBR);

interface ConferenceFiltersProps {
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  icons: {
    filter: React.ElementType;
    calendar: React.ElementType;
    location: React.ElementType;
    price: React.ElementType;
  };
}

interface FilterState {
  categories: string[];
  date: Date | null;
  location: string;
}

const ConferenceFilters = ({
  categories,
  onFilterChange,
  onPriceRangeChange,
  icons,
}: ConferenceFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    date: null,
    location: '',
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isOpen, setIsOpen] = useState(true);
  const [debouncedLocation] = useDebounce(filters.location, 2000);

  useEffect(() => {
    onFilterChange({
      ...filters,
      location: debouncedLocation,
    });
  }, [debouncedLocation]);

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateChange = (date: Date | null) => {
    const newFilters = { ...filters, date };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLocationChange = (location: string) => {
    setFilters((prev) => ({ ...prev, location }));
    // The actual filter will be applied when the debounced value changes
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
    onPriceRangeChange(value);
  };

  const clearFilters = () => {
    setFilters({ categories: [], date: null, location: '' });
    setPriceRange([0, 1000]);
    onFilterChange({ categories: [], date: null, location: '' });
    onPriceRangeChange([0, 1000]);
  };

  const FilterIcon = icons.filter;
  const CalendarIcon = icons.calendar;
  const LocationIcon = icons.location;
  const PriceIcon = icons.price;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div
        className="p-4 bg-purple-600 text-white flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <FilterIcon className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Filtros</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearFilters();
          }}
          className="text-sm hover:text-purple-200 transition-colors"
        >
          Limpar filtros
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-6">
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <span className="p-1.5 bg-purple-100 rounded-md">
                <FilterIcon className="w-4 h-4 text-purple-600" />
              </span>
              Categorias
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="truncate">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <span className="p-1.5 bg-purple-100 rounded-md">
                <CalendarIcon className="w-4 h-4 text-purple-600" />
              </span>
              Data
            </h4>
            <DatePicker
              selected={filters.date}
              onChange={handleDateChange}
              locale="pt-BR"
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione uma data"
              isClearable
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <span className="p-1.5 bg-purple-100 rounded-md">
                <LocationIcon className="w-4 h-4 text-purple-600" />
              </span>
              Localização
            </h4>
            <div className="relative">
              <input
                type="text"
                value={filters.location}
                onChange={(e) => handleLocationChange(e.target.value)}
                placeholder="Digite uma cidade"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-transparent"
              />
              {filters.location !== debouncedLocation && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  Buscando...
                </span>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <span className="p-1.5 bg-purple-100 rounded-md">
                <PriceIcon className="w-4 h-4 text-purple-600" />
              </span>
              Faixa de Preço
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatCurrency(priceRange[0])}</span>
                <span>{formatCurrency(priceRange[1])}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-purple-600 bg-white"
              />
            </div>
          </div>

          {(filters.categories.length > 0 ||
            filters.date ||
            filters.location ||
            priceRange[1] < 1000) && (
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-2">Filtros ativos:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {category}
                  </span>
                ))}
                {filters.date && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {filters.date.toLocaleDateString('pt-BR')}
                  </span>
                )}
                {filters.location && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {filters.location}
                  </span>
                )}
                {priceRange[1] < 1000 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Até {formatCurrency(priceRange[1])}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConferenceFilters;
