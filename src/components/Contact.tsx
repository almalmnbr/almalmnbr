import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    titleAr: 'اتصل بنا',
    titleEn: 'Call Us',
    valueAr: '+966 50 466 2195',
    valueEn: '+966 50 466 2195'
  },
  {
    icon: Mail,
    titleAr: 'راسلنا',
    titleEn: 'Email Us',
    valueAr: 'almalmnbr@gmail.com',
    valueEn: 'almalmnbr@gmail.com'
  },
  {
    icon: MapPin,
    titleAr: 'زورنا',
    titleEn: 'Visit Us',
    valueAr: 'الرياض، المملكة العربية السعودية',
    valueEn: 'Riyadh, Saudi Arabia'
  },
  {
    icon: Clock,
    titleAr: 'ساعات العمل',
    titleEn: 'Working Hours',
    valueAr: 'السبت - الخميس: 9 صباحاً - 12 مساءً',
    valueEn: 'Sat - Thu: 9 AM - 12 AM'
  }
];

export const Contact = () => {
  const [isArabic, setIsArabic] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23DDA119' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-almanbar-navy mb-6">
            {isArabic ? 'تواصل معنا' : 'Contact Us'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isArabic 
              ? 'نحن هنا لمساعدتكم في تحقيق رؤيتكم الإبداعية. تواصلوا معنا اليوم لنبدأ رحلة النجاح معاً'
              : 'We are here to help you achieve your creative vision. Contact us today to start your journey to success together'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Google Map */}
          <div className="animate-fade-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3630.619104525107!2d46.49648192486012!3d24.498650978167323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f3d003e414241%3A0x3ef700cfd40f3e1a!2z2LTYsdmD2Kkg2LnYp9mE2YUg2KfZhNmF2YbYqNixINmE2YTYr9i52KfZitipINmI2KfZhNil2LnZhNin2YY!5e0!3m2!1sar!2s!4v1751745105369!5m2!1sar!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Almanbar Location"
              className="rounded-2xl"
            />
          </div>

          {/* Right: Contact Info */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold text-almanbar-navy mb-8">
                {isArabic ? 'معلومات التواصل' : 'Contact Information'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 rounded-2xl hover:transform hover:-translate-y-1 transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-almanbar-gold/20 rounded-xl mb-4">
                      <info.icon className="w-6 h-6 text-almanbar-gold" />
                    </div>
                    <h4 className="font-semibold text-almanbar-navy mb-2">
                      {isArabic ? info.titleAr : info.titleEn}
                    </h4>
                    <p
                      className="text-gray-600"
                      style={
                        info.icon === Phone
                          ? { direction: 'ltr', unicodeBidi: 'plaintext', whiteSpace: 'nowrap' }
                          : {}
                      }
                    >
                      {isArabic ? info.valueAr : info.valueEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h4 className="text-xl font-bold text-almanbar-navy mb-6">
                {isArabic ? 'تابعنا على' : 'Follow Us'}
              </h4>
              <div className="flex gap-4">
                {/* Add social icons here if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
