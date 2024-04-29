"use client"
import React, { FC, useState, useEffect } from 'react'
import { Icon } from '@iconify-icon/react';
import CompletedTask from '../ui/CompletedTask';
import TaskList from '../ui/TaskList';
import CreateTask from '../ui/CreateTask';

type CreateButtonProps = {
  onShow: () => void;
}

const NoTaskUI = () => {
  return (
    <div className="flex justify-center items-center h-full border-dotted border-2 p-8 my-4">
      <p className="text-gray-500 text-lg">No tasks to display</p>
    </div>
  );
};

const CreateButton: FC<CreateButtonProps> = ({ onShow }) => {
  return (
    <button
      onClick={onShow}
      className="ml-auto border-2 rounded w-12 h-12 border-slate-800 hover:border-emerald-500  active:border-emerald-300">
      <Icon icon="tabler:plus" className="text-3xl" />
    </button>
  );
}

const TodoApp = () => {
  const [isTaskVisible, setIsTaskVisible] = useState(false);
  const [tasks, setTasks] = useState<{ id: number; title: string; dueDate: string; completed: boolean; }[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleCreateTask = () => {
    setTasks([...tasks, {
      id: tasks.length + 1,
      title: "Task 01",
      dueDate: "April 30, 2024",
      completed: false
    }]);
  }

  const handleTaskSubmission = () => {
    handleCreateTask()
    setIsTaskVisible(false)
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const focusInput = () => {
      const inputElement = document.getElementById("title");
      if (inputElement) {
        inputElement.focus();
      }
    };
    focusInput();
  }, [isTaskVisible]);

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-4 md:p-8 rounded shadow-md w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold mb-4 text-center">Your Task</h1>
          {
            isTaskVisible && (
              <CreateTask
                closeTask={() => setIsTaskVisible(false)}
                handleSubmit={handleTaskSubmission}
                handleDateChange={(date: any) => handleDateChange(date)}
                selectedDate={selectedDate}
              />
            )
          }
          {!isTaskVisible && <CreateButton onShow={() => setIsTaskVisible(true)} />}
        </div>
        <div data-testid="all-task">
          {tasks.length > 0 ? <TaskList tasks={tasks} /> : <NoTaskUI />}
        </div>
        <CompletedTask />
      </div>
    </div>
  )
}
export default TodoApp