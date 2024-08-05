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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { KEY_RECORDS, saveRecordsToLocal } from "@/hooks/use-storage";
import { toast } from "sonner";

export default function DashboardAddDialog() {
  const dialogData = useDialogState();
  const queryClient = useQueryClient();
  const [inputLabel, setInputLabel] = useState("");

  const { data } = dialogData;

  if (data?.records === undefined || data?.type !== "add") {
    return null;
  }

  const close_dialog = () => {
    setInputLabel("");
    updateDialogState({ data: undefined, type: undefined });

    queryClient.invalidateQueries({ queryKey: [KEY_DIALOG] });
    queryClient.refetchQueries({
      queryKey: [KEY_DIALOG],
    });
  };

  return (
    <Dialog open={true} onOpenChange={() => close_dialog()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Record</DialogTitle>
          <DialogDescription className="flex flex-col gap-4 pt-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="label">Record Name</Label>
              <Input
                type="text"
                id="label"
                placeholder="Name for entry"
                value={inputLabel}
                onChange={(e) => setInputLabel(e.target.value)}
              />
            </div>

            <div className="flex flex-row justify-end gap-2">
              <Button variant={"outline"} onClick={() => close_dialog()}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const new_record = {
                    id: uuidv4(),
                    created_utc: new Date().toISOString(),
                    updated_utc: new Date().toISOString(),
                    title: inputLabel,
                    active: true,
                  };

                  saveRecordsToLocal([...(data.records ?? []), new_record]);

                  queryClient.invalidateQueries({
                    queryKey: [KEY_RECORDS],
                  });

                  toast("New Entry Added to Dashboard", {});

                  close_dialog();
                }}
              >
                Create
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
