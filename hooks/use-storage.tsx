import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";

export const KEY_STORAGE = "storage-scda";
export const KEY_RECORDS = "records-scda";

export type SCDDecisionNode = {
  category: "methodology";
  Node: string;
  Question: string;
  Yes?: string;
  No?: string;
  Resources?: string;
  End: boolean;
  // Note: user selected
  Selection?: string;
};

export type SettingsDataObject = {
  theme: "light" | "dark";
  autosave: boolean;
  tooltips: boolean;
};

export type SCDADataObject = {
  id: string;
  created_utc: string;
  updated_utc: string;
  title: string;
  active: boolean;
  nodes: SCDDecisionNode[];
};

const default_settings: SettingsDataObject = {
  theme: "light",
  autosave: true,
  tooltips: true,
};

export const useStorage = () => {
  return useQuery<SettingsDataObject>({
    queryKey: [KEY_STORAGE],
    queryFn: () => {
      const data = localStorage.getItem(KEY_STORAGE);
      return data ? (JSON.parse(data) as SettingsDataObject) : default_settings;
    },
    throwOnError: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const saveSettingsToLocal = (settings: SettingsDataObject) => {
  localStorage.setItem(KEY_STORAGE, JSON.stringify(settings));
};

export const useRecords = () => {
  return useQuery<SCDADataObject[]>({
    queryKey: [KEY_RECORDS],
    queryFn: () => {
      const data = localStorage.getItem(KEY_RECORDS);
      return data ? (JSON.parse(data) as SCDADataObject[]) : [];
    },
    throwOnError: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const saveRecordsToLocal = (records: SCDADataObject[]) => {
  localStorage.setItem(KEY_RECORDS, JSON.stringify(records));
};
