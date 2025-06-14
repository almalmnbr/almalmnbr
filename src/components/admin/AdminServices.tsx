import { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Star, Loader2 } from 'lucide-react';
import { ServiceForm } from './ServiceForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export const AdminServices = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data: services, isLoading } = useServices();
  const queryClient = useQueryClient();

  const handleDelete = async (serviceId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;

    try {
      setDeletingId(serviceId);
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;

      toast.success('تم حذف الخدمة بنجاح', {
        description: 'تمت إزالة الخدمة من قاعدة البيانات',
      });
      queryClient.invalidateQueries({ queryKey: ['services'] });
    } catch (error: any) {
      toast.error('خطأ في حذف الخدمة', {
        description: error.message,
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingService(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-almanbar-navy">إدارة الخدمات</h2>
          <p className="text-sm text-gray-500 mt-1">
            {services?.length || 0} خدمة مسجلة
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-almanbar-gold to-amber-500 hover:from-almanbar-gold-dark hover:to-amber-600 text-white shadow-sm"
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة خدمة جديدة
        </Button>
      </div>

      {showForm && (
        <ServiceForm
          service={editingService}
          onClose={handleCloseForm}
          onSuccess={() => {
            handleCloseForm();
            queryClient.invalidateQueries({ queryKey: ['services'] });
            toast.success(editingService ? 'تم تحديث الخدمة' : 'تم إضافة الخدمة', {
              description: 'تم حفظ التغييرات بنجاح',
            });
          }}
        />
      )}

      {services?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg bg-gray-50">
          <div className="w-16 h-16 rounded-full bg-almanbar-gold/10 flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-almanbar-gold" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">لا توجد خدمات</h3>
          <p className="text-gray-500 text-sm mt-1 mb-4">ابدأ بإضافة خدمتك الأولى</p>
          <Button
            onClick={() => setShowForm(true)}
            variant="outline"
            className="border-almanbar-gold text-almanbar-gold hover:bg-almanbar-gold/10"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة خدمة
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex justify-between items-start">
                  <span className="text-almanbar-navy font-semibold">{service.title_ar}</span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(service)}
                      className="text-gray-500 hover:text-almanbar-gold hover:bg-almanbar-gold/10"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                      className="text-gray-500 hover:text-red-600 hover:bg-red-100"
                      disabled={deletingId === service.id}
                    >
                      {deletingId === service.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">{service.title_en}</p>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {service.description_ar}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <Badge
                      variant={service.featured ? 'default' : 'secondary'}
                      className={service.featured ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : ''}
                    >
                      {service.featured && <Star className="w-3 h-3 mr-1 fill-amber-500" />}
                      {service.featured ? 'مميزة' : 'عادية'}
                    </Badge>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      الترتيب: {service.display_order}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};