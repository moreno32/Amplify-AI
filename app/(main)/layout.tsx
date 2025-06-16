import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen w-full grid-cols-[220px_1fr] grid-rows-[auto_1fr] overflow-hidden">
      <div className="row-span-2 border-r">
        <Sidebar />
      </div>
      <div className="border-b">
        <Header />
      </div>
      <main className="overflow-y-auto p-4 lg:p-6 flex flex-col">
        {children}
      </main>
    </div>
  );
} 