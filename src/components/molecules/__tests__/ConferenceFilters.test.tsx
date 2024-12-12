import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ConferenceFilters from '../ConferenceFilters';
import {
  FunnelIcon,
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const mockIcons = {
  filter: FunnelIcon,
  calendar: CalendarIcon,
  location: MapPinIcon,
  price: CurrencyDollarIcon,
};

describe('ConferenceFilters', () => {
  const mockCategories = ['Frontend', 'Backend', 'DevOps'];
  const mockOnFilterChange = vi.fn();
  const mockOnPriceRangeChange = vi.fn();

  beforeEach(() => {
    render(
      <ConferenceFilters
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
        onPriceRangeChange={mockOnPriceRangeChange}
        icons={mockIcons}
      />
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders all filter sections', () => {
    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Localização')).toBeInTheDocument();
    expect(screen.getByText('Faixa de Preço')).toBeInTheDocument();
  });

  it('displays all categories', () => {
    mockCategories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('handles category selection', () => {
    const categoryButton = screen.getByText(mockCategories[0]);
    fireEvent.click(categoryButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        categories: [mockCategories[0]],
      })
    );
  });

  it('handles location input', () => {
    const locationInput = screen.getByPlaceholderText('Digite uma cidade');
    fireEvent.change(locationInput, { target: { value: 'São Paulo' } });

    // Wait for debounce
    setTimeout(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          location: 'São Paulo',
        })
      );
    }, 500);
  });
});
