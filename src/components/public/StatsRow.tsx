import Image from "next/image";
import React from "react";

type Props = {
  stats: {
    icon: string;
    text: string;
  }[];
};

export default function StatsRow({ stats }: Props) {
  return (
    <div className="flex items-center justify-center gap-[20px] px-2">
      {stats.map(({ icon, text }, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-4"
          >
            <Image src={icon} alt="" width={24} height={24} />
            <h3 className="text-[14px]">{text}</h3>
          </div>
        );
      })}
    </div>
  );
}
