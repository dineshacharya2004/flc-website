import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React from "react";

import Navbar from "../navbar/navbar";
import AdminSidebar from "../Sidebar/adminSidebar";

gsap.registerPlugin(ScrollTrigger);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="flex">
        <AdminSidebar />
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
