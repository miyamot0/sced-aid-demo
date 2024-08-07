"use client";

import LoadingSpinner from "@/components/ui/loading-spinner";
import { useRecords } from "@/hooks/use-storage";

export default function WorkflowPage({ id }: { id: string }) {
  const records = useRecords();

  if (records.isLoading) {
    return <LoadingSpinner />;
  }

  if (records.isError || !records.data) {
    return <div>Error</div>;
  }

  const local_data = records.data.find((record) => record.id === id);

  if (!local_data) {
    return <div>Not Found</div>;
  }

  return (
    <main className="flex flex-col items-center justify-between">
      <div>{JSON.stringify(local_data)}</div>
    </main>
  );
}
