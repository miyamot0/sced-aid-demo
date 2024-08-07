"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { saveSettingsToLocal, SettingsDataObject } from "@/hooks/use-storage";
import { useState } from "react";
import { SettingsPageOption } from "../settings";

const LabelControl = ({
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

export default function VisualsForm({
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
            Title="Theme"
            Description="Toggle theme used by application"
          />
          <Select
            value={dataLocal.theme}
            onValueChange={(value) => {
              handleSave({
                ...dataLocal,
                theme: value as "light" | "dark",
              });
            }}
          >
            <SelectTrigger className="w-fit min-w-24">
              <SelectValue className="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Theme</SelectLabel>
                <SelectItem value="light">Light Theme</SelectItem>
                <SelectItem value="dark">Dark Theme</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded flex flex-row justify-between p-4 items-center">
          <LabelControl
            Title="Enable Tooltips and Guidance"
            Description="Enable or disable enhanced guidance and instructions"
          />
          <Switch
            checked={dataLocal.tooltips}
            onCheckedChange={(checked) => {
              handleSave({
                ...dataLocal,
                tooltips: checked,
              });
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
