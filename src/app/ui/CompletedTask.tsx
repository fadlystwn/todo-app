"use client";
import React, { FC } from 'react';
import { Task } from '@/types/Task';

type TasksProps = {
  tasks: Task[];
}

const CompletedTask: FC<TasksProps> = ({ tasks }) => {

  return (
    <div data-testid="completed-task">
      <h2 className="text-xl font-semibold mb-4 ">Completed Task</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className='my-3 p-3 bg-slate-100 rounded hover:bg-slate-200'>
            <div className="flex justify-between">
              <div>
                <p>{task.title}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTask;
