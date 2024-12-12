import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/atoms/Button';
import { conferences } from '../services/mockData';
import { formatDate } from '../utils/date';
import { formatCurrency } from '../utils/currency';
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  SparklesIcon,
  AcademicCapIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { FeaturedConferenceSkeleton } from '../components/molecules/FeaturedConferenceSkeleton';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [featuredConference, setFeaturedConference] = useState<Conference | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedConference = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // Get the first conference as featured
        setFeaturedConference(conferences[0]);
      } catch (error) {
        console.error('Error fetching featured conference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedConference();
  }, []);

  const latestConferences = conferences.slice(0, 3); // Get latest 3 conferences

  return (
    <div className="w-full">
      {/* Hero Section with Featured Conference */}
      <section className="relative bg-gradient-to-br from-primary/90 to-secondary/90 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
              Conferências Tech
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Explore as melhores conferências de tecnologia. Aprenda, conecte-se e evolua com
              especialistas do setor.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/conferences">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-purple-50"
                >
                  Ver Conferências
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white/10"
                >
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Conference */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <FeaturedConferenceSkeleton />
          ) : (
            featuredConference && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Conferência em Destaque
                </h2>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img
                        className="h-48 w-full object-cover md:h-full md:w-48"
                        src={
                          featuredConference.image ||
                          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                        }
                        alt={featuredConference.title}
                      />
                    </div>
                    <div className="p-8">
                      <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                        {featuredConference.category}
                      </div>
                      <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                        {featuredConference.title}
                      </h3>
                      <p className="mt-3 text-gray-600">{featuredConference.description}</p>
                      <div className="mt-4 flex items-center gap-6">
                        <div className="flex items-center text-gray-600">
                          <CalendarIcon className="h-5 w-5 text-primary mr-2" />
                          <span>{formatDate(featuredConference.date)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                          <span>{featuredConference.location}</span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link to={`/register/${featuredConference.id}`}>
                          <Button variant="primary">
                            Inscrever-se por {formatCurrency(featuredConference.price)}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <UserGroupIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">5000+</div>
              <div className="text-gray-600">Participantes</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <AcademicCapIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Palestrantes</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <SparklesIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">30+</div>
              <div className="text-gray-600">Conferências</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Por que escolher nossas conferências?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
                <div className="relative bg-white p-6 rounded-lg">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <LightBulbIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Eventos Selecionados</h3>
                  <p className="text-gray-600">
                    Curadoria das melhores conferências de tecnologia do Brasil.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
                <div className="relative bg-white p-6 rounded-lg">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <UserGroupIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Networking</h3>
                  <p className="text-gray-600">Conecte-se com profissionais e expanda sua rede.</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
                <div className="relative bg-white p-6 rounded-lg">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <SparklesIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Experiência Única</h3>
                  <p className="text-gray-600">Aprenda com os melhores especialistas do mercado.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Fique por dentro das novidades</h2>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              Receba em primeira mão informações sobre novas conferências, palestrantes e promoções
              especiais.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="w-full px-4 py-2 text-sm text-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent placeholder-white"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-purple-50">
                Inscrever
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
