'use client';

import { useProjects } from '@/hooks/useProjects';
import { useServices } from '@/hooks/useServices';
import { Project } from '@/hooks/useProjects';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming you have a skeleton component

export default function AllProjectsPage() {
  const { data: projects, isLoading, isError } = useProjects();
  const { data: services, isLoading: servicesLoading } = useServices();

  const isArabic = true; // or load from context / user setting

  if (isLoading || servicesLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow overflow-hidden">
              <Skeleton className="w-full h-48 rounded-t-xl" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !projects) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            {isArabic ? 'حدث خطأ أثناء تحميل المشاريع' : 'Failed to load projects'}
          </h2>
          <p className="text-gray-600 max-w-md">
            {isArabic 
              ? 'تعذر تحميل قائمة المشاريع. يرجى المحاولة مرة أخرى لاحقًا.' 
              : 'Unable to load projects list. Please try again later.'}
          </p>
        </div>
      </div>
    );
  }

  // Group projects by service_id
  const grouped = projects.reduce<Record<string, Project[]>>((acc, project) => {
    const key = project.service_id || 'other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(project);
    return acc;
  }, {});

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-almanbar-navy to-almanbar-gold bg-clip-text text-transparent">
          {isArabic ? 'مشاريعنا حسب الخدمة' : 'Projects by Service'}
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          {isArabic
            ? 'استكشف مجموعة متنوعة من المشاريع التي أنجزناها لكل خدمة من خدماتنا'
            : 'Explore our diverse portfolio of completed projects across all our services'}
        </p>
      </motion.div>

      {Object.entries(grouped).map(([serviceId, projects]) => {
        const service = services?.find(s => s.id === serviceId);
        const serviceName = service
          ? (isArabic ? service.title_ar : service.title_en)
          : (isArabic ? 'أخرى' : 'Other');

        return (
          <motion.div 
            key={serviceId} 
            className="mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-almanbar-gold/10 flex items-center justify-center mr-4">
              </div>
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-almanbar-navy"
                variants={item}
              >
                {serviceName}
              </motion.h2>
            </div>

            {projects.length === 0 ? (
              <motion.div 
                className="bg-gray-50 rounded-xl p-8 text-center"
                variants={item}
              >
                <p className="text-gray-500">
                  {isArabic ? 'لا توجد مشاريع متاحة حالياً' : 'No projects available at this time'}
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <motion.div 
                    key={project.id} 
                    className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                  >
                    {project.image_url ? (
                      <div className="relative overflow-hidden h-60">
                        <img 
                          src={project.image_url} 
                          alt={isArabic ? project.title_ar : project.title_en} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ) : (
                      <div className="bg-gray-100 h-60 flex items-center justify-center">
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-almanbar-navy mb-2">
                        {isArabic ? project.title_ar : project.title_en}
                      </h3>
                      {(project.description_ar || project.description_en) && (
                        <p className="text-gray-600 line-clamp-2">
                          {isArabic ? project.description_ar : project.description_en}
                        </p>
                      )}
                      <button className="mt-4 text-almanbar-gold font-medium hover:text-almanbar-navy transition-colors">
                        {isArabic ? 'عرض التفاصيل' : 'View Details'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}