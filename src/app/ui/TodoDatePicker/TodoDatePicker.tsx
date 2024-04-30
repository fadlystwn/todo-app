import { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom.css';

type TodoDatePickerProps = {
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
}

const TodoDatePicker: FC<TodoDatePickerProps> = ({
  selectedDate,
  handleDateChange,
  ...props
}) => {
  return (
    <div>
      <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date</label>
      <DatePicker
        id="dueDate"
        name="due-date"
        selected={selectedDate}
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-emerald-500 focus:shadow-outline"
        onChange={handleDateChange}
        minDate={new Date()}
        {...props}
      />
    </div>
  )
}

export default TodoDatePicker;