export type Todo = {
  id: number;
  texto: string;
  concluida: boolean;
};

export type FilterType = "all" | "completed" | "uncompleted";
