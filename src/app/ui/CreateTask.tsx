"use client";
import React, { FC } from 'react';
import { TaskProps } from '../(Home)/page';

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
          required />
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
  );
};

export default CreateTask
