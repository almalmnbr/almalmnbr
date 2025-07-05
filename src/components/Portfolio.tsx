'use client';
import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { useServices } from '@/hooks/useServices';
import { useNavigate } from 'react-router-dom';

export const Portfolio = () => {
  const [isArabic] = useState(true);
  const [filter, setFilter] = useState<'all' | 'featured' | string>('all');
  const navigate = useNavigate();

  const { data: allProjects, isLoading: loadingProjects, error: projectsError } = useProjects();
  const { data: services, isLoading: loadingServices, error: servicesError } = useServices();

  if (loadingProjects || loadingServices) {
    return (
      <section className="py-20 bg-almanbar-navy">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-almanbar-gold mx-auto" />
          <p className="mt-4 text-gray-300">
            {isArabic ? 'جارٍ التحميل...' : 'Loading...'}
          </p>
        </div>
      </section>
    );
  }

  if (projectsError || servicesError) {
    return (
      <section className="py-20 bg-almanbar-navy">
        <div className="container mx-auto px-4 text-center text-red-400">
          {isArabic ? 'خطأ في تحميل البيانات' : 'Error loading data'}
        </div>
      </section>
    );
  }

  const staticCategories = [
    { id: 'all', nameAr: 'الكل', nameEn: 'All' },
    { id: 'featured', nameAr: 'مميز', nameEn: 'Featured' }
  ];

  const serviceCategories = services?.map(svc => ({
    id: svc.id,
    nameAr: svc.title_ar,
    nameEn: svc.title_en
  })) || [];

  // فلترة المشاريع محلياً حسب الفلتر المختار
  let displayProjects = allProjects || [];

  if (filter === 'featured') {
    displayProjects = displayProjects.filter(p => p.featured);
  } else if (filter !== 'all') {
    // افتراض: كل مشروع يحتوي على service_id أو category_en أو مشابه
    displayProjects = displayProjects.filter(p => {
      // لو مشاريعك تحتوي على علاقة مع service_id
      return p.service_id === filter;
      // أو لو تستعمل category_en كمعرف للخدمة
      // return p.category_en?.toLowerCase() === filter.toLowerCase();
    });
  }

  return (
    <section className="py-20 bg-almanbar-navy relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {isArabic ? 'معرض أعمالنا' : 'Our Portfolio'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {isArabic
              ? 'استكشف مجموعة من أفضل أعمالنا وإنجازاتنا في مختلف المجالات الإبداعية'
              : 'Explore a collection of our finest work and achievements across various creative fields'}
          </p>
        </div>

        {/* أزرار الفلترة */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {staticCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-almanbar-gold text-almanbar-navy'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isArabic ? cat.nameAr : cat.nameEn}
            </button>
          ))}
          {serviceCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-almanbar-gold text-almanbar-navy'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isArabic ? cat.nameAr : cat.nameEn}
            </button>
          ))}
        </div>

        {/* عرض المشاريع */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((item, idx) => {
            const img =
              item.project_media?.find(m => m.type === 'image')?.url ||
              item.image_url ||
              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop';

            return (
              <div
                key={item.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 animate-scale-in border border-white/10"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={img}
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
                      <button
                        onClick={() => navigate(`/projects/${item.id}`)}
                        className="flex items-center gap-2 bg-almanbar-gold text-almanbar-navy px-4 py-2 rounded-full font-semibold hover:bg-almanbar-gold-dark transition"
                      >
                        <Play className="w-4 h-4" />
                        {isArabic ? 'عرض' : 'View'}
                      </button>
                      <button
                        onClick={() => navigate(`/projects/${item.id}`)}
                        className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full font-semibold hover:bg-white/30 transition"
                      >
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
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/projects')}
            className="bg-almanbar-gold hover:bg-almanbar-gold-dark text-almanbar-navy px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            {isArabic ? 'عرض جميع الأعمال' : 'View All Projects'}
          </button>
        </div>
      </div>
    </section>
  );
};
