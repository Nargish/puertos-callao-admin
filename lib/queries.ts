import { supabase } from "./supabase";

export type LaneState = {
  occupancy: number;
  updated_at: string | null;
};

export type Lane = {
  id: string;
  name: string;
  capacity: number;
  state: LaneState | null;
};

export async function getTerminalByName(name: string) {
  return supabase
    .from("terminals")
    .select("*")
    .eq("name", name)
    .single();
}

export async function getLanesForTerminal(terminalCode: string) {
  const { data, error } = await supabase
    .from("v_lanes")
    .select("id, idx, capacity, occupancy, updated_at, terminal_code")
    .eq("terminal_code", terminalCode)
    .order("idx");

  if (error || !data) {
    console.error("Error loading lanes:", error);
    return { data: [] };
  }

  const isAtalaya = terminalCode === "ATALAYA-APM-DPW";

  function getAtalayaLabel(idx: number) {
    if (idx === 1) return "DPW";
    if (idx === 2) return "APM";
    if (idx === 3) return "Libre";
    return `C. ${idx}`;
  }

  const lanes: Lane[] = data.map((row) => ({
    id: row.id,

    // 🔥 Cambia el nombre solo si es Atalaya
    name: isAtalaya ? getAtalayaLabel(row.idx) : `C. ${row.idx}`,

    capacity: row.capacity,
    state: {
      occupancy: row.occupancy,
      updated_at: row.updated_at,
    },
  }));

  return { data: lanes };
}


export async function incLane(id: string) {
  return supabase.rpc("inc_lane_if_not_full", { p_lane_id: id });
}

export async function decLane(id: string) {
  return supabase.rpc("dec_lane_if_not_empty", { p_lane_id: id });
}

export async function resetLane(id: string) {
  return supabase.rpc("reset_lane", { p_lane_id: id });
}
