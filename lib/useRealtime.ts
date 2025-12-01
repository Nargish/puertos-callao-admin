"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useLaneRealtime(onUpdate: () => void) {
  useEffect(() => {
    const channel = supabase
      .channel("lane-state-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lane_state", // 🔥 ESCUCHAMOS LA TABLA REAL
        },
        () => {
          onUpdate(); // 🔥 refresca la UI con getLanesForTerminal() (v_lanes)
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onUpdate]);
}
