import { useForm } from 'react-hook-form';
import { AnimatedElement } from '../atoms/AnimatedElement';
import { Button } from '../atoms/Button';
import { Conference } from '../../types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegistrationFormProps {
  conference: Conference;
  onSubmit: (data: RegistrationData) => Promise<void>;
  isSubmitting: boolean;
}

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  dietaryRestrictions?: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato: (99) 99999-9999'),
});

export const RegistrationForm = ({ conference, onSubmit, isSubmitting }: RegistrationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: yupResolver(schema),
  });

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '');

    // Format as (XX) XXXXX-XXXX
    if (numbers.length >= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
    return numbers;
  };

  return (
    <AnimatedElement animation="scale" duration={0.5}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-8 rounded-lg shadow-sm"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm !bg-transparent
              ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm !bg-transparent
              ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefone *
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="(99) 99999-9999"
            {...register('phone')}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              e.target.value = formatted;
              register('phone').onChange(e);
            }}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm !bg-transparent
              ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Empresa
          </label>
          <input
            type="text"
            id="company"
            {...register('company')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm !bg-transparent"
          />
        </div>

        <div>
          <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">
            Restrições Alimentares
          </label>
          <textarea
            id="dietaryRestrictions"
            {...register('dietaryRestrictions')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm !bg-transparent"
            placeholder="Ex: Vegetariano, Sem Glúten, etc."
          />
        </div>

        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Confirmar Inscrição'}
        </Button>
      </form>
    </AnimatedElement>
  );
};
