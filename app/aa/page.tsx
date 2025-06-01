"use client";
import Title from "@/components/Title";
import { Tooltip, Chip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faChartLine } from "@fortawesome/free-solid-svg-icons";
import AAPaceLeaderboard from "@/components/Leaderboards/AAPaceLeaderboard";

export default function Home() {
  return (
    <div className="flex flex-col h-full fade-in">
      <Title />

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden flex-1 max-w-5xl mx-auto w-full">
        <div className="p-3 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faChartLine} className="text-purple-400 mr-2" />
            <h2 className="text-xl font-medium">All Advancements Pace</h2>
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
                  <p>• Hover over split → Advancement progress</p>
                  <p>• Hover over missing → Missing criteria</p>
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
          </div>
        </div>
        <div className="overflow-auto h-full">
          <AAPaceLeaderboard />
        </div>
      </div>
    </div>
  );
}
