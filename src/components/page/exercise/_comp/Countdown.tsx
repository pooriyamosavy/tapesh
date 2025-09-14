"use client";

import { persianizeNumber } from "@/lib/lang";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type CountdownProps = {
  seconds?: number;
  onFinish: () => void;
  mode?: "perSecond" | "fullTime";
  size?: "normal" | "small";
  showPause?: boolean;
  timeFormat?: "number" | "mm:ss";
};

export default function Countdown({
  seconds = 3,
  onFinish,
  mode = "perSecond",
  size = "normal",
  showPause = false,
  timeFormat = "number",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [progress, setProgress] = useState(1);
  const [paused, setPaused] = useState(false);

  const startRef = useRef<number | null>(null);
  const pauseRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const dimension = size === "normal" ? 160 : 88;
  const radius = size === "normal" ? 70 : 38;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    mode === "fullTime" ? circumference * progress : circumference;

  useEffect(() => {
    if (paused) return;

    if (mode === "fullTime") {
      const tick = (now: number) => {
        if (!startRef.current) startRef.current = now;
        if (pauseRef.current) {
          startRef.current += now - pauseRef.current;
          pauseRef.current = null;
        }
        const elapsed = (now - startRef.current) / 1000;
        const remaining = Math.max(seconds - elapsed, 0);
        setTimeLeft(Math.ceil(remaining));
        setProgress(Math.max(1 - elapsed / seconds, 0));
        if (remaining <= 0) {
          onFinish();
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    } else {
      setTimeLeft(seconds);
      setProgress(1);
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            onFinish();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [seconds, mode, onFinish, paused]);

  if (timeLeft <= 0) return null;

  const togglePause = () => {
    if (paused) {
      setPaused(false);
    } else {
      setPaused(true);
      if (mode === "fullTime") {
        pauseRef.current = performance.now();
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }
  };

  const formatDisplay = () => {
    if (timeFormat === "mm:ss") {
      const m = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0");
      const s = (timeLeft % 60).toString().padStart(2, "0");
      return `${persianizeNumber(m)}:${persianizeNumber(s)}`;
    }
    return persianizeNumber(timeLeft);
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: dimension, height: dimension }}
    >
      <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          fill="#F9DCE5"
          opacity={0.3}
        />
        <circle
          key={mode === "perSecond" ? timeLeft : undefined}
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#F77CA3"
          strokeWidth={strokeWidth}
          fill="#F9DCE5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={
            mode === "perSecond" ? "animate-countdown" : "transition-none"
          }
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className={`font-bold text-black ${
            size === "small" ? "text-[16px]" : "text-[24px]"
          }`}
        >
          {formatDisplay()}
        </span>
        {showPause && (
          <button className="cursor-pointer mt-2" onClick={togglePause}>
            {paused ? (
              <Play fill="#F77CA3" stroke="#F77CA3" />
            ) : (
              <Pause fill="#F77CA3" stroke="#F77CA3" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
