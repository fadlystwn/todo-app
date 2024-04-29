"use client"
import React, { useState, useEffect } from 'react'
import CompletedTask from '../ui/CompletedTask';
import TaskList from '../ui/TaskList';
import CreateTask from '../ui/CreateTask';
import useStore from '@/stores/todo-stores';
import CreateButton from '../ui/CreateButton';
import NoTaskUI from '../ui/NoTaskUI';


const TodoApp = () => {
  const [isTaskVisible, setIsTaskVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const { tasks, addTask, editTask, removeTask, markAsCompleted } = useStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isNewTask, setIsNewTask] = useState(false);

  const handleCreateTask = () => {
    if (isNewTask) {
      addTask({
        id: tasks.length + 1,
        title: taskTitle,
        dueDate: selectedDate?.toDateString() || "",
        completed: false,
      })
    }
  }

  const handleTaskSubmission = () => {
    handleCreateTask()
    setIsTaskVisible(false)
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleEditTask = (id: number) => {
    setIsTaskVisible(true);
    setTaskTitle(tasks.find(task => task.id === id)?.title || "");
    setSelectedDate(new Date(tasks.find(task => task.id === id)?.dueDate || ""));
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  }

  const handleClose = () => {
    setIsTaskVisible(false);
    setTaskTitle("")
  }

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
                handleTitleChange={(e) => handleTitleChange(e)}
                closeTask={() => handleClose()}
                handleSubmit={handleTaskSubmission}
                handleDateChange={(date: any) => handleDateChange(date)}
                selectedDate={selectedDate}
                taskTitle={taskTitle}
              />
            )
          }
          {!isTaskVisible && <CreateButton onShow={() => setIsTaskVisible(true)} />}
        </div>
        <div data-testid="all-task">
          {tasks.length > 0 ? (
            <TaskList handleEditTask={(id: number) => handleEditTask(id)} />
          ) : <NoTaskUI />}
        </div>
        <CompletedTask />
      </div>
    </div>
  )
}
export default TodoApp