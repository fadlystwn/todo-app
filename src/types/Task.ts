export interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;

};

export interface TaskProps {
  closeTask: () => void;
  handleSubmit: () => void;
  handleDateChange: (date: any) => void;
  selectedDate: Date | null;
}