"use client";

import DetailCard from "@/components/public/DetailCard";
import Footbar from "@/components/public/Footbar";
import StatsRow from "@/components/public/StatsRow";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Countdown from "./_comp/Countdown";
import { useQuery } from "@tanstack/react-query";
import { Exercise } from "@/@types/routes";
import { notFound, useRouter } from "next/navigation";

type exerciseStates = "overview" | "countdown" | "workout" | "rest";

type Props = {
  id: string;
};

export default function ExercisePage({ id }: Props) {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["exercise", id],
    queryFn: async () => {
      const response = await fetch(`/api/exercise/${id}`);
      const data = (await response.json()) as { response: Exercise };
      return data.response;
    },
  });

  useEffect(() => {
    if (!isLoading && !data) {
      notFound();
    }
  }, [data, isLoading]);

  const [exerciseState, setExerciseState] =
    useState<exerciseStates>("overview");
  const [activeSet, setActiveSet] = useState(0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FFF3F7]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" />
      </div>
    );
  }

  if (!data) return null;

  const { nameFa, goal, targetAreas, image, levels } = data;
  const totalSets = levels.sets;
  const setDuration = levels.duration || levels.reps * 10;
  const restDuration = parseInt(levels.rest, 10) || 20;

  const goNext = () => {
    if (activeSet + 1 < totalSets) {
      setExerciseState("rest");
    } else {
      setExerciseState("overview");
      setActiveSet(0);
    }
  };

  const goPrev = () => {
    if (activeSet > 0) {
      setActiveSet((s) => s - 1);
      setExerciseState("workout");
    }
  };

  return (
    <div className="bg-[#FFF3F7] text-black min-h-screen pb-[100px] flex flex-col">
      <div className="h-[56px] bg-white flex items-center justify-between px-2">
        <button
          className="size-[32px] flex items-center justify-center"
          onClick={router.back}
        >
          <ArrowRight />
        </button>
        <h1 className="font-medium">{nameFa}</h1>
        <div className="size-[32px]" />
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <Image
          src={image}
          alt=""
          width={375}
          height={440}
          className="w-full aspect-[375/440] object-cover"
        />

        {exerciseState === "overview" && (
          <div className="px-4 flex flex-col gap-4">
            <div className="bg-white rounded-[8px] py-2 shadow-md">
              <StatsRow
                stats={[
                  { icon: "/icons/Medium.png", text: "سطح متوسط" },
                  {
                    icon: "/icons/timer.png",
                    text: `${levels.duration} ثانیه`,
                  },
                  { icon: "/icons/fire.png", text: `${levels.sets} ست` },
                ]}
              />
            </div>
            <div className="bg-white rounded-[8px] py-2 shadow-md">
              <DetailCard
                details={[
                  { key: "نام حرکت", value: nameFa },
                  { key: "نواحی درگیر بدن", value: targetAreas.join("، ") },
                  { key: "هدف تمرین", value: goal },
                ]}
              />
            </div>
          </div>
        )}

        {exerciseState === "workout" && (
          <div className="flex flex-col items-center gap-6 px-4">
            <div className="flex flex-row-reverse justify-center gap-2 w-full overflow-x-auto">
              {Array.from({ length: totalSets }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden flex flex-row-reverse">
                    <div
                      className={`h-full rounded-full transition-all ${
                        i < activeSet
                          ? "bg-blue-500 w-full"
                          : i === activeSet
                          ? "bg-blue-500"
                          : "w-0"
                      }`}
                      style={{
                        width: i === activeSet ? `50%` : "100%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between w-full px-2 text-sm">
              <span>{nameFa}</span>
              <span>
                {activeSet + 1} از {totalSets} ست
              </span>
            </div>

            <div className="flex items-center justify-between w-full">
              <button onClick={goNext} className="size-[24px] cursor-pointer">
                <ChevronRight />
              </button>
              <Countdown
                mode="fullTime"
                seconds={setDuration}
                onFinish={goNext}
                showPause
                timeFormat="mm:ss"
                size="small"
              />
              <button
                onClick={goPrev}
                className="size-[24px] cursor-pointer disabled:opacity-30"
                disabled={activeSet === 0}
              >
                <ChevronLeft />
              </button>
            </div>
          </div>
        )}

        {exerciseState === "rest" && (
          <div className="flex flex-col items-center gap-6 px-4">
            <Countdown
              mode="fullTime"
              seconds={restDuration}
              onFinish={() => {
                setActiveSet((s) => s + 1);
                setExerciseState("workout");
              }}
              timeFormat="mm:ss"
              size="small"
            />
            <div className="w-full bg-[#FFE8E6] p-4 rounded-lg text-center font-medium">
              {restDuration} ثانیه استراحت
            </div>
          </div>
        )}

        {exerciseState === "countdown" && (
          <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <Countdown
              seconds={3}
              onFinish={() => setExerciseState("workout")}
            />
          </div>
        )}
      </div>

      <Footbar
        floatButton={{
          title: "شروع کنید",
          onClick: () => {
            setExerciseState("countdown");
          },
        }}
        hideFooter
      />
    </div>
  );
}
