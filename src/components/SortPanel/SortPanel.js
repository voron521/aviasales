import './SortPanel.scss';

import { useSelector, useDispatch } from 'react-redux';

import { changeSort } from '../../store/AviaSalesSlice';

function SortPanel() {
  const selected = useSelector((state) => state.tickets.sortButton);
  const dispatch = useDispatch();
  const ChangeSortButton = (id) => {
    dispatch(changeSort(id));
  };

  return (
    <div className="choose_price_option">
      <button
        className={`button_price_option button_price_option_left ${selected === 'cheapest' ? 'selected' : ''}`}
        id="cheapest"
        onClick={(event) => ChangeSortButton(event.target.id)}
        type="button"
      >
        Самый дешевый
      </button>
      <button
        className={`button_price_option button_price_option_right ${selected === 'fastest' ? 'selected' : ''}`}
        id="fastest"
        onClick={(event) => ChangeSortButton(event.target.id)}
        type="button"
      >
        Самый быстрый
      </button>
    </div>
  );
}

export default SortPanel;
