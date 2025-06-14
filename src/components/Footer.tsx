
import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';

export const Footer = () => {
  const [isArabic, setIsArabic] = useState(true);
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const socialLinks = [
    { icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61576767686945', name: 'Facebook' },
    { icon: Instagram, url: 'https://www.instagram.com/mnbr.9?igsh=NmpsczR6anluOHRm&utm_source=qr', name: 'Instagram' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/%D8%B9%D8%A7%D9%84%D9%85-%D8%A7%D9%84%D9%85%D9%86%D8%A8%D8%B1-778859367', name: 'LinkedIn' },
    { icon: Youtube, url: 'https://youtube.com/@almalmnbar?si=rk5S1KfyOXr5tBnr', name: 'YouTube' },
    { icon: Twitter, url: 'https://x.com/almalmnbr9?s=21', name: 'Twitter' }
  ];

  return (
    <footer className="bg-almanbar-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23DDA119' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-almanbar-gold mb-2">
                {isArabic ? 'عالم المنير' : 'ALMANBAR WORLD'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {isArabic 
                  ? 'شركة رائدة في مجال الإنتاج الإعلامي والإعلان، نسعى لتقديم حلول إبداعية ومبتكرة.'
                  : 'A leading company in media production and advertising, striving to provide creative and innovative solutions.'
                }
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-almanbar-gold" />
                <span className="text-gray-300">+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-almanbar-gold" />
                <span className="text-gray-300">info@almanbar.world</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-almanbar-gold" />
                <span className="text-gray-300">
                  {isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-lg font-bold text-almanbar-gold mb-6">
              {isArabic ? 'خدماتنا' : 'Our Services'}
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-almanbar-gold transition-colors duration-300">
                {isArabic ? 'إنتاج الوسائط' : 'Media Production'}
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-almanbar-gold transition-colors duration-300">
                {isArabic ? 'التصوير الفوتوغرافي' : 'Photography'}
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-almanbar-gold transition-colors duration-300">
                {isArabic ? 'الهوية التجارية' : 'Brand Identity'}
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-almanbar-gold transition-colors duration-300">
                {isArabic ? 'التسويق الرقمي' : 'Digital Marketing'}
              </a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-bold text-almanbar-gold mb-6">
              {isArabic ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-almanbar-gold transition-colors duration-300">
                {isArabic ? 'الرئيسية' : 'Home'}
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-almanbar-gold transition-colors duration-300">
                {isArabic ? 'من نحن' : 'About Us'}
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-almanbar-gold transition-colors duration-300">
                {isArabic ? 'أعمالنا' : 'Portfolio'}
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-almanbar-gold transition-colors duration-300">
                {isArabic ? 'تواصل معنا' : 'Contact'}
              </a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-bold text-almanbar-gold mb-6">
              {isArabic ? 'النشرة الإخبارية' : 'Newsletter'}
            </h4>
            <p className="text-gray-300 mb-4">
              {isArabic 
                ? 'اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والعروض'
                : 'Subscribe to our newsletter for the latest news and offers'
              }
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email'}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-almanbar-gold focus:ring-2 focus:ring-almanbar-gold/20 transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="w-full bg-almanbar-gold hover:bg-almanbar-gold-dark text-almanbar-navy px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {isArabic ? 'اشتراك' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-300 text-center md:text-left">
              <p>&copy; 2024 {isArabic ? 'عالم المنير' : 'ALMANBAR WORLD'}. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-almanbar-gold hover:text-almanbar-navy transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
