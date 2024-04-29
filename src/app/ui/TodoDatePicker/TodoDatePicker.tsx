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
    <DatePicker
      selected={selectedDate}
      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      onChange={handleDateChange}
      minDate={new Date()}
      {...props}
    />
  )
}

export default TodoDatePicker;