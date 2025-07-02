import { Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';

const isArabic = typeof window !== 'undefined'
  ? document.documentElement.lang === 'ar'
  : false;

export const ProjectsPage = () => {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return <div className="text-center py-8">جارٍ تحميل المشاريع...</div>;
  }

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-almanbar-navy mb-6">
        {isArabic ? 'جميع المشاريع' : 'All Projects'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects?.map((project) => {
          const firstImage = project.project_media?.find((m) => m.type === 'image');

          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group block h-full"
              aria-label={`عرض تفاصيل المشروع: ${isArabic ? project.title_ar : project.title_en}`}
            >
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                
                {firstImage?.url && (
                  <div className="relative pt-[56.25%] overflow-hidden">
                    <img
                      loading="lazy"
                      src={firstImage.url}
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
                    <span className="text-almanbar-gold text-sm font-medium group-hover:underline transition">
                      {isArabic ? 'عرض التفاصيل' : 'View Details'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
