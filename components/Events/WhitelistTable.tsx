import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import TableHeader from "@/components/TableHeader";
import Image from "next/image";
import { uuidToHead } from "@/public/functions/frontendConverters";
import { useRouter } from "next/navigation";

interface PlayerData {
  uuid: string;
  username: string;
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
        playerData.sort((a, b) => a.username.localeCompare(b.username));
        setPlayers(playerData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching players:", err);
        setError("Failed to load player data");
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [whitelist]);

  let msg = null;
  if (error) msg = error;
  else if (isLoading) msg = <Spinner color="secondary" size="lg" />;
  else if (!players || players.length === 0) msg = "No players in whitelist";

  if (msg !== null) {
    return <div className="grid h-4/6 place-items-center">{msg}</div>;
  }

  return (
    <div className="mt-2 mx-auto half-height overflow-y-auto w-full lg:w-6/12">
      <table className="relative text-lg text-left text-gray-400 justify-between w-full half-height">
        <thead className="sticky top-0 text-sm uppercase bg-gray-700 text-gray-400">
          <tr>
            <TableHeader>Avatar</TableHeader>
            <TableHeader>Player</TableHeader>
          </tr>
        </thead>
        <tbody>
          {players.map((player, idx) => (
            <tr key={idx} className="bg-gray-800 border-gray-700">
              <td
                className="pl-2 h-0 w-0 md:h-14 md:w-14 md:pl-6"
                scope="row"
                width={54}
              >
                <button
                  className="pt-2"
                  onClick={() => router.push(`/stats/player/${player.username}`)}
                >
                  <Image
                    alt="avatar"
                    src={uuidToHead(player.uuid)}
                    width={28}
                    height={28}
                    unoptimized
                  />
                </button>
              </td>
              <td className="pl-2 pr-6 py-4 font-medium">
                {player.username}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 