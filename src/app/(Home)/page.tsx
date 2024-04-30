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
  const { tasks, addTask, updateTask, removeTask, markAsCompleted } = useStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isNewTask, setIsNewTask] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCreateTask = () => {
    addTask({
      id: tasks.length + 1,
      title: taskTitle,
      dueDate: selectedDate?.toDateString() || "",
      completed: false,
    })
  }

  const handleTaskSubmission = () => {
    handleCreateTask()
    setIsTaskVisible(false)
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleOpenNewTask = () => {
    setIsTaskVisible(true)
    setIsNewTask(true)
    if (taskTitle !== "") {
      setTaskTitle("")
    }
  }

  const handleEditTask = (id: number) => {
    setSelectedId(id);
    setIsNewTask(false);
    setIsTaskVisible(true);
    setTaskTitle(tasks.find(task => task.id === id)?.title || "");
    setSelectedDate(new Date(tasks.find(task => task.id === id)?.dueDate || ""));
  }

  const handleSaveEditTask = () => {
    if (selectedId !== null) {
      updateTask(selectedId, { id: selectedId, title: taskTitle, dueDate: selectedDate?.toDateString() || "", completed: false })
      setIsTaskVisible(false)
    }
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

  const completedTask = tasks.filter(task => task.completed)
  const remainingTask = tasks.filter(task => !task.completed)

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
                handleSubmit={isNewTask ? handleTaskSubmission : handleSaveEditTask}
                handleDateChange={(date: any) => handleDateChange(date)}
                selectedDate={selectedDate}
                taskTitle={taskTitle}
                submitLabel={isNewTask ? "Create Task" : "Save"}
              />
            )
          }
          {!isTaskVisible && <CreateButton onShow={handleOpenNewTask} />}
        </div>
        <div data-testid="all-task">
          {remainingTask.length > 0 ? (
            <TaskList
              tasks={remainingTask}
              handleEditTask={(id: number) => handleEditTask(id)}
            />
          ) : <NoTaskUI />}
        </div>
        {completedTask && <CompletedTask tasks={completedTask} />}
      </div>
    </div>
  )
}
export default TodoApp