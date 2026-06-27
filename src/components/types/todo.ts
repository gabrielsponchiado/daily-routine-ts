export type Todo = {
  id: number;
  title: string;     
  done: boolean;     
};

export type FilterType = "all" | "completed" | "uncompleted";