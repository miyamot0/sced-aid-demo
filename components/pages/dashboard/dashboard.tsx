"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useRecords } from "@/hooks/use-storage";
import { EllipsisIcon, PlusIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KEY_DIALOG, updateDialogState } from "@/hooks/use-dialog";
import { cn } from "@/lib/utils";
import Hero from "@/components/ui/hero";
import Link from "next/link";

export default function DashboardPage() {
  const dashboardData = useRecords();
  const queryClient = useQueryClient();

  if (dashboardData.isLoading) {
    return <LoadingSpinner />;
  }

  if (dashboardData.isError || !dashboardData.data) {
    return <div>Error</div>;
  }

  return (
    <>
      <Hero
        Title="Project Dashboard"
        Description="Manage and follow-up on project decision-making"
      ></Hero>

      <Card className="my-4">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>
            Displaying Records ({`n = ${dashboardData.data?.length}`})
          </CardTitle>
          <Button
            variant={"outline"}
            className="flex flex-row gap-2"
            onClick={async () => {
              updateDialogState({
                data: undefined,
                records: dashboardData.data,
                type: "add",
              });

              await queryClient.invalidateQueries({
                queryKey: [KEY_DIALOG],
              });
              await queryClient.refetchQueries({
                queryKey: [KEY_DIALOG],
              });
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
                <TableHead>Entry Name</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {dashboardData.data
                .sort((a, b) => {
                  return (
                    new Date(b.updated_utc).valueOf() -
                    new Date(a.updated_utc).valueOf()
                  );
                })
                .map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex flex-row gap-2 items-center">
                        {record.title}
                        <div
                          className={cn("h-3 w-3 rounded-full border", {
                            "bg-green-300": record.active,
                            "bg-orange-300": !record.active,
                          })}
                        >
                          <span className="sr-only">Active</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(record.updated_utc).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="items-center flex flex-row justify-end gap-4">
                      <Link href={`/workflow/${record.id}`}>
                        <Button>Open</Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div className="p-2 border rounded-lg">
                            <EllipsisIcon />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>
                            Record Management
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={async () => {
                              updateDialogState({
                                data: record,
                                records: dashboardData.data,
                                type: "edit",
                              });

                              await queryClient.invalidateQueries({
                                queryKey: [KEY_DIALOG],
                              });
                              await queryClient.refetchQueries({
                                queryKey: [KEY_DIALOG],
                              });
                            }}
                          >
                            Edit Record
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={async () => {
                              updateDialogState({
                                data: record,
                                records: dashboardData.data,
                                type: "delete",
                              });

                              await queryClient.invalidateQueries({
                                queryKey: [KEY_DIALOG],
                              });
                              await queryClient.refetchQueries({
                                queryKey: [KEY_DIALOG],
                              });
                            }}
                          >
                            Delete Record
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
