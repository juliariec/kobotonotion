export interface Book {
  ContentId: string;
  Title: string;
  Author: string;
}

export interface Highlight {
  Text: string | null;
}

export interface Result {
  title: string;
  status: "uploaded" | "not_found" | "skipped";
}
