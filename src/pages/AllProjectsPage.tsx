'use client';

import { Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { useServices } from '@/hooks/useServices';
import { Project } from '@/hooks/useProjects';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronRight, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import type { Variants } from "framer-motion";

export default function AllProjectsPage() {
  const { data: projects, isLoading, isError, refetch } = useProjects();
  const { data: services, isLoading: servicesLoading } = useServices();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  const isArabic = true;

  if (isLoading || servicesLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <Skeleton className="w-full h-60 rounded-t-2xl" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="h-10 w-32 mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !projects) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-20 text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-red-500 mb-3">
            {isArabic ? 'حدث خطأ أثناء تحميل المشاريع' : 'Failed to load projects'}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {isArabic
              ? 'تعذر تحميل قائمة المشاريع. يرجى المحاولة مرة أخرى لاحقًا.'
              : 'Unable to load projects list. Please try again later.'}
          </p>
          
          <Button 
            onClick={() => refetch()}
            className="flex items-center gap-2 bg-almanbar-gold hover:bg-almanbar-gold-dark text-white"
          >
            <RefreshCw className="w-4 h-4" />
            {isArabic ? 'إعادة المحاولة' : 'Try Again'}
          </Button>
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
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  // Check if there are no projects
  const noProjects = Object.keys(grouped).length === 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-16 text-center"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-almanbar-navy to-almanbar-gold bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isArabic ? 'مشاريعنا حسب الخدمة' : 'Projects by Service'}
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isArabic
            ? 'استكشف مجموعة متنوعة من المشاريع التي أنجزناها لكل خدمة من خدماتنا'
            : 'Explore our diverse portfolio of completed projects across all our services'}
        </motion.p>
      </motion.div>

      {noProjects ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            {isArabic ? 'لا توجد مشاريع متاحة' : 'No Projects Available'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {isArabic
              ? 'لا توجد مشاريع للعرض في الوقت الحالي. يرجى التحقق مرة أخرى لاحقًا.'
              : 'There are no projects to display at the moment. Please check back later.'}
          </p>
        </motion.div>
      ) : (
        Object.entries(grouped).map(([serviceId, projects]) => {
          const service = services?.find(s => s.id === serviceId);
          const serviceName = service
            ? (isArabic ? service.title_ar : service.title_en)
            : (isArabic ? 'أخرى' : 'Other');

          return (
            <motion.div
              key={serviceId}
              className="mb-20"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={container}
            >
              <div className="flex items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-almanbar-gold/10 to-almanbar-navy/10 flex items-center justify-center mr-4">
                  {service?.icon ? (
                    <img 
                      src={service.icon} 
                      alt={serviceName} 
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                  )}
                </div>
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-almanbar-navy dark:text-white"
                  variants={item}
                >
                  {serviceName}
                </motion.h2>
              </div>

              {projects.length === 0 ? (
                <motion.div
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-10 text-center"
                  variants={item}
                >
                  <p className="text-gray-500 dark:text-gray-400">
                    {isArabic ? 'لا توجد مشاريع متاحة حالياً' : 'No projects available at this time'}
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <motion.div 
                      key={project.id} 
                      variants={item}
                      className="relative"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <Link
                        to={`/projects/${project.id}`}
                        className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700"
                        aria-label={`View ${isArabic ? project.title_ar : project.title_en} project details`}
                      >
                        {project.image_url ? (
                          <div className="relative overflow-hidden h-60">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <motion.img
                              src={project.image_url}
                              alt={isArabic ? project.title_ar : project.title_en}
                              className="w-full h-full object-cover transition-transform duration-500"
                              initial={{ scale: 1 }}
                              animate={{ 
                                scale: hoveredProject === project.id ? 1.05 : 1 
                              }}
                              loading="lazy"
                            />
                            
                            <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">
                                {isArabic ? project.title_ar : project.title_en}
                              </h3>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-100 dark:bg-gray-700 h-60 flex items-center justify-center">
                            <div className="text-gray-400 dark:text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-6">
                          {(project.description_ar || project.description_en) && (
                            <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                              {isArabic ? project.description_ar : project.description_en}
                            </p>
                          )}
                          
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-almanbar-gold font-medium group-hover:text-almanbar-gold-dark transition-colors flex items-center gap-1">
                              {isArabic ? 'عرض التفاصيل' : 'View Details'}
                              <ChevronRight className="w-4 h-4" />
                            </span>
                            
                            
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })
      )}
      
      {/* Floating action button for filters */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button className="rounded-full p-4 shadow-lg bg-almanbar-navy hover:bg-almanbar-navy-dark text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="ml-2">{isArabic ? 'تصفية' : 'Filter'}</span>
        </Button>
      </motion.div>
    </div>
  );
}