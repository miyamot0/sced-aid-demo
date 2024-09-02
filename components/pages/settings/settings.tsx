"use client";

import LoadingSpinner from "@/components/ui/loading-spinner";
import { useStorage } from "@/hooks/use-storage";
import StorageForm from "./forms/storage";
import Hero from "@/components/ui/hero";
import { ReactNode } from "react";

export type SettingsPageOption = "storage" | "visuals";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-between">
      <Hero
        Title="Settings"
        Description="Manage program settings and configuration"
      ></Hero>
      {children}
    </main>
  );
};

export default function SettingsPage() {
  const storageData = useStorage();

  if (storageData.isLoading) {
    return <LoadingSpinner />;
  }

  if (storageData.isError || !storageData.data) {
    return <div>Error</div>;
  }

  return (
    <Wrapper>
      <StorageForm Settings={storageData.data} />
    </Wrapper>
  );
}
