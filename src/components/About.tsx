
import { useState } from 'react';
import { Play, Award, Users, Globe } from 'lucide-react';

const stats = [
  {
    icon: Award,
    numberAr: '٥٠+',
    numberEn: '50+',
    labelAr: 'مشروع مكتمل',
    labelEn: 'Completed Projects'
  },
  {
    icon: Users,
    numberAr: '٣٠+',
    numberEn: '30+',
    labelAr: 'عميل راضي',
    labelEn: 'Satisfied Clients'
  },
  {
    icon: Globe,
    numberAr: '١٠+',
    numberEn: '10+',
    labelAr: 'دولة',
    labelEn: 'Countries'
  }
];

export const About = () => {
  const [isArabic, setIsArabic] = useState(true);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23101F3F' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-almanbar-navy mb-6">
              {isArabic ? 'من نحن؟' : 'Who We Are?'}
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {isArabic 
                ? 'عالم المنير هي شركة رائدة في مجال الإنتاج الإعلامي والإعلان، نسعى لتقديم حلول إبداعية ومبتكرة تساعد عملاءنا على تحقيق أهدافهم التجارية وبناء حضور قوي في السوق.'
                : 'ALMANBAR WORLD is a leading company in media production and advertising, striving to provide creative and innovative solutions that help our clients achieve their business goals and build a strong market presence.'
              }
            </p>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {isArabic 
                ? 'نؤمن بقوة القصص المؤثرة والمحتوى عالي الجودة في بناء العلاقات مع الجمهور وتعزيز الثقة في العلامة التجارية. فريقنا المتخصص يجمع بين الخبرة والإبداع لتحويل رؤيتكم إلى واقع ملموس.'
                : 'We believe in the power of impactful stories and high-quality content in building audience relationships and enhancing brand trust. Our specialized team combines expertise and creativity to transform your vision into tangible reality.'
              }
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-almanbar-gold/20 rounded-xl mb-3 mx-auto">
                    <stat.icon className="w-6 h-6 text-almanbar-gold" />
                  </div>
                  <div className="text-2xl font-bold text-almanbar-navy mb-1">
                    {isArabic ? stat.numberAr : stat.numberEn}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isArabic ? stat.labelAr : stat.labelEn}
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-almanbar-gold hover:bg-almanbar-gold-dark text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              {isArabic ? 'اعرف المزيد عنا' : 'Learn More About Us'}
            </button>
          </div>

          {/* Video Placeholder */}
          <div className="relative animate-scale-in">
            <div className="relative bg-gradient-to-br from-almanbar-navy to-almanbar-navy-light rounded-2xl aspect-video overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Company Introduction"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-almanbar-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>

              {/* Video Title */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {isArabic ? 'تعرف على قصتنا' : 'Discover Our Story'}
                </h3>
                <p className="text-gray-200">
                  {isArabic ? 'رحلة الإبداع والتميز' : 'A Journey of Creativity and Excellence'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
