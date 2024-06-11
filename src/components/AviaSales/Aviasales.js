import { useEffect, useRef } from 'react';
import './aviasales.scss';
import { useDispatch } from 'react-redux';

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

import Mainlogo from './Logo.png';

function Aviasales() {
  const dispatch = useDispatch();

  const searchIdRef = useRef(null);

  useEffect(() => {
    const numberFetch = 10;

    function getTickets(numbersFetch) {
      const currentSearchId = searchIdRef.current;

      dispatch(fetchTickets(currentSearchId))
        .unwrap()
        .then((result) => {
          if (currentSearchId === null) {
            dispatch(setTickets(result.tickets.tickets));
          }
          if (!result.tickets.stop) {
            dispatch(setAllTickets(result.tickets.tickets));
          }
          dispatch(addSearchId(result.searchId));
          searchIdRef.current = result.searchId;
          dispatch(loadError(false));
          if (!result.tickets.stop && numbersFetch > 0) {
            getTickets(numbersFetch);
          } else if (result.tickets.stop) {
            dispatch(setAllTicketsLoad());
          }
        })
        .catch((error) => {
          dispatch(loadError(true));
          if (numbersFetch > 0) {
            getTickets(numbersFetch - 1);
          }
        });
    }

    getTickets(numberFetch);
  }, [dispatch]);

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
