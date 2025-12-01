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

export type Terminal = {
  id: string;
  name: string;
};
