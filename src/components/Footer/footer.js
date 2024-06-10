import './footer.css';
import Filter from './Filter';

function Footer(props) {
  const { changeViewTask, onDeleted, taskState, todoCount } = props;

  const buttonIsActive = (key) => {
    changeViewTask(key);
  };

  const deleteComplete = () => {
    onDeleted('deleteComplete');
  };

  const filters = taskState.map((filterItem) => (
    <Filter key={filterItem.key} filter={filterItem} buttonIsActive={buttonIsActive} />
  ));

  const countTodo = todoCount;

  return (
    <footer className="footer">
      <span className="todo-count">{countTodo} items left</span>
      <ul className="filters">{filters}</ul>
      <button type="button" className="clear-completed" onClick={deleteComplete}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
