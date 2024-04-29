import { create } from "zustand";
import { Task } from "@/types/Task";

interface State {
  tasks: Task[];
  addTask: (todo: Task) => void;
  removeTask: (id: number) => void;
  markAsCompleted: (id: number) => void;
  editTask: (id: number) => void;
}

const useStore = create<State>((set) => ({
  tasks: [],

  addTask: (todo: Task) =>
    set((state) => ({
      tasks: [...state.tasks, todo]
    })),

  editTask: (todo: Task) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === todo.id ? todo : task
      )
    })),

  removeTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    })),

  markAsCompleted: (id: number) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    })),
}));

export default useStore;
