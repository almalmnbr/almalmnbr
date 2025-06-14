
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useServices } from '@/hooks/useServices';

interface ProjectFormProps {
  project?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const ProjectForm = ({ project, onClose, onSuccess }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title_ar: project?.title_ar || '',
    title_en: project?.title_en || '',
    description_ar: project?.description_ar || '',
    description_en: project?.description_en || '',
    category_ar: project?.category_ar || '',
    category_en: project?.category_en || '',
    image_url: project?.image_url || '',
    featured: project?.featured || false,
    service_id: project?.service_id || '',
    display_order: project?.display_order || 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { data: services } = useServices();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dataToSave = {
        ...formData,
        service_id: formData.service_id || null,
      };

      if (project) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update({ ...dataToSave, updated_at: new Date().toISOString() })
          .eq('id', project.id);

        if (error) throw error;
        toast.success('تم تحديث المشروع بنجاح');
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert([dataToSave]);

        if (error) throw error;
        toast.success('تم إضافة المشروع بنجاح');
      }

      onSuccess();
    } catch (error: any) {
      toast.error('خطأ في حفظ المشروع: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-almanbar-navy">
          {project ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title_ar">العنوان بالعربية</Label>
              <Input
                id="title_ar"
                value={formData.title_ar}
                onChange={(e) => handleChange('title_ar', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="title_en">العنوان بالإنجليزية</Label>
              <Input
                id="title_en"
                value={formData.title_en}
                onChange={(e) => handleChange('title_en', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category_ar">التصنيف بالعربية</Label>
              <Input
                id="category_ar"
                value={formData.category_ar}
                onChange={(e) => handleChange('category_ar', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category_en">التصنيف بالإنجليزية</Label>
              <Input
                id="category_en"
                value={formData.category_en}
                onChange={(e) => handleChange('category_en', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description_ar">الوصف بالعربية</Label>
              <Textarea
                id="description_ar"
                value={formData.description_ar}
                onChange={(e) => handleChange('description_ar', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description_en">الوصف بالإنجليزية</Label>
              <Textarea
                id="description_en"
                value={formData.description_en}
                onChange={(e) => handleChange('description_en', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="service_id">الخدمة المرتبطة</Label>
              <select
                id="service_id"
                value={formData.service_id}
                onChange={(e) => handleChange('service_id', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">بدون خدمة</option>
                {services?.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.title_ar}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="display_order">ترتيب العرض</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => handleChange('display_order', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleChange('featured', checked)}
              />
              <Label htmlFor="featured">مشروع مميز</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="image_url">رابط الصورة</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => handleChange('image_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-almanbar-gold hover:bg-almanbar-gold-dark text-almanbar-navy"
            >
              {isLoading ? 'جارٍ الحفظ...' : (project ? 'تحديث' : 'إضافة')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
