import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

import {
  addNumberTransfers,
  selectFilteredTickets,
  addTicketsAfterFilter,
  selectSortTickets,
} from '../../store/AviaSalesSlice';
import InfoStartFilter from '../InfoStartFilter';
import Loader from '../loader';
import InfoErrorFetch from '../InfoErrorFetch';

import classes from './Tickets.module.scss';

function Tickets() {
  const dispatch = useDispatch();
  const generateKey = useRef(0);
  const tickets = useSelector((state) => state.tickets.tickets);
  const ticketsFilters = useSelector((state) => state.tickets.filterTicket);
  const ticketsLoad = useSelector((state) => state.tickets.ticketsLoad);
  const loadError = useSelector((state) => state.tickets.loadError);
  const allTicketsLoad = useSelector((state) => state.tickets.allTicketsLoad);
  const allTickets = useSelector((state) => state.tickets.allTickets);

  const ticketsArr = useSelector(selectFilteredTickets);
  const sortedTickets = useSelector(selectSortTickets);

  useEffect(() => {
    dispatch(addTicketsAfterFilter(ticketsArr));
  }, [ticketsArr, dispatch]);

  useEffect(() => {
    if (allTicketsLoad) {
      allTickets.forEach((ticket, index) => {
        const numberOfTransfersThere = ticket.segments[0].stops.length;
        const numberOfTransfersBack = ticket.segments[1].stops.length;

        dispatch(addNumberTransfers({ numberOfTransfersThere, numberOfTransfersBack, index }));
      });
    } else if (ticketsLoad && tickets && tickets.length > 0) {
      tickets.forEach((ticket, index) => {
        const numberOfTransfersThere = ticket.segments[0].stops.length;
        const numberOfTransfersBack = ticket.segments[1].stops.length;
        dispatch(addNumberTransfers({ numberOfTransfersThere, numberOfTransfersBack, index }));
      });
    }
  }, [ticketsLoad, tickets, allTicketsLoad, allTickets, dispatch]);

  let MakeTicketsElem = false;
  if (sortedTickets !== undefined) {
    MakeTicketsElem = sortedTickets.map((ticket, index) => {
      const startTImethere = ticket.segments[0].date;
      const flightTimethere = ticket.segments[0].duration;
      const startTImeback = ticket.segments[1].date;
      const flightTimeback = ticket.segments[1].duration;
      const StartStopTimeThere = makeTime(startTImethere, flightTimethere);
      const StartStopTimeBack = makeTime(startTImeback, flightTimeback);

      const travelHourseThere = parseInt((flightTimethere / 60).toFixed(0), 10);
      const travelMinutesThere = flightTimethere % 60;

      const travelHourseBack = parseInt((flightTimeback / 60).toFixed(0), 10);
      const travelMinutesBack = flightTimeback % 60;

      const travelTimeThere = `${travelHourseThere > 9 ? travelHourseThere : `0${travelHourseThere}`} час ${travelMinutesThere > 9 ? travelMinutesThere : `0${travelMinutesThere}`} мин`;
      const travelTimeBack = `${travelHourseBack > 9 ? travelHourseBack : `0${travelHourseBack}`} час ${travelMinutesBack > 9 ? travelMinutesBack : `0${travelMinutesBack}`} мин`;

      function makeTime(time, flightTime) {
        const date = new Date(time);
        const hoursMinutesStart = date.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        });
        const [hours, minutes] = hoursMinutesStart.split(':');

        let finishHour = parseInt(hours, 10) + parseInt((flightTime / 60).toFixed(0), 10);
        let finishMinutes = parseInt(minutes, 10) + (flightTime % 60);

        if (finishMinutes >= 60) {
          finishMinutes -= 60;
          finishHour += 1;
        }

        if (finishHour >= 24) {
          finishHour -= 24;
        }

        const hoursMinutesEnd = `${finishHour > 9 ? finishHour : `0${finishHour}`}:${finishMinutes > 9 ? finishMinutes : `0${finishMinutes}`}`;
        return `${hoursMinutesStart} - ${hoursMinutesEnd}`;
      }

      // eslint-disable-next-line no-return-assign
      return (
        <div className={classes.ticket} key={(generateKey.current += 1)}>
          <div className={classes.header_part_ticket}>
            <span className={classes.coast_ticket}>{`${ticket.price.toLocaleString('ru-RU')} р`}</span>
            <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="Logo" />
          </div>
          <div className={classes.middle_part_ticket}>
            <div className={`${classes.left_middle_ticket} ${classes.middle_ticket_txt}`}>
              <span
                className={`${classes.span_ticket} ${classes.span_ticket_top}`}
              >{`${ticket.segments[0].origin} - ${ticket.segments[0].destination}`}</span>
              <span className={`${classes.span_ticket} ${classes.span_ticket_bottom}`}>{StartStopTimeThere}</span>
            </div>
            <div className={`${classes.midle_middle_ticket} ${classes.middle_ticket_txt}`}>
              <span className={`${classes.span_ticket} ${classes.span_ticket_top}`}>В пути</span>
              <span className={`${classes.span_ticket} ${classes.span_ticket_bottom}`}>{travelTimeThere}</span>
            </div>
            <div className={`${classes.right_middle_ticket} ${classes.middle_ticket_txt}`}>
              <span className={`${classes.span_ticket} ${classes.span_ticket_top}`}>
                {ticket.segments[0].numberTransWord}
              </span>
              <span className={`${classes.span_ticket} ${classes.span_ticket_bottom}`}>
                {ticket.segments[0].stops.join(',')}
              </span>
            </div>
          </div>
          <div className={classes.bottom_part_ticket}>
            <div className={`${classes.left_middle_ticket} ${classes.middle_ticket_txt}`}>
              <span
                className={`${classes.span_ticket} ${classes.span_ticket_top}`}
              >{`${ticket.segments[1].origin} - ${ticket.segments[1].destination}`}</span>
              <span className={`${classes.span_ticket} ${classes.span_ticket_bottom}`}>{StartStopTimeBack}</span>
            </div>
            <div className={`${classes.midle_middle_ticket} ${classes.middle_ticket_txt}`}>
              <span className={`${classes.span_ticket} ${classes.span_ticket_top}`}>В пути</span>
              <span className={`${classes['span_ticket span']} ${classes.span_ticket_bottom}`}>{travelTimeBack}</span>
            </div>
            <div className={`${classes.right_middle_ticket} ${classes.middle_ticket_txt}`}>
              <span className={`${classes.span_ticket} ${classes.span_ticket_top}`}>
                {ticket.segments[1].numberTransWord}
              </span>
              <span className={`${classes.span_ticket} ${classes.span_ticket_bottom}`}>
                {ticket.segments[1].stops.join(',')}
              </span>
            </div>
          </div>
        </div>
      );
    });
  }

  if (ticketsFilters.allFilterFalse) {
    return <InfoStartFilter />;
  }

  if (!ticketsLoad) {
    if (loadError) {
      return (
        <>
          <InfoErrorFetch />
          <Loader />
        </>
      );
    }

    if (loadError) {
      return (
        <>
          <InfoErrorFetch />
          <Loader />
        </>
      );
    }
    return <Loader />;
  }

  const resultArrToRender = MakeTicketsElem.slice(0, 6);

  return <>{MakeTicketsElem ? resultArrToRender : 'загрузка'}</>;
}

export default Tickets;
