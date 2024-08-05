import {
  KEY_DIALOG,
  updateDialogState,
  useDialogState,
} from "@/hooks/use-dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import {
  KEY_RECORDS,
  saveRecordsToLocal,
  SCDADataObject,
} from "@/hooks/use-storage";
import { toast } from "sonner";

export function mutate_data({
  records,
  payload,
}: {
  records: SCDADataObject[];
  payload: {
    id?: string;
    action: "delete";
  };
}) {
  switch (payload.action) {
    case "delete":
      if (payload.id === undefined)
        throw new Error("Valid ID required for deleting records");

      const new_records = records.filter((r) => r.id !== payload.id);

      return new_records;
    default:
      throw new Error("Invalid action");
  }
}

export default function DashboardDeleteDialog() {
  const dialogData = useDialogState();
  const queryClient = useQueryClient();

  const { data } = dialogData;

  const object_info = data?.data;

  if (object_info === undefined || data?.type !== "delete") {
    return null;
  }

  const close_dialog = () => {
    updateDialogState({ data: undefined });
    queryClient.invalidateQueries({ queryKey: [KEY_DIALOG] });
    queryClient.refetchQueries({
      queryKey: [KEY_DIALOG],
    });
  };

  return (
    <Dialog
      open={object_info ? true : false}
      onOpenChange={() => close_dialog()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <span>This action cannot be undone.</span>
            <div className="flex flex-row justify-end gap-2">
              <Button variant={"outline"} onClick={() => close_dialog()}>
                Cancel
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => {
                  const updated_records = mutate_data({
                    records: data?.records ?? [],
                    payload: { id: object_info.id, action: "delete" },
                  });

                  saveRecordsToLocal(updated_records);

                  queryClient.refetchQueries({
                    queryKey: [KEY_RECORDS],
                  });

                  toast("Record Deleted", {});

                  close_dialog();
                }}
              >
                Delete
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
