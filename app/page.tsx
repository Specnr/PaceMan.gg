"use client"
import Title from "@/components/Title";
import { Tooltip, Chip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faSliders, faUser, faChartLine } from "@fortawesome/free-solid-svg-icons";
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
  const [settings, setSettings] = useState<PaceSettings>({ version: "All", liveOnly: false });

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
    <div className="flex flex-col h-full fade-in">
      <Title />

      {showSettings && (
        <div className="slide-in mb-4">
          <SettingsTable settings={settings} setSettings={setSettings} />
        </div>
      )}

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden flex-1 max-w-5xl mx-auto w-full">
        <div className="p-3 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faChartLine} className="text-purple-400 mr-2" />
            <h2 className="text-xl font-medium">Active Pace</h2>

            {/* Version and Live chips */}
            <div className="ml-3 hidden sm:flex gap-2">
              {settings.version !== "All" && (
                <Chip
                  size="sm"
                  variant="flat"
                  color="secondary"
                  className="bg-purple-900/30"
                >
                  {settings.version}
                </Chip>
              )}
              {settings.liveOnly && (
                <Chip
                  size="sm"
                  variant="flat"
                  color="success"
                  className="bg-green-900/30"
                >
                  Live Only
                </Chip>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Tooltip
              showArrow
              placement="bottom"
              content={
                <div className="text-left p-2">
                  <p className="font-medium mb-1">Quick Guide:</p>
                  <p>• Click on time → Splits</p>
                  <p>• Click on head → Stats profile</p>
                  <p>• Hover over time → Current time</p>
                  <p>• Hover over split → Pearl/Rod count</p>
                  <p>• <span className="font-bold">Bolded</span> → Good pace, will prioritize</p>
                  <p>• <span className="text-purple-400">Purple name</span> → Live, click to watch</p>
                </div>
              }
              className="bg-gray-900"
            >
              <button className="text-gray-300 hover:text-white transition-all p-2 rounded-full hover:bg-gray-700/50">
                <FontAwesomeIcon icon={faCircleInfo} size="lg" />
              </button>
            </Tooltip>

            <button
              className={`text-gray-300 hover:text-white transition-all p-2 rounded-full ${showSettings ? 'bg-purple-700/50 text-white' : 'hover:bg-gray-700/50'}`}
              onClick={() => setShowSettings(!showSettings)}
            >
              <FontAwesomeIcon icon={faSliders} size="lg" />
            </button>

            <div className="flex items-center bg-gray-700/30 px-3 py-1.5 rounded-full">
              <FontAwesomeIcon icon={faUser} className="text-purple-400 mr-2" />
              <span className="font-medium">{playerCount}</span>
            </div>
          </div>
        </div>
        <div className="overflow-auto h-full">
          <PaceLeaderboard settings={settings} />
        </div>
      </div>
    </div>
  );
}
