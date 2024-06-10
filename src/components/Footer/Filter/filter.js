import './filter.css';

function Filter(props) {
  const {
    filter: { key, className, label },
    buttonIsActive,
  } = props;
  const changeActive = () => {
    buttonIsActive(key);
  };

  return (
    <li>
      <button type="button" key={key} className={className} onClick={changeActive}>
        {label}
      </button>
    </li>
  );
}

export default Filter;
