import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ServiceFormProps {
  service?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const ServiceForm = ({ service, onClose, onSuccess }: ServiceFormProps) => {
  const [formData, setFormData] = useState({
    title_ar: service?.title_ar || '',
    title_en: service?.title_en || '',
    description_ar: service?.description_ar || '',
    description_en: service?.description_en || '',
    short_description_ar: service?.short_description_ar || '',
    short_description_en: service?.short_description_en || '',
    icon_name: service?.icon_name || 'Camera',
    image_url: service?.image_url || '',
    featured: service?.featured || false,
    display_order: service?.display_order || 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const iconOptions = [
    { value: 'Camera', label: 'Camera' },
    { value: 'Video', label: 'Video' },
    { value: 'Target', label: 'Target' },
    { value: 'Palette', label: 'Palette' },
    { value: 'Monitor', label: 'Monitor' },
    { value: 'TrendingUp', label: 'Trending Up' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (service) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', service.id);

        if (error) throw error;
        toast.success('تم تحديث الخدمة بنجاح', {
          description: 'تم حفظ التغييرات على الخدمة',
        });
      } else {
        // Create new service
        const { error } = await supabase
          .from('services')
          .insert([formData]);

        if (error) throw error;
        toast.success('تم إضافة الخدمة بنجاح', {
          description: 'تمت إضافة خدمة جديدة إلى النظام',
        });
      }

      onSuccess();
    } catch (error: any) {
      toast.error('خطأ في حفظ الخدمة', {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-xl font-semibold text-almanbar-navy">
          {service ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title_ar" className="text-gray-700">
                العنوان بالعربية *
              </Label>
              <Input
                id="title_ar"
                value={formData.title_ar}
                onChange={(e) => handleChange('title_ar', e.target.value)}
                required
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title_en" className="text-gray-700">
                العنوان بالإنجليزية *
              </Label>
              <Input
                id="title_en"
                value={formData.title_en}
                onChange={(e) => handleChange('title_en', e.target.value)}
                required
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="description_ar" className="text-gray-700">
                الوصف بالعربية *
              </Label>
              <Textarea
                id="description_ar"
                value={formData.description_ar}
                onChange={(e) => handleChange('description_ar', e.target.value)}
                required
                rows={4}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_en" className="text-gray-700">
                الوصف بالإنجليزية *
              </Label>
              <Textarea
                id="description_en"
                value={formData.description_en}
                onChange={(e) => handleChange('description_en', e.target.value)}
                required
                rows={4}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="icon_name" className="text-gray-700">
                الأيقونة
              </Label>
              <Select
                value={formData.icon_name}
                onValueChange={(value) => handleChange('icon_name', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر أيقونة" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="display_order" className="text-gray-700">
                ترتيب العرض
              </Label>
              <Input
                id="display_order"
                type="number"
                min="0"
                value={formData.display_order}
                onChange={(e) => handleChange('display_order', parseInt(e.target.value) || 0)}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-3 pt-6">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleChange('featured', checked)}
                className="data-[state=checked]:bg-blue-600"
              />
              <Label htmlFor="featured" className="text-gray-700">
                خدمة مميزة
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url" className="text-gray-700">
              رابط الصورة
            </Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => handleChange('image_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  جارٍ الحفظ...
                </>
              ) : service ? (
                'تحديث الخدمة'
              ) : (
                'إضافة الخدمة'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};