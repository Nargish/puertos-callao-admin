import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { laneId } = await req.json();

  const { data, error } = await supabase.rpc("inc_lane_if_not_full", {
    p_lane_id: laneId,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ success: true, data });
}
