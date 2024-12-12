import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { RegistrationForm } from '../RegistrationForm';

vi.mock('@hookform/resolvers/yup', () => ({
  yupResolver: () => (data: any) =>
    Promise.resolve({
      values: data,
      errors: {},
    }),
}));

const mockConference = {
  id: '1',
  name: 'Test Conference',
  date: '2024-01-01',
  location: 'Test Location',
  description: 'Test Description',
  image: 'test.jpg',
  price: 100,
  category: 'Test Category',
};

const mockOnSubmit = vi.fn().mockImplementation(() => Promise.resolve());

describe('RegistrationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(
      <RegistrationForm conference={mockConference} onSubmit={mockOnSubmit} isSubmitting={false} />
    );

    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/empresa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/restrições alimentares/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirmar inscrição/i })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(
      <RegistrationForm conference={mockConference} onSubmit={mockOnSubmit} isSubmitting={false} />
    );

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/telefone/i);
    const companyInput = screen.getByLabelText(/empresa/i);
    const dietaryInput = screen.getByLabelText(/restrições alimentares/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '11999999999' } });
    fireEvent.change(companyInput, { target: { value: 'Test Company' } });
    fireEvent.change(dietaryInput, { target: { value: 'No restrictions' } });

    const submitButton = screen.getByRole('button', { name: /confirmar inscrição/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '(11) 99999-9999',
          company: 'Test Company',
          dietaryRestrictions: 'No restrictions',
        },
        expect.any(Object)
      );
    });
  });

  it('formats phone number while typing', () => {
    render(
      <RegistrationForm conference={mockConference} onSubmit={mockOnSubmit} isSubmitting={false} />
    );

    const phoneInput = screen.getByLabelText(/telefone/i);
    fireEvent.change(phoneInput, { target: { value: '11999999999' } });
    expect(phoneInput).toHaveValue('(11) 99999-9999');
  });
});
