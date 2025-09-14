"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Exercise } from "@/@types/routes";
import ExerciseCard from "@/components/public/ExerciseCard";
import StatsRow from "@/components/public/StatsRow";
import Footbar from "@/components/public/Footbar";

const mainBodyHeader = [
  {
    icon: "/icons/Medium.png",
    text: "سطح متوسط",
  },
  {
    icon: "/icons/timer.png",
    text: "۲۰ از ۴۵ دقیقه",
  },
  {
    icon: "/icons/fire.png",
    text: "۵۰ از ۱۲۰ کالری",
  },
];

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["exercise"],
    queryFn: async () => {
      const response = await fetch("/api/exercise");
      const data = (await response.json()) as { response: Exercise[] };
      return data;
    },
  });
  return (
    <div className="bg-[#FFF3F7] text-black h-screen">
      {/* header */}
      <div className="bg-white h-[56px] flex items-center">
        <h2 className="font-bold ">۱۵۰۰</h2>
        <Image src="/icons/20.png" alt="" width={30} height={41} />
      </div>

      {/* body */}
      <div className="p-4">
        <div className="bg-white rounded-[8px] py-2 shadow-md">
          <StatsRow stats={mainBodyHeader} />

          {isLoading && !data && (
            <div className="flex flex-col mt-[25px]">
              {Array.from({ length: 6 }).map((_, index) => {
                return <ExerciseCard.skeleton key={index} />;
              })}
            </div>
          )}

          {!isLoading && data && (
            <div className="flex flex-col mt-[25px]">
              {data?.response?.map((exercise, index) => {
                return <ExerciseCard key={index} exercise={exercise} />;
              })}
            </div>
          )}
        </div>
      </div>

      {/* footbar */}
      <Footbar
        floatButton={{
          title: "شروع کنید",
          onClick: () => {},
        }}
      />
    </div>
  );
}
