import './FiltersTickets.scss';

import { useSelector, useDispatch } from 'react-redux';

import { changeFilter } from '../../store/AviaSalesSlice';
import LoaderAllTickets from '../loaderAllTickets';

function FilterTickets() {
  const dispatch = useDispatch();
  const allTicketsLoad = useSelector((state) => state.tickets.allTicketsLoad);

  const ticketsFilters = useSelector((state) => state.tickets.filterTicket);
  const checkFilter = (id) => {
    dispatch(changeFilter(id));
  };

  return (
    <>
      <form className="from_checkbox">
        Количество пересадок
        <input
          className="checkbox_inp"
          type="checkbox"
          id="all"
          onChange={(event) => checkFilter(event.target.id)}
          checked={ticketsFilters.all}
        />
        <label className="label_form" htmlFor="all">
          Все
        </label>
        <input
          className="checkbox_inp"
          type="checkbox"
          id="no"
          onChange={(event) => checkFilter(event.target.id)}
          checked={ticketsFilters.no}
        />
        <label className="label_form" htmlFor="no">
          Без пересадок
        </label>
        <input
          className="checkbox_inp"
          type="checkbox"
          id="one"
          onChange={(event) => checkFilter(event.target.id)}
          checked={ticketsFilters.one}
        />
        <label className="label_form" htmlFor="one">
          1 пересадка
        </label>
        <input
          className="checkbox_inp"
          type="checkbox"
          id="two"
          onChange={(event) => checkFilter(event.target.id)}
          checked={ticketsFilters.two}
        />
        <label className="label_form" htmlFor="two">
          2 пересадки
        </label>
        <input
          className="checkbox_inp"
          type="checkbox"
          id="three"
          onChange={(event) => checkFilter(event.target.id)}
          checked={ticketsFilters.three}
        />
        <label className="label_form" htmlFor="three">
          3 пересадки
        </label>
      </form>
      {!allTicketsLoad ? <LoaderAllTickets /> : null}
    </>
  );
}

export default FilterTickets;
