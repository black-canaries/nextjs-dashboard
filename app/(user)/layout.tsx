"use client"

import { useState } from 'react'
import Sidebar from '@/ui/layouts/sidebar/sidebar'
import MainHeader from '@/ui/layouts/header/main-header'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  }

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={toggleSidebar} />

      <div className="xl:pl-72">
        <MainHeader setSidebarOpen={toggleSidebar} />

        {children}

        {/* <ActivityFeed /> */}
      </div>
    </div>
  );
}
