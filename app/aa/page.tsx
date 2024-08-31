import Title from "@/components/Title";
import { Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import AAPaceLeaderboard from "@/components/Leaderboards/AAPaceLeaderboard";

export default function Home() {
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
                <p>Click on time {"->"} Splits</p>
                <p>Click on head {"->"} User profile</p>
                <p>Hover over time {"->"} Current time</p>
                <p>Hover over split {"->"} Pearl/Rod count</p>
                <p>Bolded {"->"} Good pace, will prioritize</p>
                <p>Blue name {"->"} Live, click to watch</p>
              </div>
            }
          >
            <FontAwesomeIcon icon={faCircleInfo} className="pl-2" />
          </Tooltip>
        </p>
      </div>
      <AAPaceLeaderboard />
    </div>
  );
}
