import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AdminServices } from '@/components/admin/AdminServices';
import { AdminProjects } from '@/components/admin/AdminProjects';
import { AdminPartners } from '@/components/admin/AdminPartners';
import { AdminMessages } from '@/components/admin/AdminMessages';
import { LogOut, Settings, FileText, Users, Briefcase, MessageSquare } from 'lucide-react';

const Admin = () => {
  const { user, signOut, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-almanbar-gold"></div>
          <p className="text-gray-600 font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-almanbar-gold flex items-center justify-center">
                <span className="text-white font-bold text-lg">ع</span>
              </div>
              <h1 className="text-2xl font-bold text-almanbar-navy bg-gradient-to-r from-almanbar-navy to-almanbar-gold bg-clip-text text-transparent">
                لوحة التحكم - عالم المنير
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                <div className="w-8 h-8 rounded-full bg-almanbar-gold/10 flex items-center justify-center text-almanbar-gold">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">مرحباً، {user.email}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="services" className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
            <TabsList className="grid w-full grid-cols-4 gap-1 bg-gray-50">
              <TabsTrigger 
                value="services" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-almanbar-gold"
              >
                <Settings className="w-4 h-4" />
                <span>الخدمات</span>
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-almanbar-gold"
              >
                <Briefcase className="w-4 h-4" />
                <span>المشاريع</span>
              </TabsTrigger>
              <TabsTrigger 
                value="partners" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-almanbar-gold"
              >
                <Users className="w-4 h-4" />
                <span>الشركاء</span>
              </TabsTrigger>
              <TabsTrigger 
                value="messages" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-almanbar-gold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>الرسائل</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <TabsContent value="services" className="m-0">
              <AdminServices />
            </TabsContent>
            <TabsContent value="projects" className="m-0">
              <AdminProjects />
            </TabsContent>
            <TabsContent value="partners" className="m-0">
              <AdminPartners />
            </TabsContent>
            <TabsContent value="messages" className="m-0">
              <AdminMessages />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;