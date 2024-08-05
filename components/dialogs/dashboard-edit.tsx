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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { KEY_RECORDS, saveRecordsToLocal } from "@/hooks/use-storage";
import { LabelControl } from "../pages/settings/forms/storage";
import { Switch } from "../ui/switch";

export default function DashboardEditDialog() {
  const dialogData = useDialogState();
  const queryClient = useQueryClient();

  const { data } = dialogData;

  const [inputLabel, setInputLabel] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (inputLabel === "" && data?.data?.title) {
      setInputLabel(data.data.title);
      setIsActive(data.data.active);
    }

    () => {};
  }, [data]);

  if (
    data?.data === undefined ||
    data?.records === undefined ||
    data?.type !== "edit"
  ) {
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
          <DialogTitle>Edit Current Record</DialogTitle>
          <DialogDescription className="flex flex-col gap-4 pt-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="label">Record Name</Label>
              <Input
                type="text"
                id="label"
                placeholder="Name for entry"
                value={inputLabel}
                onChange={(e) => setInputLabel(e.target.value)}
              />
            </div>

            <div className="flex flex-row justify-between items-center">
              <span className="font-semibold leading-none tracking-tight">
                Active Record?
              </span>
              <Switch
                checked={isActive}
                onCheckedChange={(checked) => {
                  setIsActive(checked);
                }}
              />
            </div>

            <div className="flex flex-row justify-end gap-2">
              <Button variant={"outline"} onClick={() => close_dialog()}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const updated_records = data.records!.map((record) => {
                    if (record.id === data.data?.id) {
                      return {
                        ...record,
                        title: inputLabel,
                        active: isActive,
                        updated_utc: new Date().toISOString(),
                      };
                    }

                    return record;
                  });

                  saveRecordsToLocal(updated_records);

                  queryClient.invalidateQueries({
                    queryKey: [KEY_RECORDS],
                  });

                  toast("Edited Entry Added to Dashboard", {});

                  close_dialog();
                }}
              >
                Edit
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
