import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Conference } from '../../types';
import { Button } from '../atoms/Button';
import { AnimatedElement } from '../atoms/AnimatedElement';
import { formatDate } from '../../utils/date';
import { formatCurrency } from '../../utils/currency';
import { CalendarIcon, MapPinIcon, TagIcon } from '@heroicons/react/24/outline';

interface ConferenceCardProps {
  conference: Conference;
  delay?: number;
}

export const ConferenceCard = ({ conference, delay = 0 }: ConferenceCardProps) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(`/register/${conference.id}`);
  };

  return (
    <AnimatedElement animation="slideUp" delay={delay} duration={0.6}>
      <div className="bg-white rounded-lg shadow-sm h-[600px] flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="h-[240px] relative overflow-hidden rounded-t-lg">
          <img
            src={
              conference.image ||
              'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
            }
            alt={conference.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary/10 backdrop-blur-sm text-primary rounded-full text-sm font-medium">
              {conference.category}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary rounded-full text-sm font-bold">
              {formatCurrency(conference.price)}
            </span>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-3 line-clamp-2">{conference.title}</h3>

          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <span>{formatDate(conference.date)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
            <MapPinIcon className="h-5 w-5 text-primary" />
            <span>{conference.location}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {conference.description}
          </p>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-primary font-medium">
                {conference.spaces > 0
                  ? `${conference.spaces} vagas disponíveis`
                  : 'Sem vagas disponíveis'}
              </span>
            </div>

            <Button
              onClick={handleRegister}
              disabled={conference.spaces === 0}
              variant={conference.spaces === 0 ? 'outline' : 'primary'}
              className="w-full"
            >
              {conference.spaces > 0 ? 'Inscrever-se' : 'Esgotado'}
            </Button>
          </div>
        </div>
      </div>
    </AnimatedElement>
  );
};
