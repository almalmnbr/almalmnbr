import { useParams } from 'react-router-dom';
import { useProjectById } from '@/hooks/useProjectById';
import { FaYoutube } from 'react-icons/fa';
import { FiAlertCircle, FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

export const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { data: project, isLoading, error } = useProjectById(id || '');

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-4/5" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
        
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="aspect-video w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-16">
        <div className="flex justify-center mb-4">
          <FiAlertCircle className="text-red-500 text-5xl" />
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">خطأ في تحميل المشروع</h2>
        <p className="text-gray-600 mb-6">تعذر العثور على المشروع المطلوب. يرجى المحاولة مرة أخرى.</p>
        <Link 
          to="/projects" 
          className="inline-flex items-center px-4 py-2 bg-almanbar-navy text-white rounded-lg hover:bg-opacity-90 transition"
        >
          <FiChevronLeft className="ml-2" />
          العودة إلى قائمة المشاريع
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-2">
        <Link 
          to="/projects" 
          className="inline-flex items-center text-almanbar-navy hover:text-opacity-80 transition"
        >
          <FiChevronLeft className="ml-1" />
          العودة للمشاريع
        </Link>
      </div>

      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-almanbar-navy mb-4">
          {project.title_ar}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          {project.description_ar}
        </p>
      </header>

      {/* الصور */}
      {project.project_media?.some(m => m.type === 'image') && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-almanbar-navy mb-4 pb-2 border-b">
            معرض الصور
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.project_media
              .filter(media => media.type === 'image')
              .map(media => (
                <div 
                  key={media.id}
                  className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={media.url}
                    alt="صورة المشروع"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
            ))}
          </div>
        </section>
      )}

      {/* فيديوهات YouTube */}
      {project.project_media?.some(m => m.type === 'youtube') && (
        <section>
          <h2 className="flex items-center text-xl font-semibold text-almanbar-navy mb-4 pb-2 border-b">
            <FaYoutube className="text-red-600 mr-2 text-2xl" />
            فيديوهات المشروع
          </h2>
          <div className="space-y-6">
            {project.project_media
              .filter(media => media.type === 'youtube')
              .map(media => (
                <div key={media.id} className="rounded-xl overflow-hidden shadow-lg">
                  <div className="aspect-video bg-gray-900">
                    <iframe
                      src={media.url.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allowFullScreen
                      title="YouTube Video"
                    />
                  </div>
                  <div className="p-3 bg-gray-50">
                    <h3 className="font-medium text-gray-800">{media.title || 'فيديو المشروع'}</h3>
                  </div>
                </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};