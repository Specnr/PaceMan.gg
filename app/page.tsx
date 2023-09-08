"use client"
import { useState } from "react";
import Link from "@/components/Link";
import PaceEntry from "@/components/PaceEntry";
import TableHeader from "@/components/TableHeader";
import Pace from "@/components/interfaces/Pace";
import useSWR from "swr";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { data, error, isLoading } = useSWR("/api/get-runs", fetcher, { refreshWhenHidden: true, refreshInterval: 1000 });

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <div className="pt-8">
        <h1 className="px-4 text-5xl md:text-7xl font-semibold">MCSR PaceMan</h1>
        <p className="pt-4 invisible md:visible">
          The best real-time Minecraft Speedrunning pace
        </p>
      </div>
      <div className="half-height overflow-y-auto w-full md:w-6/12">
        {
          data.length === 0 ? <div>No one is currently on pace...</div> : (
            <table className="relative text-lg text-left text-gray-400 justify-between w-full half-height">
              <thead className="sticky top-0 text-sm uppercase bg-gray-700 text-gray-400">
                <tr>
                  <TableHeader colSpan={2}>Player</TableHeader>
                  <TableHeader>Split</TableHeader>
                  <TableHeader>Time</TableHeader>
                </tr>
              </thead>
              <tbody>
                {data.map((pace: Pace, idx: number) => (
                  <PaceEntry
                    key={idx}
                    nickname={pace.nickname}
                    uuid={pace.uuid}
                    time={pace.time}
                    splitName={pace.splitName}
                    twitch={pace.twitch}
                    isLast={idx === (data.length - 1)}
                  />
                ))}
              </tbody>
            </table>
          )
        }
      </div>
      <Footer>
        <>
          <div className="mb-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 border border-purple-700 rounded"
              onClick={() => setShowAuthModal(true)}>
              Generate Access Token
            </button>
          </div>
          <p>Follow <Link link="https://docs.google.com/document/d/1RgHUJhLvnUp0KtnCcdJEHCi6rn7naUqWwfe-0ntTAlo">this tutorial</Link> for your runs to show up here</p>
        </>
      </Footer>
      
      {
        showAuthModal && (
          <Modal onClose={() => setShowAuthModal(false)} />
        )
      }
    </>
  );
};