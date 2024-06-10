/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useCallback } from 'react';
import './task.css';

function Task(props) {
  const {
    Task: { label, className, key, min, sec, createTime },
    onDeleted,
    toogleDone,
    editingLabelTask,
  } = props;
  const [done, setDone] = useState(false);
  const [editing, setEditing] = useState(false);
  const [labelTask, setLabel] = useState(label);
  const [classNameTask, setClassName] = useState(className);
  const [minTask, setMin] = useState(min);
  const [secTask, setSec] = useState(sec);
  const [timerIdState, setTimerIdState] = useState(null);

  const inputRef = React.createRef();
  const classNames = className;

  useEffect(
    () => () => {
      if (timerIdState !== null) {
        clearInterval(timerIdState);
      }
    },
    [timerIdState]
  );

  const itemDel = () => {
    onDeleted(key);
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setDone(isChecked);
  };
  useEffect(() => {
    setClassName(done ? 'completed' : 'view');
  }, [done]);

  useEffect(() => {
    toogleDone(done, key, classNameTask);
  }, [classNameTask, done, key, toogleDone]);

  const timerFunc = () => {
    setSec((prevSec) => {
      if (prevSec > 0) {
        return prevSec - 1;
      }
      if (minTask > 0) {
        setMin((prevMin) => prevMin - 1);
        return 59;
      }
      return prevSec;
    });
  };

  const startTimer = useCallback(() => {
    if (timerIdState === null) {
      const timerId = setInterval(timerFunc, 1000);
      setTimerIdState(timerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerIdState]);

  useEffect(
    () => () => {
      if (timerIdState !== null) {
        clearInterval(timerIdState);
      }
    },
    [timerIdState]
  );

  // useEffect(() => {
  //   setClassName(done ? 'completed' : 'view');
  // }, [done, timerIdState]);

  const crossOut = (event) => {
    if (!event.target.className.includes('icon')) {
      setDone(!done);
    }
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing, inputRef]);

  const onSubmit = (event) => {
    event.preventDefault();
    editingLabelTask(key, labelTask);
    setEditing(!editing);
  };

  const onLableChange = (event) => {
    setLabel(event.target.value);
  };

  const stopTimer = () => {
    if (timerIdState !== null) {
      clearInterval(timerIdState);
    }
    setTimerIdState(null);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
    <li key={key} className={classNames} onClick={crossOut} role="button" tabIndex={0}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={handleCheckboxChange} />
        <label htmlFor={`checkbox-${key}`}>
          <span className="description">
            {editing ? (
              <form onSubmit={onSubmit}>
                <input
                  ref={inputRef}
                  className="labaelChangeInput"
                  placeholder="What needs to be done?"
                  onChange={onLableChange}
                  value={labelTask}
                />
              </form>
            ) : (
              <span>{label}</span>
            )}
          </span>
          <span className="description">
            <button type="button" className="icon icon-play" onClick={startTimer} aria-label="play" />
            <button type="button" className="icon icon-pause" onClick={stopTimer} aria-label="pause" />
            <span className="time-span">{secTask > 9 ? `${minTask}:${secTask}` : `${minTask}:0${secTask}`}</span>
          </span>
          <span className="created">{createTime}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={toggleEditing} aria-label="Edit" />
        <button type="button" className="icon icon-destroy" onClick={itemDel} aria-label="Delete" />
      </div>
    </li>
  );
}

export default Task;
