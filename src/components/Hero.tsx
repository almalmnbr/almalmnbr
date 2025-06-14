// Hero.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const [isArabic, setIsArabic] = useState(true);
  const { user, signOut, isAdmin } = useAuth();  // Destructure `signOut` from `useAuth`

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-almanbar-navy via-almanbar-navy-light to-almanbar-navy-dark">
        <div 
          className="absolute inset-0 animate-float"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23DDA119' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          variant="outline"
          onClick={() => setIsArabic(!isArabic)}
          className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 font-english"
        >
          {isArabic ? 'EN' : 'عربي'}
        </Button>
      </div>

      {/* Admin Link */}
      {user && isAdmin && (
        <div className="absolute top-6 left-6 z-20">
          <Link to="/admin">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            >
              لوحة التحكم
            </Button>
          </Link>
        </div>
      )}

      {/* Auth Links */}
      {!user ? (
        <div className="absolute top-6 left-6 z-20">
          <Link to="/auth">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            >
              تسجيل الدخول
            </Button>
          </Link>
        </div>
      ) : (
        <div className="absolute top-6 left-6 z-20">
                    <Link to="/admin">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            >
              لوحة التحكم
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={signOut}
            className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
          >
            تسجيل الخروج
          </Button>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          {isArabic ? (
            <>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                <span className="gradient-text">عالم المنير</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-almanbar-gold mb-4 font-english">
                ALMANBAR WORLD
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                نحن نصنع قصصاً تلهم ونبدع محتوى يتحدث عن علامتكم التجارية بطريقة استثنائية
              </p>
              <p className="text-lg text-gray-300 mb-12 font-english max-w-3xl mx-auto">
                We craft inspiring stories and create exceptional content that speaks for your brand
              </p>
            </>
          ) : (
            <>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight font-english">
                <span className="gradient-text">ALMANBAR WORLD</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-almanbar-gold mb-4">
                عالم المنير
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed font-english">
                We craft inspiring stories and create exceptional content that speaks for your brand
              </p>
              <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
                نحن نصنع قصصاً تلهم ونبدع محتوى يتحدث عن علامتكم التجارية بطريقة استثنائية
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-almanbar-gold hover:bg-almanbar-gold-dark text-almanbar-navy px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-almanbar-gold text-almanbar-gold hover:bg-almanbar-gold hover:text-almanbar-navy px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              {isArabic ? 'أعمالنا' : 'Our Portfolio'}
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-almanbar-gold/20 rounded-full animate-float"></div>
      <div className="absolute bottom-1/4 right-16 w-16 h-16 bg-almanbar-gold/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-almanbar-gold/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};
