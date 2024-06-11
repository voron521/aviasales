import { useEffect, useRef } from 'react';
import './aviasales.scss';
import { useSelector, useDispatch } from 'react-redux';

import {
  setTickets,
  loadError,
  fetchTickets,
  addSearchId,
  setAllTickets,
  setAllTicketsLoad,
} from '../../store/AviaSalesSlice';
import Tickets from '../Tickets';
import FilterTickets from '../FiltersTickets';
import SortPanel from '../SortPanel';
import Mainlogo from '../AviaSales/Logo.png';

function Aviasales() {
  const dispatch = useDispatch();

  const searchIdRef = useRef(null);

  useEffect(
    () => {
      const numberFetch = 10;

      function getTickets(numberFetch) {
        const currentSearchId = searchIdRef.current;

        dispatch(fetchTickets(currentSearchId))
          .unwrap()
          .then((result) => {
            console.log('вот searchIdFromState внутри где работаю: ', currentSearchId);
            if (currentSearchId === null) {
              dispatch(setTickets(result.tickets.tickets));
            }
            if (!result.tickets.stop) {
              console.log('записываю в массив все билеты т.к result.tickets.stop=', result.tickets.stop);
              dispatch(setAllTickets(result.tickets.tickets));
              // SaveAllTickets(result.tickets.tickets)
            }

            // dispatch(setAllTickets(result.tickets.tickets));
            dispatch(addSearchId(result.searchId));
            searchIdRef.current = result.searchId;
            dispatch(loadError(false));
            console.log('вот stop или не stop', result.tickets.stop);
            if (!result.tickets.stop && numberFetch > 0) {
              console.log('вот какой searchId я передаю', searchIdRef.current);
              getTickets(numberFetch);
            } else if (result.tickets.stop) {
              dispatch(setAllTicketsLoad());
            }
          })
          .catch((error) => {
            console.error('Ошибка при получении билетов:', error);
            dispatch(loadError(true));
            if (numberFetch > 0) {
              getTickets(numberFetch - 1);
            }
          });
      }

      getTickets(numberFetch);
    },
    [] /*[dispatch]*/
  );

  return (
    <section className="aviasales">
      <div className="header">
        <img src={Mainlogo} alt="Main Logo" />
      </div>
      <div className="main-div">
        <div className="left_body">
          <FilterTickets />
        </div>
        <div className="right_body">
          <SortPanel />
          <Tickets />
        </div>
      </div>
    </section>
  );
}

export default Aviasales;
