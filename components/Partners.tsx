
import { useState } from 'react';
import { usePartners } from '@/hooks/usePartners';

export const Partners = () => {
  const [isArabic, setIsArabic] = useState(true);
  const { data: partners, isLoading, error } = usePartners();

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-almanbar-gold mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {isArabic ? 'جارٍ تحميل الشركاء...' : 'Loading partners...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            {isArabic ? 'خطأ في تحميل الشركاء' : 'Error loading partners'}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-almanbar-navy mb-6">
            {isArabic ? 'شركاؤنا' : 'Our Partners'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isArabic 
              ? 'نفتخر بالعمل مع مجموعة من أفضل الشركات والمؤسسات لتقديم خدمات متميزة'
              : 'We are proud to work with a group of the finest companies and institutions to provide exceptional services'
            }
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners?.map((partner, index) => (
            <div
              key={partner.id}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={partner.logo_url || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop'}
                  alt={isArabic ? partner.name_ar : partner.name_en}
                  className="w-full h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-center text-sm font-semibold text-gray-700 mt-4 group-hover:text-almanbar-gold transition-colors duration-300">
                {isArabic ? partner.name_ar : partner.name_en}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
