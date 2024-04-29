"use client";
import React, { FC } from 'react';
import { Icon } from '@iconify-icon/react';
import { Task } from '@/types/Task'

type TaskListProps = {
  tasks: Task[]

}
const TaskList: FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task: Task) => (

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
              <button>
                <Icon icon="tabler:circle-check" className="text-2xl " />
              </button>
            </div>
          </div>
        </li>

      ))}

    </ul>
  );
};

export default TaskList;