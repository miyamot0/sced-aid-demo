"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  KEY_RECORDS,
  saveRecordsToLocal,
  SCDADataObject,
  SCDDecisionNode,
  useRecords,
} from "@/hooks/use-storage";
import { MethodologyNodes } from "@/node-tree/decision-nodes";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoremIpsum } from "lorem-ipsum";

function getCurrentNode(current_data: SCDADataObject) {
  const { nodes } = current_data;

  if (nodes.length === 0) {
    return MethodologyNodes[0] as SCDDecisionNode;
  }

  const last_node = nodes.slice(-1)[0];

  if (last_node.Selection === "Yes")
    return MethodologyNodes.find((node) => node.Node === last_node.Yes);
  if (last_node.Selection === "No")
    return MethodologyNodes.find((node) => node.Node === last_node.No);

  throw new Error("Invalid Decision Tree");
}

export default function WorkflowPage({ id }: { id: string }) {
  const records = useRecords();
  const queryClient = useQueryClient();

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

  const current_node = getCurrentNode(local_data);

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  // Note: specific for METHODOLOGY

  return (
    <main className="grid grid-cols-4 w-full my-4 gap-4">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-1 p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <p className="w-full text-center text-2xl font-semibold leading-none tracking-tight">
            Decision Points
          </p>
          {local_data.nodes.map((node, index) => (
            <p key={index}>
              {index + 1}. {node.Question}{" "}
              <span className="font-bold">{node.Selection}</span>
            </p>
          ))}
        </div>
        {current_node && current_node.End === true && (
          <Button
            onClick={() => {
              toast.warning("Output functionality not enabled.", {});
            }}
          >
            Output Record
          </Button>
        )}
      </div>
      <Card className="w-full col-span-3">
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-col gap-1.5">
            <CardTitle>Decision-making Process for SCD Methods</CardTitle>
            <CardDescription>
              Currently displaying Node: {current_node && current_node.Node}
            </CardDescription>
          </div>
          <Button
            onClick={() => {
              if (local_data.nodes.length === 0) return;

              const updated_nodes = local_data.nodes.slice(0, -1);

              const updated_records = records.data.map((record) => {
                if (record.id === local_data.id) {
                  return {
                    ...record,
                    nodes: updated_nodes,
                    updated_utc: new Date().toISOString(),
                  };
                }

                return record;
              });

              saveRecordsToLocal(updated_records);

              queryClient.invalidateQueries({
                queryKey: [KEY_RECORDS],
              });

              toast("Updated Decision Tree", {});
            }}
          >
            Back
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>
            <span className="font-bold">Question</span>:{" "}
            {current_node && current_node.Question}
          </p>

          <div className="w-full flex flex-col md:flex-row justify-between">
            {current_node && current_node.Yes && (
              <Button
                onClick={() => {
                  const updated_nodes = [
                    ...local_data.nodes,
                    { ...current_node, Selection: "Yes" },
                  ];

                  const updated_records = records.data.map((record) => {
                    if (record.id === local_data.id) {
                      return {
                        ...record,
                        nodes: updated_nodes,
                        updated_utc: new Date().toISOString(),
                      };
                    }

                    return record;
                  });

                  saveRecordsToLocal(updated_records);

                  queryClient.invalidateQueries({
                    queryKey: [KEY_RECORDS],
                  });

                  toast("Updated Decision Tree", {});
                }}
              >
                Yes
              </Button>
            )}
            {current_node && current_node.No && (
              <Button
                onClick={() => {
                  const updated_nodes = [
                    ...local_data.nodes,
                    { ...current_node, Selection: "No" },
                  ];

                  const updated_records = records.data.map((record) => {
                    if (record.id === local_data.id) {
                      return {
                        ...record,
                        nodes: updated_nodes,
                        updated_utc: new Date().toISOString(),
                      };
                    }

                    return record;
                  });

                  saveRecordsToLocal(updated_records);

                  queryClient.invalidateQueries({
                    queryKey: [KEY_RECORDS],
                  });

                  toast("Updated Decision Tree", {});
                }}
              >
                No
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <hr />
            <p>
              <span className="font-bold">Resource: </span>
              {lorem.generateParagraphs(1)}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
