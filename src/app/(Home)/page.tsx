"use client"
import React, { useState } from 'react'
import { Icon } from '@iconify-icon/react';
import CompletedTask from '../ui/CompletedTask';
import TaskComponent from '../ui/TaskComponent';
import CreateTask from '../ui/CreateTask';

export type TaskProps = {
  closeTask: () => void;
  handleSubmit: () => void;

}
const NoTaskUI = () => {
  return (
    <div className="flex justify-center items-center h-full border-dotted border-2 p-8 my-4">
      <p className="text-gray-500 text-lg">No tasks to display</p>
    </div>
  );
};

const TodoApp = () => {
  const [isTaskVisible, setIsTaskVisible] = useState(false);
  const [tasks, setTasks] = useState<{ id: number; title: string; dueDate: string; completed: boolean; }[]>([]);

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
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-4 md:p-8 rounded shadow-md w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold mb-4 text-center">Your Task</h1>
          {
            isTaskVisible && <CreateTask closeTask={() => setIsTaskVisible(false)} handleSubmit={handleTaskSubmission} />
          }
          {
            !isTaskVisible && (
              <button
                onClick={() => setIsTaskVisible(!isTaskVisible)}
                className="ml-auto border-2 rounded w-12 h-12 border-slate-800 hover:border-emerald-500  active:border-emerald-300">
                <Icon icon="tabler:plus" className="text-3xl" />
              </button>
            )
          }
        </div>
        <div data-testid="all-task">
          {
            tasks.length > 0 ? (
              <TaskComponent tasks={tasks} />
            ) : (
              <NoTaskUI />
            )
          }

        </div>
        <CompletedTask />
      </div>
    </div>
  )
}
export default TodoApp