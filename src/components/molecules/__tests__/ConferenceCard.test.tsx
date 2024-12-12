import { render, screen } from '@testing-library/react';
import { ConferenceCard } from '../ConferenceCard';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BrowserRouter } from 'react-router-dom';

const mockConference = {
  id: '1',
  title: 'Test Conference',
  description: 'Test Description',
  date: '2023-12-31',
  location: 'Test Location',
  price: 100,
  image: 'test-image.jpg',
  category: 'Technology',
  spaces: 10,
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ConferenceCard', () => {
  it('renders conference information correctly', () => {
    renderWithRouter(<ConferenceCard conference={mockConference} />);

    expect(screen.getByText(mockConference.title)).toBeInTheDocument();
    expect(screen.getByText(mockConference.description)).toBeInTheDocument();
    expect(screen.getByText(mockConference.location)).toBeInTheDocument();
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
    expect(
      screen.getByText(
        format(new Date(mockConference.date), "d 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        })
      )
    ).toBeInTheDocument();
  });

  it('shows available spots when spots are available', () => {
    renderWithRouter(<ConferenceCard conference={mockConference} />);
    expect(screen.getByText('10 vagas disponíveis')).toBeInTheDocument();
    expect(screen.getByText('Inscrever-se')).toBeInTheDocument();
  });

  it('shows sold out message when no spots available', () => {
    renderWithRouter(<ConferenceCard conference={{ ...mockConference, spaces: 0 }} />);
    expect(screen.getByText('Sem vagas disponíveis')).toBeInTheDocument();
    expect(screen.getByText('Esgotado')).toBeInTheDocument();
  });
});
