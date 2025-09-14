import Image from "next/image";
import React from "react";

const footBarList = [
  {
    icon: "/icons/user.png",
  },
  {
    icon: "/icons/note.png",
  },
  {
    icon: "/icons/weight.png",
  },
  {
    icon: "/icons/question.png",
  },
  {
    icon: "/icons/shop.png",
  },
];

type Props = {
  floatButton?: {
    title: string;
    onClick: () => void;
  };
  hideFooter?: boolean;
};

export default function Footbar({ floatButton, hideFooter }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-sm">
      {!!floatButton && (
        <div className="p-3">
          <button
            onClick={floatButton.onClick}
            className="w-full bg-[#F77CA3] text-white rounded-lg h-[40px] cursor-pointer"
          >
            {floatButton.title}
          </button>
        </div>
      )}
      {!hideFooter && (
        <div className="h-[70px] bg-white rounded-lg border-t border-t-[#ddd] flex items-center justify-between px-2">
          {footBarList.map(({ icon }, index) => {
            return (
              <button
                key={index}
                className="size-[48px] flex flex-col items-center cursor-pointer"
              >
                <Image src={icon} alt="" width={24} height={24} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
