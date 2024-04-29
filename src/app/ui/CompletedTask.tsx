"use client";
import React from 'react';

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
  );
};

export default CompletedTask;
