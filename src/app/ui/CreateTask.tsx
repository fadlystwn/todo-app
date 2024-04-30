"use client";
import React, { FC } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { TaskProps } from '@/types/Task';
import TodoDatePicker from './TodoDatePicker/TodoDatePicker';

const CreateTask: FC<TaskProps> = ({
  closeTask, handleSubmit,
  handleDateChange,
  handleTitleChange,
  selectedDate,
  submitLabel,
  taskTitle }) => {
  return (
    <div data-testid="form-task" className="flex flex-col justify-end">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Task Title</label>
        <input
          type="text"
          id="title"
          data-testid="title"
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-emerald-500 "
          value={taskTitle}
          onChange={handleTitleChange}
          required />
      </div>
      <div className="mb-4">
        <TodoDatePicker
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          role="button"
          aria-label="Cancel"
          onClick={() => closeTask()}
          type="button"
          className="border-2 border-gray-500 hover:bg-gray-700 text-gray-500 font-bold py-2 px-4 rounded focus:outline-emerald-500  focus:shadow-outline"
        >
          Cancel
        </button>

        <button
          role="submit"
          aria-label="Submit Task"
          onClick={() => handleSubmit()}
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-emerald-900  focus:shadow-outline"
        >
          {submitLabel}
        </button>

      </div>
    </div>
  );
};

export default CreateTask
