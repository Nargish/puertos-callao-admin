"use client";

import { useEffect, useState } from "react";
import { getLanesForTerminal } from "@/lib/queries";
import LaneCard from "@/components/LaneCard";

type LaneState = {
  occupancy: number;
  updated_at?: string | null;
};

type Lane = {
  id: string;
  name: string;
  capacity: number;
  state: LaneState | null;
};

type Props = {
  terminalName: string;
  slug: string;
};

const TERMINAL_CODES: Record<string, string> = {
  "Manco Cápac": "APM-MANCO",
  "Guadalupe": "APM-GUADALUPE",
  "DPW": "DPW-CALLAO",
  "Atalaya": "ATALAYA-APM-DPW",
};


export default function TerminalSection({ terminalName }: Props) {
  const [lanes, setLanes] = useState<Lane[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const terminalCode = TERMINAL_CODES[terminalName];
      if (!terminalCode) return;

      const { data: lanesData } = await getLanesForTerminal(terminalCode);
      setLanes(lanesData ?? []);
    };

    loadData();
    const interval = setInterval(loadData, 1500);
    return () => clearInterval(interval);
  }, [terminalName]);

  return (
    <section className="border bg-white p-3 rounded-lg h-[94%] overflow-hidden flex flex-col">
      <div className="bg-white shadow-lg p-8 rounded-2xl border border-gray-200 h-full flex flex-col">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-700 tracking-wide">
          {terminalName}
        </h2>

        {/* 🔥 Scroll solo interno */}
        <div className="flex-1 overflow-y-auto overscroll-contain pr-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {lanes.map((lane) => (
              <LaneCard key={lane.id} lane={lane} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
