
import { useState } from 'react';
import { usePartners } from '@/hooks/usePartners';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { PartnerForm } from './PartnerForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export const AdminPartners = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const { data: partners, isLoading } = usePartners();
  const queryClient = useQueryClient();

  const handleDelete = async (partnerId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الشريك؟')) return;

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', partnerId);

      if (error) throw error;

      toast.success('تم حذف الشريك بنجاح');
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    } catch (error: any) {
      toast.error('خطأ في حذف الشريك: ' + error.message);
    }
  };

  const handleEdit = (partner: any) => {
    setEditingPartner(partner);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPartner(null);
  };

  if (isLoading) {
    return <div className="text-center py-8">جارٍ التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-almanbar-navy">إدارة الشركاء</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-almanbar-gold hover:bg-almanbar-gold-dark text-almanbar-navy"
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة شريك جديد
        </Button>
      </div>

      {showForm && (
        <PartnerForm
          partner={editingPartner}
          onClose={handleCloseForm}
          onSuccess={() => {
            handleCloseForm();
            queryClient.invalidateQueries({ queryKey: ['partners'] });
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners?.map((partner) => (
          <Card key={partner.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-almanbar-navy">{partner.name_ar}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(partner)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(partner.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-2">{partner.name_en}</p>
              {partner.logo_url && (
                <img
                  src={partner.logo_url}
                  alt={partner.name_ar}
                  className="w-full h-20 object-contain mb-2"
                />
              )}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs ${
                  partner.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {partner.featured ? 'مميز' : 'عادي'}
                </span>
                <span className="text-xs text-gray-500">ترتيب: {partner.display_order}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
