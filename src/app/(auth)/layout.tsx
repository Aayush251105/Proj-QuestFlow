"use client"
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React from "react";

// ui
import { BackgroundBeams } from "@/components/ui/background-beams";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    // if session exists push user to home page
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  // children i.e login/register page will be loaded in children
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
      <BackgroundBeams />
        <div className="relative">{children}</div>
    </div>
  );
};

export default Layout;
