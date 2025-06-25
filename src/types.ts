export interface Stressor {
  id: string;
  title: string;
  description: string;
  severity: 0 | 1 | 5 | 25;
}

export type View = "main" | "configure" | "about";