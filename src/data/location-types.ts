export type LocationType = "city" | "neighborhood" | "hub" | "zip";

export type Archetype =
  | "new-build"
  | "luxury-view"
  | "historic"
  | "ranch-update"
  | "townhome"
  | "farmhouse"
  | "regional"
  | "valley";

export type LocationInput = {
  slug: string;
  name: string;
  type: LocationType;
  tier: 1 | 2 | 3 | 4 | 5;
  county: "Utah County" | "Salt Lake County";
  /** slug of the parent city for neighborhoods */
  parent?: string;
  zips: string[];
  drive: string;
  /** housing era phrase used in copy */
  era: string;
  archetype: Archetype;
  hook: string;
  housing: string;
  /** service slugs to feature */
  projects: string[];
  notes: string[];
  landmarks: string[];
  nearby: string[];
  /** hub / zip pages: location slugs covered */
  covers?: string[];
};

export type Location = LocationInput & {
  path: string;
  image: string;
};
