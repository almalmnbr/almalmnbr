import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MessageSquare, Phone, Mail, Archive, Reply, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const AdminMessages = () => {
  const queryClient = useQueryClient();
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  
  const { data: messages, isLoading } = useQuery({
    queryKey: ['contact_messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', messageId);

      if (error) throw error;

      toast.success('تم تحديث حالة الرسالة');
      queryClient.invalidateQueries({ queryKey: ['contact_messages'] });
    } catch (error: any) {
      toast.error('خطأ في تحديث الرسالة: ' + error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'read': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'replied': return 'bg-green-50 text-green-600 border-green-100';
      case 'archived': return 'bg-gray-50 text-gray-600 border-gray-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'جديد';
      case 'read': return 'مقروء';
      case 'replied': return 'تم الرد';
      case 'archived': return 'مؤرشف';
      default: return status;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-6 w-24 rounded-lg" />
        </div>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-64 rounded-lg" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-4 w-32 rounded-lg" />
                <Skeleton className="h-4 w-48 rounded-lg" />
                <Skeleton className="h-4 w-32 rounded-lg" />
                <Skeleton className="h-4 w-24 rounded-lg ml-auto" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-5/6 rounded-lg" />
              </div>
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-8 w-28 rounded-lg" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-almanbar-navy">رسائل التواصل</h2>
          <p className="text-sm text-gray-500 mt-1">إدارة رسائل التواصل الواردة من العملاء</p>
        </div>
        <div className="bg-gray-50 px-4 py-2 rounded-lg text-sm text-gray-600">
          <span className="font-medium text-almanbar-navy">{messages?.length || 0}</span> رسالة
        </div>
      </div>

      <div className="space-y-4">
        {messages?.map((message) => (
          <Card 
            key={message.id} 
            className="border-0 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-4 cursor-pointer" onClick={() => toggleExpand(message.id)}>
              <div className="flex justify-between items-start gap-4">
                <CardTitle className="text-lg font-semibold text-almanbar-navy flex-1">
                  {message.subject || 'بدون موضوع'}
                </CardTitle>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      getStatusColor(message.status),
                      "border px-3 py-1 rounded-full text-sm font-medium"
                    )}
                  >
                    {getStatusText(message.status)}
                  </Badge>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-gray-400 transition-transform",
                      expandedMessage === message.id && "rotate-180"
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span>{message.name}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{message.email}</span>
                </div>
                {message.phone && (
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{message.phone}</span>
                  </div>
                )}
                <div className="ml-auto bg-gray-50 px-3 py-1 rounded-full">
                  {new Date(message.created_at).toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </CardHeader>
            
            {expandedMessage === message.id && (
              <CardContent className="pt-0">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {message.status === 'new' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateMessageStatus(message.id, 'read');
                      }}
                      className="gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      تحديد كمقروء
                    </Button>
                  )}
                  {message.status === 'read' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateMessageStatus(message.id, 'replied');
                      }}
                      className="gap-2 bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                    >
                      <Reply className="w-4 h-4" />
                      تحديد كمجاب عليه
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateMessageStatus(message.id, 'archived');
                    }}
                    className="gap-2 text-gray-600"
                  >
                    <Archive className="w-4 h-4" />
                    أرشفة
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
        
        {!messages?.length && (
          <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <Mail className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">لا توجد رسائل</h3>
            <p className="text-gray-500 text-sm mt-1">سيظهر هنا أي رسائل واردة من نموذج التواصل</p>
          </div>
        )}
      </div>
    </div>
  );
};