import { Subtask } from "./Subtask";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: "Not Started" | "In Progress" | "Completed";
    startDate: string;
    endDate: string;
    subtasks: Subtask[];
}