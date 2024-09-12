export interface Subtask {
  id: number;
  title: string;
  description: string;
  status: "Not Started" | "In Progress" | "Completed";
}
