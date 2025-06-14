import { useState } from 'react';
import { Camera, Video, Target, Palette, Monitor, TrendingUp } from 'lucide-react';
import { useServices } from '@/hooks/useServices';
import { Link } from 'react-router-dom';

const iconMap = {
  Camera,
  Video,
  Target,
  Palette,
  Monitor,
  TrendingUp,
};

export const Services = () => {
  const [isArabic, setIsArabic] = useState(true);
  const { data: services, isLoading, error } = useServices();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Language Toggle Button */}
        <div className="text-right mb-6">
          <button
            onClick={() => setIsArabic(!isArabic)}
            className="px-4 py-2 bg-almanbar-gold text-white rounded-lg"
            aria-label="Toggle Language"
          >
            {isArabic ? 'English' : 'العربية'}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-almanbar-navy mb-6">
            {isArabic ? 'خدماتنا المتميزة' : 'Our Distinguished Services'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isArabic
              ? 'نقدم مجموعة شاملة من الخدمات الإبداعية والتقنية لتلبية جميع احتياجاتكم في مجال الإعلام والتسويق'
              : 'We offer a comprehensive range of creative and technical services to meet all your media and marketing needs'}
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-almanbar-gold mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {isArabic ? 'جارٍ تحميل الخدمات...' : 'Loading services...'}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-600">
            {isArabic ? 'خطأ في تحميل الخدمات' : 'Error loading services'}
            <pre className="mt-2 text-xs text-red-400">{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service, index) => {
              const IconComponent = iconMap[service.icon_name as keyof typeof iconMap] || Camera;

              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-scale-in border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-almanbar-gold to-almanbar-gold-light rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-almanbar-navy mb-4 group-hover:text-almanbar-gold transition-colors duration-300">
                    {isArabic ? service.title_ar : service.title_en}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {isArabic ? service.description_ar : service.description_en}
                  </p>

                  <Link 
                    to={`/services/${service.id}`}
                    className="block mt-6 text-almanbar-gold font-semibold cursor-pointer group-hover:translate-x-2 transition-transform duration-300"
                  >
                    {isArabic ? 'اعرف المزيد ←' : 'Learn More →'}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};