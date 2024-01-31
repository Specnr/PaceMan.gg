"use client";
import Title from "@/components/Title";
import { UserData } from "@/components/interfaces/UserData";
import { fetcher } from "@/public/functions/converters";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { msToTime, uuidToSkin } from "@/public/functions/frontendConverters";
import CompletionTable from "@/components/Leaderboards/CompletionTable";
import UserCompletion from "@/components/interfaces/Completion";
import Image from "next/image";

const TitleContent = (params: { name: string }) => (
  <span className="italic">{params.name}</span>
);

const PBSectionEntry = (params: {
  filter: string;
  completion: UserCompletion;
  count: number;
}) => (
  <tr>
    <td className="text-left">{params.filter}: </td>
    <td className="text-right">
      {params.completion ? msToTime(params.completion.time) : "N/A"}
    </td>
    <td className="text-left">
      {params.count === -1 ? "" : ` 🏆${params.count}`}
    </td>
  </tr>
);

export default function LeaderboardPage({
  params,
}: {
  params: { name: string };
}) {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<UserData>(
    `/api/get-user?name=${params.name}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (error) {
    return router.push("/error");
  }

  let msg = null;
  if (isLoading || error || !data) {
    msg = <Spinner color="secondary" size="lg" />;
  }

  if (data && data.completions.length === 0) {
    msg = <span>There is no data on this player yet...</span>;
  }

  if (msg !== null) {
    return (
      <div className="container-height grid place-items-center">{msg}</div>
    );
  }

  return (
    <div className="container-height">
      <div className="pt-16">
        <Title titleOverrite={<TitleContent name={params.name} />} />
      </div>
      <div className="w-full max-w-[1200px] mx-auto mt-4 flex flex-col lg:flex-row justify-center items-center lg:items-start">
        <div className="w-2/3 lg:w-1/3">
          <div className="mx-auto w-0 lg:w-fit">
            <Image
              alt="avatar"
              src={uuidToSkin(data!.uuid)}
              width={128}
              height={512}
              unoptimized
            />
          </div>
          <div className="mx-auto w-3/4 uppercase bg-gray-700 text-gray-400 text-xs sm:text-sm lg:text-base lg:mt-4 font-semibold">
            <div className="py-3">
              <span>
                Personal Best:{" "}
                {data!.pbs.allTime ? msToTime(data!.pbs.allTime.time) : "N/A"}
              </span>
              <table className="pt-2 w-3/4 mx-auto">
                <tbody>
                  <PBSectionEntry
                    key="monthly-pb"
                    filter="Monthly"
                    completion={data!.pbs.monthly}
                    count={data!.monthly}
                  />
                  <PBSectionEntry
                    key="weekly-pb"
                    filter="Weekly"
                    completion={data!.pbs.weekly}
                    count={data!.weekly}
                  />
                  <PBSectionEntry
                    key="daily-pb"
                    filter="Daily"
                    completion={data!.pbs.daily}
                    count={data!.daily}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-2/3 ml-0 mt-2 lg:ml-3 lg:mt-0 lg:w-1/3">
          <div>
            <CompletionTable simplify completions={data!.completions} />
          </div>
        </div>
      </div>
    </div>
  );
}
