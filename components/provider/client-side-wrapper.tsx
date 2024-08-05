"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import DashboardDeleteDialog from "../dialogs/dashboard-delete";
import DashboardAddDialog from "../dialogs/dashboard-add";
import DashboardEditDialog from "../dialogs/dashboard-edit";

export default function ClientSideWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <DashboardDeleteDialog />
      <DashboardAddDialog />
      <DashboardEditDialog />

      <Toaster />
    </QueryClientProvider>
  );
}
