import React from "react";

type Props = {
  details: {
    key: string;
    value: string;
  }[];
};

export default function DetailCard({ details }: Props) {
  return (
    <div className="flex flex-col">
      {details.map(({ key, value }, index) => {
        return (
          <div
            className="flex flex-col gap-1 p-2 last:pb-0 first:pt-0 last:border-b-0 border-b border-b-[#EBEBEB]"
            key={index}
          >
            <h3 className="font-medium">{key}</h3>
            <h2 className="text-[14px]">{value}</h2>
          </div>
        );
      })}
    </div>
  );
}
