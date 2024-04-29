"use client"
import React, { FC, useState } from 'react'
import { Icon } from '@iconify-icon/react';

type TaskProps = {
  closeTask: () => void;
  handleSubmit: () => void;

}
type TaskComponentProps = {
  tasks: {
    id: number,
    title: string,
    dueDate: string,
    completed: boolean
  }[]

}

const CompletedTask = () => {
  return (
    <div data-testid="completed-task">
      <h2 className="text-xl font-semibold mb-4 ">Completed Task</h2>
      <ul>
        <li className='my-3 p-3 bg-slate-100 rounded hover:bg-slate-200'>
          <div className="flex justify-between">
            <div>
              <p>
                Task 01
              </p>
              <p className="text-xs text-gray-500">Completed: April 30, 2024</p> {/* Adjust the completion date as needed */}
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
const TaskComponent: FC<TaskComponentProps> = ({ tasks }) => {
  return (
    <ul>
      {
        tasks.map((task: any) => (

          <li data-testid="task" key={task.id} className='my-3 p-3 bg-emerald-100 rounded hover:bg-emerald-200'>
            <div className="flex justify-between">
              <div>
                <p>
                  {task.title}
                </p>
                <p className="text-xs text-gray-500">{task.dueDate}</p>
              </div>
              <div className="flex gap-2">

                <button>
                  <Icon icon="tabler:edit" className="text-2xl" />
                </button>
                <button >
                  <Icon icon="tabler:circle-check" className="text-2xl " />
                </button>
              </div>
            </div>
          </li>

        ))
      }

    </ul>
  )
}

const NoTaskUI = () => {
  return (
    <div className="flex justify-center items-center h-full border-dotted border-2 p-8 my-4">
      <p className="text-gray-500 text-lg">No tasks to display</p>
    </div>
  );
};

const CreateTask: FC<TaskProps> = ({ closeTask, handleSubmit }) => {

  return (
    <div data-testid="form-task" className="flex flex-col justify-end">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Create Task</label>
        <input
          type="text"
          id="title"
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          // value={title}
          // onChange={handleTitleChange}
          required
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => closeTask()}
          type="button"
          className="border-2 border-gray-500 hover:bg-gray-700 text-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Cancel
        </button>
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Task
        </button>
      </div>
    </div>
  )
}

const TodoApp = () => {
  const [showTask, setShowTask] = useState(false);
  const [tasks, setTasks] = useState<{ id: number; title: string; dueDate: string; completed: boolean; }[]>([]);

  const handleCreateTask = () => {
    setTasks([...tasks, {
      id: tasks.length + 1,
      title: "Task 01",
      dueDate: "April 30, 2024",
      completed: false
    }]);
  }

  const handleSubmit = () => {
    handleCreateTask()
    setShowTask(false)
  }
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-4 md:p-8 rounded shadow-md w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold mb-4 text-center">Your Task</h1>
          {
            showTask && <CreateTask closeTask={() => setShowTask(false)} handleSubmit={handleSubmit} />
          }
          {
            !showTask && (
              <button
                onClick={() => setShowTask(!showTask)}
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