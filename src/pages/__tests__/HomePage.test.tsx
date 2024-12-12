import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import HomePage from '../HomePage';

// Mock framer-motion to prevent animation issues
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock conferences data
vi.mock('../services/mockData', () => ({
  conferences: [
    {
      id: 1,
      title: 'Test Conference',
      date: '2024-01-01',
      location: 'Test Location',
      price: 100,
      category: 'Test Category',
      description: 'Test Description',
    },
  ],
}));

describe('HomePage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  });

  it('renders main heading and description', () => {
    expect(screen.getByText('Conferências Tech')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Explore as melhores conferências de tecnologia. Aprenda, conecte-se e evolua com especialistas do setor.'
      )
    ).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    expect(screen.getByText('Ver Conferências')).toBeInTheDocument();
    expect(screen.getByText('Saiba Mais')).toBeInTheDocument();
  });

  it('renders statistics', () => {
    expect(screen.getByText('5000+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('30+')).toBeInTheDocument();
  });

  it('renders feature section titles', () => {
    expect(screen.getByText('Por que escolher nossas conferências?')).toBeInTheDocument();
    expect(screen.getByText('Eventos Selecionados')).toBeInTheDocument();
    expect(screen.getByText('Networking')).toBeInTheDocument();
    expect(screen.getByText('Experiência Única')).toBeInTheDocument();
  });
});
