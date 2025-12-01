"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

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
  lane: Lane;
};

export default function LaneCard({ lane }: Props) {
  const [loading, setLoading] = useState(false);

  const exec = async (action: "inc" | "dec" | "reset") => {
    setLoading(true);

    // 1) Ocupación actual
    const current = lane.state?.occupancy ?? 0;

    // 2) Calcular siguiente valor
    let nextValue = current;

    if (action === "inc") {
      if (current >= lane.capacity) {
        alert(`⚠️ ${lane.name} ya está en su capacidad máxima (${lane.capacity}).`);
        setLoading(false);
        return;
      }
      nextValue = current + 1;
    } else if (action === "dec") {
      nextValue = Math.max(0, current - 1);
    } else {
      nextValue = 0; // reset
    }

    // 3) UPDATE real a lane_state
    const { error } = await supabase
      .from("lane_state")
      .update({
        occupancy: nextValue,
        updated_at: new Date().toISOString(),
      })
      .eq("lane_id", lane.id)
      .select();

    // 4) Si recién llegó al máximo
    if (!error && nextValue >= lane.capacity) {
      alert(`🔴 ${lane.name} llegó a su capacidad máxima (${lane.capacity}).`);
    }

    setLoading(false);
  };

  const occ = lane.state?.occupancy ?? 0;

  // 👉 NECESARIO para que el botón +1 funcione
  const isFull = occ >= lane.capacity;

  return (
    <div className="flex flex-col items-center border rounded-lg p-3 w-full bg-white text-black">
      <h3 className="text-sm font-bold mb-2">{lane.name}</h3>

      <div className="flex flex-col gap-1.5 mb-2">
        {Array.from({ length: lane.capacity }).map((_, i) => {
          const active = i < occ;
          const full = occ >= lane.capacity;

          let color = "bg-gray-300"; // vacío

          if (full) {
            color = "bg-red-500"; // lleno
          } else if (active) {
            color = "bg-green-500"; // ocupado
          }

          return (
            <div
              key={i}
              className={`w-16 h-3 rounded ${color}`}
            />
          );
        })}
      </div>

      <p className="text-sm mb-2">
        {occ} / {lane.capacity}
      </p>

      <div className="flex gap-1 w-full">
        <button
          disabled={loading || isFull}
          className="flex-1 bg-blue-500 hover:bg-blue-600 rounded p-1 text-xs text-white disabled:bg-gray-400"
          onClick={() => exec("inc")}
        >
          +1
        </button>

        <button
          disabled={loading}
          className="flex-1 bg-red-500 hover:bg-red-600 rounded p-1 text-xs text-white disabled:bg-gray-400"
          onClick={() => exec("dec")}
        >
          -1
        </button>

        <button
          disabled={loading}
          className="flex-1 bg-gray-500 hover:bg-gray-600 rounded p-1 text-xs text-white disabled:bg-gray-400"
          onClick={() => exec("reset")}
        >
          R
        </button>
      </div>
    </div>
  );
}
