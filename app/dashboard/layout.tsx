'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar"
import { MessageSquare, Lightbulb, Home, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: MessageSquare, label: 'Chatbot', href: '/dashboard/chatbot' },
    { icon: Lightbulb, label: 'Projects', href: '/dashboard/projects' },
  ];

  const handleLogout = () => {
    // Perform any necessary logout logic here
    // ...
    // Then navigate to the home page
    router.push('/');
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-[#0A0D14]">
        <Sidebar className="bg-[#0F1218] border-r border-[#1D2026]">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">John Doe</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-medium text-gray-400">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                          pathname === item.href
                            ? 'bg-blue-600/10 text-blue-500'
                            : 'text-gray-400 hover:text-gray-100 hover:bg-[#1D2026]'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <div className="mt-auto p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-gray-100 hover:bg-[#1D2026]"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
          <SidebarRail />
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 bg-[#0F1218] border-b border-[#1D2026] px-6 py-4">
            <SidebarTrigger />
          </header>
          <div className="px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}