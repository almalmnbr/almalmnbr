'use client';

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
    featured: project?.featured || false,
    service_id: project?.service_id || '',
    display_order: project?.display_order || 0,
  });

  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(false);
  const { data: services } = useServices();

  const handleChange = (field: string, value: any) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const sanitizeFileName = (name: string) =>
    name.replace(/[^a-zA-Z0-9.\-_]/g, '_');

  const convertImageToWebp = (file: File): Promise<Blob> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('Canvas context not available');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            blob => (blob ? resolve(blob) : reject('Failed to convert to webp')),
            'image/webp',
            0.9
          );
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submit
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (!services) {
        toast.error('الرجاء الانتظار حتى يتم تحميل قائمة الخدمات');
        return;
      }

      const dataToSave = { ...formData, service_id: formData.service_id || null };
      let projectId = project?.id;

      if (projectId) {
        console.log('🔄 Updating project:', projectId, dataToSave);
        const { error } = await supabase
          .from('projects')
          .update({ ...dataToSave, updated_at: new Date().toISOString() })
          .eq('id', projectId);
        if (error) throw error;
      } else {
        console.log('➕ Inserting new project:', dataToSave);
        const { data, error } = await supabase
          .from('projects')
          .insert([dataToSave])
          .select()
          .single();
        if (error) throw error;
        projectId = data.id;
      }

      // Handle media uploads
      const uploadedMedia: { type: string; url: string; description: string }[] = [];

      for (const file of mediaFiles) {
        const safeName = sanitizeFileName(file.name).replace(/\.\w+$/, '.webp');
        const path = `${projectId}/image_${Date.now()}_${safeName}`;
        const blob = await convertImageToWebp(file);
        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(path, blob, { contentType: 'image/webp' });
        if (uploadError) {
          toast.error(`فشل رفع الصورة ${file.name}`);
          continue;
        }
        const { data: urlData } = supabase.storage
          .from('uploads')
          .getPublicUrl(path);
        uploadedMedia.push({ type: 'image', url: urlData.publicUrl, description: '' });
      }

      // Add YouTube links
      youtubeLinks
        .filter(link => link.trim() !== '')
        .forEach(link =>
          uploadedMedia.push({ type: 'youtube', url: link.trim(), description: '' })
        );

      // Insert project_media records
      if (uploadedMedia.length > 0) {
        const inserts = uploadedMedia.map(m => ({
          ...m,
          project_id: projectId,
          created_at: new Date().toISOString(),
        }));
        const { error: mediaError } = await supabase
          .from('project_media')
          .insert(inserts);
        if (mediaError) throw mediaError;
      }

      toast.success(project ? 'تم التحديث بنجاح' : 'تم الإضافة بنجاح');
      onSuccess();
    } catch (error: any) {
      toast.error('❌ حدث خطأ: ' + (error.message || 'تعذر الحفظ'));
      console.error('🛑 Full error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!services) {
    return (
      <div className="p-6 text-center text-gray-500">
        جارٍ تحميل قائمة الخدمات...
      </div>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-almanbar-navy">
          {project ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title_ar">العنوان بالعربية</Label>
              <Input
                id="title_ar"
                value={formData.title_ar}
                onChange={e => handleChange('title_ar', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="title_en">العنوان بالإنجليزية</Label>
              <Input
                id="title_en"
                value={formData.title_en}
                onChange={e => handleChange('title_en', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category_ar">التصنيف بالعربية</Label>
              <Input
                id="category_ar"
                value={formData.category_ar}
                onChange={e => handleChange('category_ar', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category_en">التصنيف بالإنجليزية</Label>
              <Input
                id="category_en"
                value={formData.category_en}
                onChange={e => handleChange('category_en', e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description_ar">الوصف بالعربية</Label>
              <Textarea
                id="description_ar"
                value={formData.description_ar}
                onChange={e => handleChange('description_ar', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description_en">الوصف بالإنجليزية</Label>
              <Textarea
                id="description_en"
                value={formData.description_en}
                onChange={e => handleChange('description_en', e.target.value)}
              />
            </div>
          </div>

          {/* Service, Order & Featured */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="service_id">الخدمة المرتبطة</Label>
              <select
                id="service_id"
                value={formData.service_id}
                onChange={e => handleChange('service_id', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">بدون خدمة</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.title_ar}
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
                onChange={e =>
                  handleChange('display_order', parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={checked => handleChange('featured', checked)}
              />
              <Label htmlFor="featured">مشروع مميز</Label>
            </div>
          </div>

          {/* Media */}
          <div>
            <Label htmlFor="media_files">إدراج صور</Label>
            <Input
              id="media_files"
              type="file"
              multiple
              accept="image/*"
              onChange={e => setMediaFiles(Array.from(e.target.files || []))}
            />
          </div>

          {/* YouTube Links */}
          <div>
            <Label>روابط YouTube</Label>
            {youtubeLinks.map((link, idx) => (
              <Input
                key={idx}
                value={link}
                onChange={e => {
                  const arr = [...youtubeLinks];
                  arr[idx] = e.target.value;
                  setYoutubeLinks(arr);
                }}
                placeholder="https://youtube.com/..."
                className="mb-2"
              />
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => setYoutubeLinks([...youtubeLinks, ''])}
            >
              + إضافة رابط جديد
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-almanbar-gold text-almanbar-navy"
            >
              {isLoading ? 'جارٍ الحفظ...' : project ? 'تحديث' : 'إضافة'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
