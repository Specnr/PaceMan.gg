"use client";
import Title from "@/components/Title";
import { UserData } from "@/components/interfaces/UserData";
import { fetcher } from "@/public/functions/converters";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import { uuidToSkin } from "@/public/functions/frontendConverters";
import CompletionTable from "@/components/Leaderboards/CompletionTable";

const TitleContent = (params: { name: string }) => (
  <span className="capitalize italic">{params.name}</span>
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

  if (isLoading || error || !data) {
    return (
      <div className="container-height grid place-items-center">
        <Spinner color="secondary" size="lg" />
      </div>
    );
  }

  return (
    <div className="container-height">
      <div className="pt-16">
        <Title titleOverrite={<TitleContent name={params.name} />} />
      </div>
      <div className="w-full max-w-[1200px] mx-auto mt-2 flex flex-col lg:flex-row justify-center items-center lg:items-start">
        <div className="w-1/3">
          <div className="mx-auto w-0 lg:w-fit">
            <Image
              alt="avatar"
              src={uuidToSkin(data.uuid)}
              width={128}
              height={512}
            />
          </div>
        </div>
        <div className="w-2/3 ml-0 mt-8 lg:ml-3 lg:mt-0 lg:w-1/3">
          <div>
            <CompletionTable simplify completions={data.completions} />
          </div>
        </div>
      </div>
    </div>
  );
}
