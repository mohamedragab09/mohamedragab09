import AdminContent from "@/components/admin/admin-content";
import { AppSidebar } from "@/components/admin/dashboard-components/app-sidebar";
import { SiteHeader } from "@/components/admin/dashboard-components/site-header";
import { AuthProvider } from "@/components/context/auth-context";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({ children }:Readonly<{ children: React.ReactNode}>) {
    return (
        <AuthProvider>
            <AdminContent>
                <SidebarProvider
                    style={
                        {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)"
                        } as React.CSSProperties
                    }
                    >
                    <AppSidebar variant="inset" />
                    <SidebarInset>
                        <SiteHeader />
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            {children}
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </AdminContent>
        </AuthProvider>
    )
}