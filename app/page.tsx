"use client"
import Title from "@/components/Title";
import { Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faSliders, faUser } from "@fortawesome/free-solid-svg-icons";
import PaceLeaderboard from "@/components/Leaderboards/PaceLeaderboard";
import { useEffect, useState } from "react";
import SettingsTable from "@/components/SettingsTable";
import { PaceSettings } from "@/components/interfaces/Pace";
import useSWR from "swr";

const playerFetcher = async (url: string) => {
  const data = await fetch(url).then((res) => res.json());
  return data.playerList;
};

export default function Home() {
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<PaceSettings>({ version: "1.16.1", liveOnly: false });
  
  const { data: playerList } = useSWR(
    "https://paceman.gg/api/ars/players",
    playerFetcher,
    {
      refreshWhenHidden: true,
      refreshInterval: 1000,
    }
  );
  
  const playerCount = playerList?.length || 0;

  useEffect(() => {
    const storedSettings = localStorage.getItem("PaceMan-Pace-Settings")
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings))
    }
  }, []);

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
          <span className="pl-4">
            <FontAwesomeIcon icon={faUser} className="pr-1" />
            {playerCount}
          </span>
        </p>
      </div>
      {showSettings && <SettingsTable settings={settings} setSettings={setSettings} />}
      <PaceLeaderboard settings={settings} />
    </div>
  );
}
