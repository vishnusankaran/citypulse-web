import { AppSidebar } from '@/components/app-sidebar';
import { ImageEditor } from '@/components/image-editor';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/user';
import { useNavigate } from 'react-router';

export const Dash = () => {
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {/* <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            
            </div> */}
            <ImageEditor />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
