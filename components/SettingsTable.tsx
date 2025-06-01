import { gameVersions } from "@/public/functions/frontendConverters";
import { Checkbox, Select, SelectItem, Card } from "@nextui-org/react";
import { PaceSettings } from "./interfaces/Pace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faFilter } from "@fortawesome/free-solid-svg-icons";

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
    <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-lg max-w-5xl mx-auto w-full">
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <FontAwesomeIcon icon={faFilter} className="text-purple-400 mr-2" />
          Settings
        </h3>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-auto">
            <Select
              label="Game Version"
              size="sm"
              variant="bordered"
              startContent={<FontAwesomeIcon icon={faGamepad} className="text-purple-400" />}
              className="min-w-[200px]"
              defaultSelectedKeys={[settings.version]}
              classNames={{
                trigger: "bg-gray-900/60 border-gray-700",
                listbox: "bg-gray-900 border-gray-700",
              }}
              onChange={(e) => setAndUpdateSettings({ ...settings, version: e.target.value })}
            >
              {gameVersions.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center">
            <Checkbox
              onValueChange={(liveOnly) => setAndUpdateSettings({ ...settings, liveOnly })}
              isSelected={settings.liveOnly}
              color="secondary"
              className="text-base"
            >
              Show Live Streams Only
            </Checkbox>
          </div>
        </div>
      </div>
    </Card>
  );
}