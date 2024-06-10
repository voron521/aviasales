import './task-list.css';
import Task from './Task';

function TaskList(props) {
  const { onDeleted, taskInfo, toogleDone, editingLabelTask, min, sec } = props;

  const tasksArr = taskInfo.map((task) => (
    <Task
      Task={task}
      key={task.key}
      onDeleted={onDeleted}
      toogleDone={toogleDone}
      editingLabelTask={editingLabelTask}
      min={min}
      sec={sec}
    />
  ));

  return <ul className="todo-list">{tasksArr}</ul>;
}

export default TaskList;
