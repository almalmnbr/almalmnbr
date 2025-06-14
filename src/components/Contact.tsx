
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    titleAr: 'اتصل بنا',
    titleEn: 'Call Us',
    valueAr: '+966 50 123 4567',
    valueEn: '+966 50 123 4567'
  },
  {
    icon: Mail,
    titleAr: 'راسلنا',
    titleEn: 'Email Us',
    valueAr: 'info@almanbar.world',
    valueEn: 'info@almanbar.world'
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
    valueAr: 'الأحد - الخميس: 9 صباحاً - 6 مساءً',
    valueEn: 'Sun - Thu: 9 AM - 6 PM'
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
          {/* Contact Information */}
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
                    <p className="text-gray-600">
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
                {/* Social media icons would go here */}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-almanbar-navy mb-6">
                {isArabic ? 'أرسل رسالة' : 'Send Message'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-almanbar-navy mb-2">
                      {isArabic ? 'الاسم' : 'Name'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-almanbar-gold focus:ring-2 focus:ring-almanbar-gold/20 transition-colors duration-300"
                      placeholder={isArabic ? 'اسمك الكامل' : 'Your full name'}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-almanbar-navy mb-2">
                      {isArabic ? 'رقم الهاتف' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-almanbar-gold focus:ring-2 focus:ring-almanbar-gold/20 transition-colors duration-300"
                      placeholder={isArabic ? 'رقم هاتفك' : 'Your phone number'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-almanbar-navy mb-2">
                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-almanbar-gold focus:ring-2 focus:ring-almanbar-gold/20 transition-colors duration-300"
                    placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email address'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-almanbar-navy mb-2">
                    {isArabic ? 'الموضوع' : 'Subject'}
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-almanbar-gold focus:ring-2 focus:ring-almanbar-gold/20 transition-colors duration-300"
                    required
                  >
                    <option value="">
                      {isArabic ? 'اختر الموضوع' : 'Select subject'}
                    </option>
                    <option value="media">
                      {isArabic ? 'إنتاج الوسائط' : 'Media Production'}
                    </option>
                    <option value="photography">
                      {isArabic ? 'التصوير الفوتوغرافي' : 'Photography'}
                    </option>
                    <option value="branding">
                      {isArabic ? 'الهوية التجارية' : 'Branding'}
                    </option>
                    <option value="marketing">
                      {isArabic ? 'التسويق الرقمي' : 'Digital Marketing'}
                    </option>
                    <option value="other">
                      {isArabic ? 'أخرى' : 'Other'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-almanbar-navy mb-2">
                    {isArabic ? 'الرسالة' : 'Message'}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-almanbar-gold focus:ring-2 focus:ring-almanbar-gold/20 transition-colors duration-300 resize-none"
                    placeholder={isArabic ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-almanbar-gold hover:bg-almanbar-gold-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {isArabic ? 'إرسال الرسالة' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
