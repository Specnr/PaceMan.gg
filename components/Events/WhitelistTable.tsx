import { useEffect, useState } from "react";
import Image from "next/image";
import { timeToMs, uuidToHead } from "@/public/functions/frontendConverters";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faUser } from "@fortawesome/free-solid-svg-icons";
import { MessageSpinner } from "../MessageSpinner";

interface PlayerData {
  uuid: string;
  username: string;
  pb?: string;
}

interface PBData {
  finish: number;
  uuid: string;
  timestamp: number;
  name: string;
  pb: string;
}

export default function WhitelistTable({ whitelist }: { whitelist: string[] }) {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        // Fetch player usernames
        const playerPromises = whitelist.map(async (uuid) => {
          try {
            const response = await fetch(`https://playerdb.co/api/player/minecraft/${uuid}`);
            const data = await response.json();

            if (data.success) {
              return {
                uuid,
                username: data.data.player.username
              };
            }
            return { uuid, username: "Unknown" };
          } catch (err) {
            console.error(`Error fetching player ${uuid}:`, err);
            return { uuid, username: "Error" };
          }
        });

        const playerData = await Promise.all(playerPromises);

        // Fetch PB data
        try {
          const uuidString = whitelist.join(',');
          const pbResponse = await fetch(`/api/getPBs?uuids=${uuidString}`);
          const pbData: PBData[] = await pbResponse.json();

          // Merge PB data with player data
          const playersWithPB = playerData.map(player => {
            const playerPB = pbData.find(pb => pb.uuid === player.uuid);
            return {
              ...player,
              pb: playerPB?.pb || "N/A"
            };
          });

          playersWithPB.sort((a, b) => timeToMs(a.pb) - timeToMs(b.pb));
          setPlayers(playersWithPB);
        } catch (pbErr) {
          console.error("Error fetching PB data:", pbErr);
          // Still show players even if PB fetch fails
          playerData.sort((a, b) => a.username.localeCompare(b.username));
          setPlayers(playerData.map(player => ({ ...player, pb: "Error" })));
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching players:", err);
        setError("Failed to load player data");
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [whitelist]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <MessageSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400 text-3xl mb-4" />
        <p className="text-gray-300">{error}</p>
        <p className="text-sm text-gray-500 mt-2">Please try again later</p>
      </div>
    );
  }

  // Empty state
  if (!players || players.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FontAwesomeIcon icon={faUser} className="text-gray-400 text-3xl mb-4" />
        <p className="text-gray-300 text-lg mb-2">No players in whitelist</p>
        <p className="text-gray-500 text-sm">This event doesn&apos;t have any whitelisted players yet</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-y-auto max-h-[50vh] pb-4">
        <div className="grid grid-cols-[minmax(0,1fr)_80px] md:grid-cols-[minmax(0,1fr)_240px] text-xs uppercase tracking-wider text-gray-400 px-4 py-2">
          <div>Player</div>
          <div>PB</div>
        </div>

        {players.map((player, idx) => (
          <div key={idx} className="border-b border-gray-700/50 last:border-0">
            <div className="grid grid-cols-[minmax(0,1fr)_80px] md:grid-cols-[minmax(0,1fr)_240px] py-3 px-4 hover:bg-gray-700/30 transition-colors duration-150">
              {/* Player name column */}
              <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                <button
                  className="transition-transform hover:scale-110 focus:outline-none hidden sm:block flex-shrink-0"
                  onClick={() => router.push(`/stats/player/${player.username}`)}
                  aria-label={`View stats for ${player.username}`}
                >
                  <div className="w-8 h-8 overflow-hidden">
                    <Image
                      alt={`${player.username}'s avatar`}
                      src={uuidToHead(player.uuid)}
                      width={32}
                      height={32}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
                <span className="text-gray-200 truncate max-w-full">
                  {player.username}
                </span>
              </div>

              {/* PB column */}
              <div className="flex items-center justify-start min-w-0">
                <span className="text-gray-300">
                  {player.pb}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 