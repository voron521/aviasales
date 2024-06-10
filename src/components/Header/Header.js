import './Header.css';
import NewTaskForm from './NewTaskForm';

function Header({ addItem }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm addItem={addItem} />
    </header>
  );
}

export default Header;
