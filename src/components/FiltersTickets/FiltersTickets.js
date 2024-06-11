import './FiltersTickets.scss';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeFilter, allTicketsLoad } from '../../store/AviaSalesSlice';
import LoaderAllTickets from '../loaderAllTickets';

function FilterTickets() {
  const dispatch = useDispatch();
  const allTicketsLoad = useSelector((state) => state.tickets.allTicketsLoad);

  const ticketsFilters = useSelector((state) => state.tickets.filterTicket);
  // console.log("ticketsFilters внутри компонента филтры", ticketsFilters)
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
        <label className="label_form" for="all">
          Все
        </label>
        <input
          className="checkbox_inp"
          type="checkbox"
          id="no"
          onChange={(event) => checkFilter(event.target.id)}
          checked={ticketsFilters.no}
        />
        <label className="label_form" for="no">
          Без пересадок
        </label>
        <input
          className="checkbox_inp"
          type="checkbox"
          id="one"
          onChange={(event) => checkFilter(event.target.id)}
          checked={ticketsFilters.one}
        />
        <label className="label_form" for="one">
          1 пересадка
        </label>
        <input
          className="checkbox_inp"
          type="checkbox"
          id="two"
          onChange={(event) => checkFilter(event.target.id)}
          checked={ticketsFilters.two}
        />
        <label className="label_form" for="two">
          2 пересадки
        </label>
        <input
          className="checkbox_inp"
          type="checkbox"
          id="three"
          onChange={(event) => checkFilter(event.target.id)}
          checked={ticketsFilters.three}
        />
        <label className="label_form" for="three">
          3 пересадки
        </label>
      </form>
      {!allTicketsLoad ? <LoaderAllTickets /> : null}
    </>
  );
}

export default FilterTickets;
