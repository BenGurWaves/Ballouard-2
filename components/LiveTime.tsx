"use client";

import { useState, useEffect } from "react";

export default function LiveTime() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const currentHour = hours % 12 || 12;

  const formatNumber = (num: number, isCurrent: boolean) => {
    if (isCurrent) return num.toString().padStart(2, "0");
    // Upside down representation using Unicode characters
    const upsideMap: Record<string, string> = {
      "0": "0",
      "1": "⇂",
      "2": "ᔭ",
      "3": "Ɛ",
      "4": "h",
      "5": "S",
      "6": "9",
      "7": "L",
      "8": "8",
      "9": "6",
    };
    return num
      .toString()
      .padStart(2, "0")
      .split("")
      .map((c) => upsideMap[c] || c)
      .join("");
  };

  return (
    <div className="fixed bottom-8 left-[15vw] z-50 mix-blend-difference">
      <div className="technical text-paper flex items-baseline gap-2">
        <span className="text-pencil">LOCAL TIME</span>
        <span className="font-mono text-lg">
          {formatNumber(currentHour, true)}
          <span className="text-pencil mx-1">:</span>
          {minutes.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
