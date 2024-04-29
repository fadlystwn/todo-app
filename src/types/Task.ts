export interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;

};

export interface TaskProps {
  closeTask: () => void;
  handleSubmit: () => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  taskTitle: string;
  handleDateChange: (date: any) => void;
  selectedDate: Date | null;
}