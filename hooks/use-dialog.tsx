import { useQuery } from "@tanstack/react-query";
import { SCDADataObject } from "./use-storage";

export const KEY_DIALOG = "scda-dialogs";

export type SCDADialogObject = {
  data?: SCDADataObject;
  records?: SCDADataObject[];
  type?: "add" | "delete" | "edit";
};

const default_settings = {
  data: undefined,
  records: [],
};

export const useDialogState = () => {
  return useQuery<SCDADialogObject>({
    queryKey: [KEY_DIALOG],
    queryFn: () => {
      const data = localStorage.getItem(KEY_DIALOG);
      return data ? (JSON.parse(data) as SCDADialogObject) : default_settings;
    },
    throwOnError: true,
    refetchOnMount: true,
    //refetchOnWindowFocus: true,
  });
};

export const updateDialogState = (settings: SCDADialogObject) => {
  localStorage.setItem(KEY_DIALOG, JSON.stringify(settings));
};
