export type ProjectStatus = "LIVE" | "WIP" | "ARCHIVED";

export type Project = {
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  href?: string;
  role?: string;
  icon?: string;
};

// Real, shipped products.
export const products: Project[] = [
  {
    name: "FitzPoint",
    tagline: "The operating system for online coaches",
    description:
      "A coaching platform that brings programming, nutrition, check-ins, progress tracking and client messaging into one place, so coaches spend their time coaching instead of juggling spreadsheets and chat apps.",
    status: "LIVE",
    role: "Founder",
    href: "https://fitzpoint.com",
    icon: "/projects/fitzpoint-favicon.svg",
    tags: ["Workout Builder", "Meal Planner", "AI Coach", "Check-ins", "Client App", "Coach App"],
  },
];

// PLACEHOLDER entries: replace with your real side projects.
export const hobbies: Project[] = [
  {
    name: "kvlite",
    tagline: "A tiny embedded key-value store",
    description: "An LSM-tree experiment in Go to understand write amplification, compaction and crash recovery by building it.",
    status: "WIP",
    tags: ["golang", "storage"],
  },
  {
    name: "trip-notes",
    tagline: "Offline-first travel journal",
    description: "A small app for logging places, routes and photos while travelling, even without a connection.",
    status: "ARCHIVED",
    tags: ["typescript", "pwa"],
  },
];
