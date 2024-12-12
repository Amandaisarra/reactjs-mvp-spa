import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import { motion } from 'framer-motion';
import { conferences } from '../services/mockData';

interface RegistrationForm {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  profession: string;
  company: string;
}

const schema = yup
  .object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    cpf: yup
      .string()
      .required('CPF é obrigatório')
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
    phone: yup
      .string()
      .required('Telefone é obrigatório')
      .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
    birthDate: yup
      .string()
      .required('Data de nascimento é obrigatória')
      .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Data inválida (DD/MM/YYYY)'),
    profession: yup.string().required('Profissão é obrigatória'),
    company: yup.string().required('Empresa é obrigatória'),
  })
  .required();

export default function RegistrationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const conference = conferences.find((c) => c.id === Number(id));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: yupResolver(schema),
  });

  if (!conference) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Conferência não encontrada</h2>
          <button
            onClick={() => navigate('/conferences')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
          >
            Voltar para conferências
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: RegistrationForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/conferences');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Inscrição realizada com sucesso!
          </h2>
          <p className="text-gray-600">Você receberá um email com mais informações.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="px-6 py-4 bg-purple-600">
            <h2 className="text-2xl font-bold text-white">Inscrição para {conference.title}</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                  CPF
                </label>
                <InputMask
                  mask="999.999.999-99"
                  {...register('cpf')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.cpf && <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <InputMask
                  mask="(99) 99999-9999"
                  {...register('phone')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                  Data de nascimento
                </label>
                <input
                  type="text"
                  {...register('birthDate')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.birthDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                  Profissão
                </label>
                <input
                  type="text"
                  {...register('profession')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.profession && (
                  <p className="mt-1 text-sm text-red-600">{errors.profession.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Empresa
                </label>
                <input
                  type="text"
                  {...register('company')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/conferences')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Confirmar inscrição'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
