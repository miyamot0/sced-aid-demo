"use client";

import LoadingSpinner from "@/components/ui/loading-spinner";
import { useStorage } from "@/hooks/use-storage";
import { useSearchParams } from "next/navigation";
import StorageForm from "./forms/storage";
import VisualsForm from "./forms/visuals";

export type SettingsPageOption = "storage" | "visuals";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("category") as SettingsPageOption;
  const param: SettingsPageOption = search ? search : "storage";

  const storageData = useStorage();

  if (storageData.isLoading) {
    return <LoadingSpinner />;
  }

  if (storageData.isError || !storageData.data) {
    return <div>Error</div>;
  }

  if (param === "storage") {
    return <StorageForm Settings={storageData.data} Search={param} />;
  } else {
    return <VisualsForm Settings={storageData.data} Search={param} />;
  }
}
