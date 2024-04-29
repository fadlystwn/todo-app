"use client";
import { FC } from 'react';
import { Icon } from '@iconify-icon/react';
import { Task } from '@/types/Task'
import useStore from '@/stores/todo-stores';

type TaskListProps = {
  handleEditTask: (id: number) => void;
};

const TaskList: FC<TaskListProps> = ({ handleEditTask }) => {
  const { tasks, markAsCompleted, removeTask } = useStore();
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
              <button onClick={() => handleEditTask(task.id)}>
                <Icon icon="tabler:edit" className="text-2xl" />
              </button>
              <button onClick={() => markAsCompleted(task.id)}>
                <Icon icon="tabler:circle-check" className="text-2xl " />
              </button>
              <button onClick={() => removeTask(task.id)}>
                <Icon icon="tabler:trash" className="text-2xl " />
              </button>
            </div>
          </div>
        </li>

      ))}

    </ul>
  );
};

export default TaskList;