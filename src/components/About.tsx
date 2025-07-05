import { useState, useEffect, useRef } from 'react';
import { Play, Award, Users, Globe, X, Loader2 } from 'lucide-react';

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
  const [showFlipbook, setShowFlipbook] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    // Check if window is defined
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  useEffect(() => {
    // Prevent body scrolling when modal is open
    if (showFlipbook) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showFlipbook]);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  const openFlipbook = () => {
    setIsLoading(true);
    setShowFlipbook(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowFlipbook(false);
      }
    };

    if (showFlipbook) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showFlipbook]);

  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden" id="about">
      {/* Language toggle button */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
        <button 
          onClick={toggleLanguage}
          className="bg-almanbar-gold text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-md hover:bg-almanbar-gold-dark transition-colors"
        >
          {isArabic ? 'English' : 'العربية'}
        </button>
      </div>

      {/* Flipbook Modal */}
      {showFlipbook && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 md:p-4">
          <div 
            ref={modalRef}
            className="relative w-full max-w-5xl h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl"
          >
            <button 
              onClick={() => setShowFlipbook(false)}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-50 bg-almanbar-gold text-white rounded-full p-1 md:p-2 hover:bg-almanbar-gold-dark transition-colors"
            >
              <X size={isMobile ? 20 : 24} />
            </button>
            
            <div className="w-full h-full">
              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-12 h-12 text-almanbar-gold animate-spin mb-3" />
                    <p className="text-almanbar-navy font-medium">
                      {isArabic ? 'جاري تحميل المحتوى...' : 'Loading content...'}
                    </p>
                  </div>
                </div>
              )}
              
              <iframe 
                src="https://heyzine.com/flip-book/bb7ed6f4aa.html" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen
                title="Almanbar World Flipbook"
                className="rounded-lg"
                onLoad={handleIframeLoad}
                // Fix for digest error
                onError={() => setIsLoading(false)}
              ></iframe>
            </div>
            
            <div className="absolute bottom-3 left-0 right-0 text-center text-white px-2">
              <p className="text-xs md:text-sm opacity-80">
                {isArabic ? 'استخدم الأسهم للتنقل أو قم بسحب الصفحات' : 'Use arrows to navigate or drag pages'}
              </p>
            </div>
          </div>
        </div>
      )}

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-almanbar-navy mb-4 md:mb-6">
              {isArabic ? 'من نحن؟' : 'Who We Are?'}
            </h2>
            
            <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
              {isArabic 
                ? 'عالم المنبر هي شركة رائدة في مجال الإنتاج الإعلامي والإعلان، نسعى لتقديم حلول إبداعية ومبتكرة تساعد عملاءنا على تحقيق أهدافهم التجارية وبناء حضور قوي في السوق.'
                : 'ALMANBAR WORLD is a leading company in media production and advertising, striving to provide creative and innovative solutions that help our clients achieve their business goals and build a strong market presence.'
              }
            </p>
            
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
              {isArabic 
                ? 'نؤمن بقوة القصص المؤثرة والمحتوى عالي الجودة في بناء العلاقات مع الجمهور وتعزيز الثقة في العلامة التجارية. فريقنا المتخصص يجمع بين الخبرة والإبداع لتحويل رؤيتكم إلى واقع ملموس.'
                : 'We believe in the power of impactful stories and high-quality content in building audience relationships and enhancing brand trust. Our specialized team combines expertise and creativity to transform your vision into tangible reality.'
              }
            </p>

            {/* Stats - Mobile optimized */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-almanbar-gold/20 rounded-lg md:rounded-xl mb-2 md:mb-3 mx-auto">
                    <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-almanbar-gold" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-almanbar-navy mb-1">
                    {isArabic ? stat.numberAr : stat.numberEn}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 leading-tight">
                    {isArabic ? stat.labelAr : stat.labelEn}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={openFlipbook}
              className="bg-almanbar-gold hover:bg-almanbar-gold-dark text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center group mx-auto lg:mx-0"
            >
              {isArabic ? 'اعرف المزيد عنا' : 'Learn More About Us'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform ${isArabic ? 'transform rotate-180' : ''}`}
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Video Placeholder */}
          <div className="relative animate-scale-in order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative bg-gradient-to-br from-almanbar-navy to-almanbar-navy-light rounded-xl md:rounded-2xl aspect-video overflow-hidden group cursor-pointer">
              <div className="bg-gradient-to-r from-almanbar-navy to-almanbar-navy-light w-full h-full flex items-center justify-center">
                <div className="text-center p-6 md:p-8">
                  <Play className="w-12 h-12 md:w-16 md:h-16 text-almanbar-gold mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {isArabic ? 'مقدمة عن الشركة' : 'Company Introduction'}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base mt-1 md:mt-2">
                    {isArabic ? 'شاهد الفيديو لمعرفة المزيد عنا' : 'Watch our video to learn more'}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-almanbar-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-5 h-5 md:w-8 md:h-8 text-white ml-0.5 md:ml-1" />
                </div>
              </div>

              {/* Video Title */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                  {isArabic ? 'تعرف على قصتنا' : 'Discover Our Story'}
                </h3>
                <p className="text-gray-200 text-sm md:text-base">
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