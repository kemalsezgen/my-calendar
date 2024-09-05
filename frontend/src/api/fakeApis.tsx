// interfaces
interface Todo {
  id: number;
  title: string;
  description: string;
  subtasks: Subtask[];
  completed: "Not Started" | "In Progress" | "Completed";
  startDate: string;
  endDate: string;
}

interface Subtask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface SpecialDay {
  id: number;
  date: string;
  title: string;
}

interface Note {
  id: number;
  title: string;
  description: string;
  date: string;
}

export interface IDayDetail {
  id: number;
  date: string;
  day: string;
  tasks: Todo[];
  specialDays: SpecialDay[];
  notes: Note[];
}

const formatDate = (date: string): string => {
  const [day, month, year] = date.split(".");
  return `${day}.${month}.${year}`;
};

const getTodos = async (date: string): Promise<Todo[]> => {
  const todos: Todo[] = [
    {
      id: 1,
      title: "Todo 1",
      description: "Description 1",
      subtasks: [
        {
          id: 1,
          title: "Subtask 1",
          description: "Description 1",
          completed: false,
        },
        {
          id: 2,
          title: "Subtask 2",
          description: "Description 2",
          completed: false,
        },
      ],
      completed: "Not Started",
      startDate: "01.09.2024",
      endDate: "03.09.2024",
    },
    {
      id: 2,
      title: "Todo 2",
      description: "Description 2",
      subtasks: [
        {
          id: 1,
          title: "Subtask 1",
          description: "Description 1",
          completed: false,
        },
        {
          id: 2,
          title: "Subtask 2",
          description: "Description 2",
          completed: false,
        },
      ],
      completed: "In Progress",
      startDate: "01.09.2024",
      endDate: "03.09.2024",
    },
    {
      id: 3,
      title: "Todo 3",
      description: "Description 3",
      subtasks: [
        {
          id: 1,
          title: "Subtask 1",
          description: "Description 1",
          completed: false,
        },
        {
          id: 2,
          title: "Subtask 2",
          description: "Description 2",
          completed: false,
        },
      ],
      completed: "Completed",
      startDate: "01.09.2024",
      endDate: "03.09.2024",
    },
  ];

  const targetDate = new Date(date).toLocaleDateString().split(" ")[0];

  return todos.filter(todo => {
    const startDate = formatDate(todo.startDate);
    const endDate = formatDate(todo.endDate);
    return targetDate >= startDate && targetDate <= endDate;
  });
};

const getSpecialDays = async (date: string): Promise<SpecialDay[]> => {
  const specialDays: SpecialDay[] = [
    {
      id: 1,
      date: "01.09.2024",
      title: "Special Day 1",
    },
    {
      id: 2,
      date: "02.09.2024",
      title: "Special Day 2",
    },
  ];

  const targetDate = new Date(date).toLocaleString().split(" ")[0];
  console.log("targetDate:", targetDate);

  return specialDays.filter(specialDay => {
    const specialDayDate = formatDate(specialDay.date);
    console.log("specialDayDate:", specialDayDate);
    return targetDate === specialDayDate;
  });
};

const getNotes = async (date: string): Promise<Note[]> => {
  const notes: Note[] = [
    {
      id: 1,
      title: "Note 1",
      description: "Description 1",
      date: "01.09.2024",
    },
    {
      id: 2,
      title: "Note 2",
      description: "Description 2",
      date: "02.09.2024",
    },
  ];

  const targetDate = new Date(date).toLocaleString().split(" ")[0];

  return notes.filter(note => {
    const noteDate = formatDate(note.date);
    return targetDate === noteDate;
  });
};

// getDayDetail method
export const getDayDetail = async (date: string): Promise<IDayDetail> => {

  const getDay = (date: string): string => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  }

  return {
    // generate a random number between 1 and 1000
    id: Math.floor(Math.random() * 1000) + 1,
    date: date,
    day: getDay(date),
    tasks: await getTodos(date),
    specialDays: await getSpecialDays(date),
    notes: await getNotes(date),
  };
}