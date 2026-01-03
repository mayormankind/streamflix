"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Navbar } from "@/components/navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/api-client"


export default function AdminDashboardLayout({children}: {children: React.ReactNode}){
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";
    const router = useRouter()

    useEffect(()=>{
        // Check authentication
        if(!isAuthenticated()) {
        router.push("/admin/login")
        return
        }
    },[])

    if (isLoginPage) {
        return <>{children}</>;
    }

    return(
        <main className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <div className="mt-20 flex flex-1">
                {/* Sidebar */}
                <AdminSidebar />
                {children}
            </div>
        </main>
    )
}