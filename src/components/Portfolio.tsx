
import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';

export const Portfolio = () => {
  const [isArabic, setIsArabic] = useState(true);
  const [filter, setFilter] = useState('all');
  const { data: projects, isLoading, error } = useProjects();

  const categories = [
    { id: 'all', nameAr: 'الكل', nameEn: 'All' },
    { id: 'featured', nameAr: 'مميز', nameEn: 'Featured' },
    { id: 'media', nameAr: 'إنتاج الوسائط', nameEn: 'Media Production' },
    { id: 'photography', nameAr: 'التصوير', nameEn: 'Photography' },
    { id: 'branding', nameAr: 'الهوية التجارية', nameEn: 'Branding' }
  ];

  const filteredItems = projects?.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'featured') return item.featured;
    return item.category_en?.toLowerCase().includes(filter);
  }) || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-almanbar-navy">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-almanbar-gold mx-auto"></div>
            <p className="mt-4 text-gray-300">
              {isArabic ? 'جارٍ تحميل المشاريع...' : 'Loading projects...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-almanbar-navy">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-400">
            {isArabic ? 'خطأ في تحميل المشاريع' : 'Error loading projects'}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-almanbar-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23DDA119' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {isArabic ? 'معرض أعمالنا' : 'Our Portfolio'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {isArabic 
              ? 'استكشف مجموعة من أفضل أعمالنا وإنجازاتنا في مختلف المجالات الإبداعية'
              : 'Explore a collection of our finest work and achievements across various creative fields'
            }
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === category.id
                  ? 'bg-almanbar-gold text-almanbar-navy'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isArabic ? category.nameAr : category.nameEn}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-500 animate-scale-in border border-white/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'}
                  alt={isArabic ? item.title_ar : item.title_en}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-almanbar-gold text-sm font-semibold mb-2">
                    {isArabic ? item.category_ar : item.category_en}
                  </div>
                  <h3 className="text-white text-xl font-bold mb-4">
                    {isArabic ? item.title_ar : item.title_en}
                  </h3>
                  
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-almanbar-gold text-almanbar-navy px-4 py-2 rounded-full font-semibold hover:bg-almanbar-gold-dark transition-colors duration-300">
                      <Play className="w-4 h-4" />
                      {isArabic ? 'عرض' : 'View'}
                    </button>
                    <button className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full font-semibold hover:bg-white/30 transition-colors duration-300">
                      <ExternalLink className="w-4 h-4" />
                      {isArabic ? 'تفاصيل' : 'Details'}
                    </button>
                  </div>
                </div>
              </div>

              {item.featured && (
                <div className="absolute top-4 right-4 bg-almanbar-gold text-almanbar-navy px-3 py-1 rounded-full text-sm font-bold">
                  {isArabic ? 'مميز' : 'Featured'}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-almanbar-gold hover:bg-almanbar-gold-dark text-almanbar-navy px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            {isArabic ? 'عرض جميع الأعمال' : 'View All Projects'}
          </button>
        </div>
      </div>
    </section>
  );
};
