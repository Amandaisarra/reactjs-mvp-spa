import { Conference, RegistrationForm } from '../types';

// Mock data
const INITIAL_CONFERENCES: Conference[] = [
  {
    id: '1',
    title: 'React Brasil 2024',
    date: '2024-03-15',
    description:
      'A maior conferência de React do Brasil. Venha aprender as últimas novidades do ecossistema React.',
    location: 'São Paulo, SP',
    spaces: 100,
  },
  {
    id: '2',
    title: 'TypeScript Conference',
    date: '2024-04-20',
    description: 'Aprenda TypeScript com os melhores especialistas do mercado.',
    location: 'Rio de Janeiro, RJ',
    spaces: 50,
  },
  {
    id: '3',
    title: 'DevOps Summit',
    date: '2024-05-10',
    description: 'Descubra as melhores práticas de DevOps e como implementá-las em sua empresa.',
    location: 'Belo Horizonte, MG',
    spaces: 75,
  },
];

// Initialize localStorage with mock data if empty
const initializeData = () => {
  if (!localStorage.getItem('conferences')) {
    localStorage.setItem('conferences', JSON.stringify(INITIAL_CONFERENCES));
  }
  if (!localStorage.getItem('registrations')) {
    localStorage.setItem('registrations', JSON.stringify([]));
  }
};

// API Methods
export const api = {
  // Initialize data
  init: () => {
    initializeData();
  },

  // Conference methods
  getConferences: async (): Promise<Conference[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    const conferences = localStorage.getItem('conferences');
    return JSON.parse(conferences || '[]');
  },

  getConference: async (id: string): Promise<Conference | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const conferences = await api.getConferences();
    return conferences.find((conf) => conf.id === id) || null;
  },

  // Registration methods
  register: async (data: RegistrationForm): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get current registrations
    const registrationsJson = localStorage.getItem('registrations');
    const registrations = JSON.parse(registrationsJson || '[]');

    // Add new registration
    registrations.push({
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });

    // Update conferences spaces
    const conferences = await api.getConferences();
    const updatedConferences = conferences.map((conf) => {
      if (conf.id === data.conferenceId) {
        return { ...conf, spaces: conf.spaces - 1 };
      }
      return conf;
    });

    // Save both updates
    localStorage.setItem('registrations', JSON.stringify(registrations));
    localStorage.setItem('conferences', JSON.stringify(updatedConferences));
  },

  // Search method
  searchConferences: async (query: string): Promise<Conference[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const conferences = await api.getConferences();
    const searchTerm = query.toLowerCase();

    return conferences.filter(
      (conf) =>
        conf.title.toLowerCase().includes(searchTerm) ||
        conf.description.toLowerCase().includes(searchTerm) ||
        conf.location.toLowerCase().includes(searchTerm)
    );
  },
};
