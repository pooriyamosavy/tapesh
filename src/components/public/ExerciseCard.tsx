import { Exercise } from "@/@types/routes";
import { persianizeNumber } from "@/lib/lang";
import { toPersianDuration } from "@/lib/time";
import { Check, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  exercise: Exercise;
};

export default function ExerciseCard({ exercise }: Props) {
  const { image, levels, nameFa, id } = exercise;
  return (
    <Link href={`/exercise/${id}`} className="block">
      <div className="flex justify-between border-b border-b-[#EBEBEB] py-2 px-2 last:border-b-0 cursor-pointer">
        <div className="flex gap-2">
          <Image
            src={image}
            alt=""
            width={62}
            height={62}
            className="rounded-[8px] size-16 object-cover"
          />
          <div className="flex flex-col justify-between py-2 font-medium">
            <h3>{nameFa}</h3>
            <div className="flex gap-2">
              {levels.sets > 1 && <h3>{persianizeNumber(levels.sets)} ست</h3>}

              {levels.reps > 0 &&
                !(levels.reps === 1 && levels.duration > 0) && (
                  <h3>{persianizeNumber(levels.reps)} تایی</h3>
                )}

              {levels.duration > 0 && (
                <h3>{toPersianDuration(levels.duration)}</h3>
              )}

              {levels.sets === 1 && levels.duration === 0 && (
                <h3>{persianizeNumber(levels.sets)} ست</h3>
              )}
              {levels.hint && <h3>{levels.hint}</h3>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="size-[24px] bg-[#F77CA3] rounded-full flex items-center justify-center">
            <Check color="white" size={16} />
          </button>
          <button>
            <ChevronLeft color="#00A9FF" />
          </button>
        </div>
      </div>
    </Link>
  );
}

ExerciseCard.skeleton = () => {
  return (
    <div className="flex justify-between border-b border-b-[#EBEBEB] last:border-b-0 py-2 px-2 animate-pulse">
      <div className="flex gap-2">
        <div className="w-16 h-16 bg-gray-200 rounded-[8px]" />
        <div className="flex flex-col justify-between py-2 font-medium flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="flex gap-2">
            <div className="h-3 bg-gray-200 rounded w-10" />
            <div className="h-3 bg-gray-200 rounded w-12" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};
