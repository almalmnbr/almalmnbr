import { useState, forwardRef } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import { FaTiktok, FaSnapchat } from 'react-icons/fa';

export const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  const [isArabic] = useState(true);
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const socialLinksMain = [
    { icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61576767686945', name: 'Facebook' },
    { icon: Instagram, url: 'https://www.instagram.com/mnbr.9?igsh=NmpsczR6anluOHRm&utm_source=qr', name: 'Instagram' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/%D8%B9%D8%A7%D9%84%D9%85-%D8%A7%D9%84%D9%85%D9%86%D8%A8%D8%B1-778859367', name: 'LinkedIn' },
    { icon: Youtube, url: 'https://youtube.com/@almalmnbar?si=rk5S1KfyOXr5tBnr', name: 'YouTube' },
    { icon: Twitter, url: 'https://x.com/almalmnbr9?s=21', name: 'Twitter' },
    { icon: FaTiktok, url: 'https://www.tiktok.com/@user2235518530150?_t=zs-8wenjpzovzy&_r=1', name: 'TikTok Backup' },
    { icon: FaSnapchat, url: 'https://www.snapchat.com/@almnbr.9?invite_id=7YsOJ1cD&locale=ar_SA%40calendar%3Dgregorian&share_id=XkToVdQoTtaYozx4FGcMMA&sid=23a63810b471480890ac212faa1c5797', name: 'Snapchat' },
  ];

  const weddingLinks = [
    { icon: FaTiktok, url: 'https://www.tiktok.com/@m_nber9?_t=ZS-8xh614Z4KnK&_r=1', name: 'TikTok Weddings' },
    { icon: Youtube, url: 'https://www.youtube.com/@mnber9', name: 'YouTube Weddings' }
  ];

  return (
    <footer ref={ref} className="bg-almanbar-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23DDA119' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-almanbar-gold mb-2">
              {isArabic ? 'عالم المنبر' : 'ALMANBAR WORLD'}
            </h3>
            <p className="text-gray-300 mb-4">
              {isArabic
                ? 'شركة رائدة في مجال الإنتاج الإعلامي والإعلان، نسعى لتقديم حلول إبداعية ومبتكرة.'
                : 'A leading company in media production and advertising, striving to provide creative and innovative solutions.'}
            </p>
                     <div className="space-y-3">
             <div className="flex items-center gap-3">
  <Phone className="w-5 h-5 text-almanbar-gold" />
  <span className="text-gray-300" dir="ltr" style={{ unicodeBidi: "isolate" }}>+966 55 205 4487</span>
</div>
<div className="flex items-center gap-3">
  <Phone className="w-5 h-5 text-almanbar-gold" />
  <span className="text-gray-300" dir="ltr" style={{ unicodeBidi: "isolate" }}>+966 50 446 2195</span>
</div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-almanbar-gold" />
                <span className="text-gray-300">almalmnbr@gmail.com</span>
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
          <div>
            <h4 className="text-lg font-bold text-almanbar-gold mb-4">
              {isArabic ? 'خدماتنا' : 'Our Services'}
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-almanbar-gold">{isArabic ? 'إنتاج الوسائط' : 'Media Production'}</a></li>
              <li><a href="#" className="hover:text-almanbar-gold">{isArabic ? 'التصوير الفوتوغرافي' : 'Photography'}</a></li>
              <li><a href="#" className="hover:text-almanbar-gold">{isArabic ? 'الهوية التجارية' : 'Brand Identity'}</a></li>
              <li><a href="#" className="hover:text-almanbar-gold">{isArabic ? 'التسويق الرقمي' : 'Digital Marketing'}</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-almanbar-gold mb-4">
              {isArabic ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-almanbar-gold">{isArabic ? 'الرئيسية' : 'Home'}</a></li>
              <li><a href="#" className="hover:text-almanbar-gold">{isArabic ? 'من نحن' : 'About Us'}</a></li>
              <li><a href="#" className="hover:text-almanbar-gold">{isArabic ? 'أعمالنا' : 'Portfolio'}</a></li>
              <li><a href="#" className="hover:text-almanbar-gold">{isArabic ? 'تواصل معنا' : 'Contact'}</a></li>
            </ul>
          </div>

          {/* Newsletter */}
         
        </div>

        {/* Social Sections */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* Main Social */}
            <div className="flex-1">
              <h5 className="text-almanbar-gold font-semibold mb-4">
                {isArabic ? 'عالم المنبر' : 'Almanbar World'}
              </h5>
              <div className="flex gap-4 flex-wrap">
                {socialLinksMain.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-almanbar-gold transition">
                    <s.icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Weddings & Events */}
            <div className="flex-1">
              <h5 className="text-almanbar-gold font-semibold mb-4 text-right">
                {isArabic ? 'المنبر الإعلامي – قسم الحفلات والمناسبات' : 'Almanbar Media – Weddings & Events'}
              </h5>
              <div className="flex gap-4 justify-end flex-wrap">
                {weddingLinks.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-almanbar-gold transition">
                    <s.icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} {isArabic ? 'عالم المنبر' : 'ALMANBAR WORLD'} – {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
        </div>
      </div>
    </footer>
  );
});
