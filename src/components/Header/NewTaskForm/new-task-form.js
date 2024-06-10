import { useState } from 'react';
import './new-task-form.css';

function NewTaskForm(props) {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const { addItem } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    const min = minutes === '' ? 0 : minutes;
    const sec = seconds === '' ? 0 : seconds;

    addItem(label, min, sec);
    setLabel('');
    setMinutes('');
    setSeconds('');
  };

  const onLableChange = (event) => {
    setLabel(event.target.value);
  };

  const minInput = (event) => {
    const enteredValue = parseInt(event.target.value, 10);
    if (typeof enteredValue !== 'number') {
      // eslint-disable-next-line no-alert
      alert('в поля минуты и секунды вводите числа');
    } else if (enteredValue) {
      setMinutes(enteredValue);
    } else {
      setMinutes(0);
    }
  };

  const secInput = (event) => {
    const enteredValue = parseInt(event.target.value, 10);
    if (typeof enteredValue !== 'number') {
      // eslint-disable-next-line no-alert
      alert('в поля минуты и секунды вводите числа');
    } else if (enteredValue < 60) {
      setSeconds(enteredValue);
    } else {
      setSeconds(0);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit(event);
    }
  };
  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        className="new-todo"
        placeholder="Task?"
        onChange={onLableChange}
        value={label}
        onKeyDown={handleKeyDown}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={minInput}
        value={minutes}
        onKeyDown={handleKeyDown}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec(<60)"
        onChange={secInput}
        value={seconds}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}

export default NewTaskForm;
