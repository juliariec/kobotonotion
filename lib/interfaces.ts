export interface Book {
  ContentID: string;
  Title: string;
  Author: string;
}

export interface Highlight {
  Text: string | null;
}

export interface Result {
  title: string;
  status: "uploaded" | "duplicates" | "skipped";
}
