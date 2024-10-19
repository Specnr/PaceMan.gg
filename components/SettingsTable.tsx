import { gameVersions } from "@/public/functions/frontendConverters";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import { PaceSettings } from "./interfaces/Pace";

interface Props {
  settings: PaceSettings;
  setSettings: (ps: PaceSettings) => void
}

export default function SettingsTable({ settings, setSettings }: Props) {
  const setAndUpdateSettings = (update: PaceSettings) => {
    localStorage.setItem("PaceMan-Pace-Settings", JSON.stringify(update))
    setSettings(update)
  }

  return (
    <div className="justify-items-center mt-2 mx-auto w-6/12">
      <Select
        label="Select a version"
        size="sm"
        className="w-1/5"
        defaultSelectedKeys={[settings.version]}
        onChange={(e) => setAndUpdateSettings({ ...settings, version: e.target.value })}
        >
        {gameVersions.map((v) => (
          <SelectItem key={v}>{v}</SelectItem>
        ))}
      </Select>
      <Checkbox
        onValueChange={(liveOnly) => setAndUpdateSettings({ ...settings, liveOnly })}
        isSelected={settings.liveOnly}
        className="pl-4">
        Live Only
      </Checkbox>
    </div>
  );
}