
import { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ProjectForm } from './ProjectForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export const AdminProjects = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { data: projects, isLoading } = useProjects();
  const queryClient = useQueryClient();

  const handleDelete = async (projectId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      toast.success('تم حذف المشروع بنجاح');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    } catch (error: any) {
      toast.error('خطأ في حذف المشروع: ' + error.message);
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (isLoading) {
    return <div className="text-center py-8">جارٍ التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-almanbar-navy">إدارة المشاريع</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-almanbar-gold hover:bg-almanbar-gold-dark text-almanbar-navy"
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة مشروع جديد
        </Button>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleCloseForm}
          onSuccess={() => {
            handleCloseForm();
            queryClient.invalidateQueries({ queryKey: ['projects'] });
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-almanbar-navy">{project.title_ar}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-2">{project.title_en}</p>
              <p className="text-gray-500 text-xs mb-2">{project.category_ar}</p>
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title_ar}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
              )}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs ${
                  project.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {project.featured ? 'مميز' : 'عادي'}
                </span>
                <span className="text-xs text-gray-500">ترتيب: {project.display_order}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
