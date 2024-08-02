"use client";

import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  KEY_RECORDS,
  saveRecordsToLocal,
  useRecords,
} from "@/hooks/use-storage";
import { EllipsisIcon, PlusIcon, PlusSquareIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ActiveIndicator = ({ active }: { active: boolean }) => {
  return (
    <div
      className={cn("h-3 w-3 rounded-full border", {
        "bg-green-400": active,
      })}
    >
      <span className="sr-only">{active ? "Active" : "Disabled"}</span>
    </div>
  );
};

export default function DashboardPage() {
  const dashboardData = useRecords();
  const queryClient = useQueryClient();

  if (dashboardData.isLoading) {
    return <LoadingSpinner />;
  }

  if (dashboardData.isError || !dashboardData.data) {
    return <div>Error</div>;
  }

  function handleUpdatedRecords() {
    const new_record = {
      id: uuidv4(),
      created_utc: new Date().toISOString(),
      updated_utc: new Date().toISOString(),
      title: "New Record",
      active: true,
    };

    saveRecordsToLocal([...(dashboardData.data ?? []), new_record]);

    queryClient.invalidateQueries({ queryKey: [KEY_RECORDS] });
  }

  return (
    <Card className="my-4">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>
          Displaying Records ({`n = ${dashboardData.data?.length}`})
        </CardTitle>
        <Button
          variant={"outline"}
          className="flex flex-row gap-2"
          onClick={() => {
            handleUpdatedRecords();
          }}
        >
          <PlusIcon className="w-6 h-6 text-gray-500" />
          Add Record
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {dashboardData.data.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <div className="flex flex-row gap-2 items-center">
                    {record.title}
                    <div className="h-3 w-3 bg-green-700 rounded-full border">
                      <span className="sr-only">Active</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{record.updated_utc}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="p-2 border rounded-lg">
                        <EllipsisIcon />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Settings</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Data Storage</DropdownMenuItem>
                      <DropdownMenuItem>Visual Options</DropdownMenuItem>
                      <DropdownMenuItem>Data Export</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
