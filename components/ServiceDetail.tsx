import { useParams, Link } from 'react-router-dom';
import { useServiceById } from '@/hooks/useServiceById';
import { useProjectsByServiceId } from '@/hooks/useProjectsByServiceId';
import { useState } from 'react';
import { Camera, Video, Target, Palette, Monitor, TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap = {
  Camera,
  Video,
  Target,
  Palette,
  Monitor,
  TrendingUp,
};

export const ServiceDetail = () => {
  const { id } = useParams();
  const [isArabic, setIsArabic] = useState(true);

  // Fetch service data
  const { data: service, isLoading, error } = useServiceById(id || '');

  // Only fetch projects if service is loaded and has a valid ID
  const { data: projects, isLoading: loadingProjects } = useProjectsByServiceId(service?.id ?? '');

  // Loading state for service
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 space-y-12">
        <div className="flex justify-end">
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
        
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-xl" />
            <Skeleton className="h-8 w-64 rounded-lg" />
          </div>
          
          <Skeleton className="w-full h-96 rounded-xl" />
          
          <div className="space-y-4">
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-5/6 rounded-lg" />
            <Skeleton className="h-4 w-4/6 rounded-lg" />
          </div>
          
          <Skeleton className="h-6 w-40 rounded-lg" />
        </div>
        
        <div className="space-y-6">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full h-48 rounded-lg" />
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-5/6 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error or no service
  if (error || !service) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-xl max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">
            {isArabic ? 'خطأ في تحميل تفاصيل الخدمة' : 'Error loading service details'}
          </h2>
          <p className="mb-4">
            {isArabic 
              ? 'تعذر تحميل بيانات الخدمة المطلوبة. يرجى المحاولة مرة أخرى لاحقاً.'
              : 'Failed to load the requested service data. Please try again later.'}
          </p>
          <Button asChild variant="outline">
            <Link to="/">
              {isArabic ? 'العودة إلى الصفحة الرئيسية' : 'Return to homepage'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon_name as keyof typeof iconMap] || Camera;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 space-y-16">
      {/* Language toggle and back button */}
      <div className="flex justify-between items-center">
        <Button asChild variant="ghost" className="text-almanbar-navy hover:bg-almanbar-gold/10">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            {isArabic ? 'عودة إلى الخدمات' : 'Back to Services'}
          </Link>
        </Button>
        
        <Button
          onClick={() => setIsArabic(!isArabic)}
          variant="outline"
          size="sm"
          className="border-almanbar-gold text-almanbar-gold hover:bg-almanbar-gold/10"
        >
          {isArabic ? 'English' : 'العربية'}
        </Button>
      </div>

      {/* Service detail */}
      <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-100
 rounded-xl flex items-center justify-center shadow-md">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl font-bold text-almanbar-navy">
                  {isArabic ? service.title_ar : service.title_en}
                </h1>
                
                {service.featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                    {isArabic ? 'خدمة مميزة' : 'Featured Service'}
                  </span>
                )}
              </div>
              
              {service.image_url && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={service.image_url}
                    alt={isArabic ? service.title_ar : service.title_en}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              <div className="prose max-w-none text-gray-700">
                <p className="text-lg leading-relaxed">
                  {isArabic ? service.description_ar : service.description_en}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related projects */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-almanbar-navy">
          {isArabic ? 'أعمالنا المرتبطة بهذه الخدمة' : 'Projects Related to This Service'}
        </h2>

        {loadingProjects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full h-48 rounded-lg" />
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
              </div>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`}
                className="group"
              >
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  {project.image_url && (
                    <div className="relative pt-[56.25%] overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={isArabic ? project.title_ar : project.title_en}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-almanbar-navy mb-2 group-hover:text-almanbar-gold transition-colors">
                        {isArabic ? project.title_ar : project.title_en}
                      </h3>
                      
                      {project.category_ar && (
                        <p className="text-sm text-gray-500 mb-3">
                          {isArabic ? project.category_ar : project.category_en}
                        </p>
                      )}
                      
                      {project.description_ar && (
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {isArabic ? project.description_ar : project.description_en}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-almanbar-gold px-0"
                      >
                        {isArabic ? 'عرض التفاصيل' : 'View Details'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-600">
              {isArabic
                ? 'لا توجد مشاريع مرتبطة بهذه الخدمة حالياً.'
                : 'No related projects found.'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};