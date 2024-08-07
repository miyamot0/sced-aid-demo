"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { saveSettingsToLocal, SettingsDataObject } from "@/hooks/use-storage";
import { useState } from "react";

type SettingsPageOption = "storage" | "licenses";

export const LabelControl = ({
  Title,
  Description,
}: {
  Title: string;
  Description: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold leading-none tracking-tight">{Title}</span>
      <span className="">{Description}</span>
    </div>
  );
};

export default function StorageForm({
  Settings,
  Search,
}: {
  Settings: SettingsDataObject;
  Search: SettingsPageOption;
}) {
  const [dataLocal, setDataLocal] = useState<SettingsDataObject>(Settings);

  function handleSave(updated: SettingsDataObject) {
    setDataLocal(updated);
    saveSettingsToLocal(updated);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="capitalize">{`${Search} Settings`}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div className="border rounded flex flex-row justify-between p-4 items-center">
          <LabelControl
            Title="Automatically Save Progress"
            Description="Overwrite settings and data without user interaction"
          />
          <Switch
            checked={dataLocal.autosave}
            onCheckedChange={(checked) => {
              handleSave({
                ...dataLocal,
                autosave: checked,
              });
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
