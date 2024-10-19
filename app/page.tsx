"use client"
import Title from "@/components/Title";
import { Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faSliders } from "@fortawesome/free-solid-svg-icons";
import PaceLeaderboard from "@/components/Leaderboards/PaceLeaderboard";
import { useEffect, useState } from "react";
import SettingsTable from "@/components/SettingsTable";
import { PaceSettings } from "@/components/interfaces/Pace";

export default function Home() {
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<PaceSettings>({ version: "1.16.1", liveOnly: false });

  useEffect(() => {
    const storedSettings = localStorage.getItem("PaceMan-Pace-Settings")
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings))
    }
  }, []);

  console.log(settings)

  return (
    <div className="container-height">
      <div className="pt-16">
        <Title />
        <p className="invisible h-0 lg:h-auto lg:pt-2 lg:visible">
          The best Minecraft Speedrunning pace in real-time
          <Tooltip
            showArrow
            content={
              <div className="text-left">
                <p>Click on time {"→"} Splits</p>
                <p>Click on head {"→"} Stats profile</p>
                <p>Hover over time {"→"} Current time</p>
                <p>Hover over split {"→"} Pearl/Rod count</p>
                <p>Bolded {"→"} Good pace, will prioritize</p>
                <p>Blue name {"→"} Live, click to watch</p>
              </div>
            }
          >
            <FontAwesomeIcon icon={faCircleInfo} className="pl-2" />
          </Tooltip>
          <FontAwesomeIcon icon={faSliders} className="pl-2" onClick={() => setShowSettings(!showSettings)} />
        </p>
      </div>
      {showSettings && <SettingsTable settings={settings} setSettings={setSettings} />}
      <PaceLeaderboard settings={settings} />
    </div>
  );
}
