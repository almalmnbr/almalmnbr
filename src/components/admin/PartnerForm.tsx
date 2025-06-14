
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PartnerFormProps {
  partner?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const PartnerForm = ({ partner, onClose, onSuccess }: PartnerFormProps) => {
  const [formData, setFormData] = useState({
    name_ar: partner?.name_ar || '',
    name_en: partner?.name_en || '',
    logo_url: partner?.logo_url || '',
    website_url: partner?.website_url || '',
    description_ar: partner?.description_ar || '',
    description_en: partner?.description_en || '',
    featured: partner?.featured || false,
    display_order: partner?.display_order || 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (partner) {
        // Update existing partner
        const { error } = await supabase
          .from('partners')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', partner.id);

        if (error) throw error;
        toast.success('تم تحديث الشريك بنجاح');
      } else {
        // Create new partner
        const { error } = await supabase
          .from('partners')
          .insert([formData]);

        if (error) throw error;
        toast.success('تم إضافة الشريك بنجاح');
      }

      onSuccess();
    } catch (error: any) {
      toast.error('خطأ في حفظ الشريك: ' + error.message);
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
          {partner ? 'تعديل الشريك' : 'إضافة شريك جديد'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name_ar">الاسم بالعربية</Label>
              <Input
                id="name_ar"
                value={formData.name_ar}
                onChange={(e) => handleChange('name_ar', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="name_en">الاسم بالإنجليزية</Label>
              <Input
                id="name_en"
                value={formData.name_en}
                onChange={(e) => handleChange('name_en', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logo_url">رابط الشعار</Label>
              <Input
                id="logo_url"
                value={formData.logo_url}
                onChange={(e) => handleChange('logo_url', e.target.value)}
                placeholder="https://example.com/logo.jpg"
              />
            </div>
            <div>
              <Label htmlFor="website_url">رابط الموقع</Label>
              <Input
                id="website_url"
                value={formData.website_url}
                onChange={(e) => handleChange('website_url', e.target.value)}
                placeholder="https://example.com"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="featured">شريك مميز</Label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-almanbar-gold hover:bg-almanbar-gold-dark text-almanbar-navy"
            >
              {isLoading ? 'جارٍ الحفظ...' : (partner ? 'تحديث' : 'إضافة')}
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
