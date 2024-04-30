import { create } from "zustand";
import { Task } from "@/types/Task";

interface State {
  tasks: Task[];
  addTask: (todo: Task) => void;
  removeTask: (id: number) => void;
  markAsCompleted: (id: number) => void;
  updateTask: (id: number, todo: Task) => void;
}

const useStore = create<State>((set) => ({
  tasks: [],

  addTask: (todo: Task) =>
    set((state) => ({
      tasks: [...state.tasks, todo]
    })),

  updateTask: (id: number, todo: Task) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...todo } : task
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
