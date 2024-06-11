import './Tickets.scss';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useRef } from 'react';
import {addNumberTransfers, selectFilteredTickets, addTicketsAfterFilter, selectSortTickets, addNumberTransfersAllTickets, allTickets} from '../../store/AviaSalesSlice'
import InfoStartFilter from '../InfoStartFilter'
import Loader from '../loader'
import InfoErrorFetch from '../InfoErrorFetch'
function Tickets() {
  const dispatch = useDispatch() 
  let generateKey = useRef(0)
  const tickets = useSelector((state) => state.tickets.tickets); 
  const ticketsFilters = useSelector((state) => state.tickets.filterTicket); 
  const ticketsLoad = useSelector((state) => state.tickets.ticketsLoad); 
  const loadError = useSelector((state) => state.tickets.loadError); 
  const TicketAfterFilter = useSelector((state) => state.tickets.TicketAfterFilter); 
  const sortButton = useSelector((state) => state.tickets.sortButton); 
  const allTicketsLoad = useSelector((state) => state.tickets.allTicketsLoad); 
  const allTickets = useSelector((state) => state.tickets.allTickets)
  
  
//   console.log("tickets: ", tickets)
  // console.log("ticketsFilters: ", ticketsFilters)
  // if () {

  // }
  // let ticketsArr = tickets.tickets

  let ticketsArr = useSelector(selectFilteredTickets);
  dispatch(addTicketsAfterFilter(ticketsArr));
  let sortedTickets = useSelector(selectSortTickets);
  // if (allTicketsLoad) {
  //   ticketsArr = allTickets
  // }
  
  // useEffect(() => {
  //   dispatch(addTicketsAfterFilter(ticketsArr));
  // }, [ticketsArr, dispatch]);

  useEffect(() => {
    console.log("tickets.tickets в юс эффект:", tickets)
    if (allTicketsLoad) {
      allTickets.forEach((ticket, index) => {
        const numberOfTransfersThere = ticket.segments[0].stops.length;
        const numberOfTransfersBack = ticket.segments[1].stops.length;
        // console.log("numberOfTransfersThere, numberOfTransfersBack, index", numberOfTransfersThere, numberOfTransfersBack, index)
        dispatch(addNumberTransfers({ numberOfTransfersThere, numberOfTransfersBack, index }));
      // console.log("вот что передаем в addNumberTransfersAllTickets:", allTickets)
      // sortedTickets = addNumberTransfersAllTickets(allTickets)
      // sortedTickets.forEach((ticket, index) => {
      //   const numberOfTransfersThere = ticket.segments[0].stops.length;
      //   const numberOfTransfersBack = ticket.segments[1].stops.length;
      //   // console.log("numberOfTransfersThere, numberOfTransfersBack, index", numberOfTransfersThere, numberOfTransfersBack, index)
      //   dispatch(addNumberTransfers({ numberOfTransfersThere, numberOfTransfersBack, index}));
        
      });
      

    } else if (ticketsLoad && tickets && tickets.length > 0) {
      tickets.forEach((ticket, index) => {
        const numberOfTransfersThere = ticket.segments[0].stops.length;
        const numberOfTransfersBack = ticket.segments[1].stops.length;
        // console.log("numberOfTransfersThere, numberOfTransfersBack, index", numberOfTransfersThere, numberOfTransfersBack, index)
        dispatch(addNumberTransfers({ numberOfTransfersThere, numberOfTransfersBack, index }));
        
        
      });
    }

 
    // if (ticketsLoad && tickets && tickets.length > 0) {
    //   tickets.forEach((ticket, index) => {
    //     const numberOfTransfersThere = ticket.segments[0].stops.length;
    //     const numberOfTransfersBack = ticket.segments[1].stops.length;
    //     // console.log("numberOfTransfersThere, numberOfTransfersBack, index", numberOfTransfersThere, numberOfTransfersBack, index)
    //     dispatch(addNumberTransfers({ numberOfTransfersThere, numberOfTransfersBack, index }));
        
        
    //   });
    // }
  }, [ticketsLoad, tickets, allTicketsLoad]);

  // useEffect(() => {
   
  //     tickets.tickets.map((ticket, index) => {
  //       const numberOfTransfersThere = ticket.segments[0].stops.length
  //       const numberOfTransfersBack = ticket.segments[1].stops.length
  //       dispatch(addNumberTransfers({numberOfTransfersThere, numberOfTransfersBack, index}));
  //     })
   

  // }, [ticketsLoad])
  let MakeTicketsElem = false
  // console.log("ticketsArr:::",ticketsArr)
  if (sortedTickets !== undefined) {
    console.log("а вот sortedTickets уже для рендера",sortedTickets)
    
    MakeTicketsElem = sortedTickets.map((ticket, index) => {
    
      // MakeTicketsElem = ticketsArr.map((ticket, index) => {
      // const numberOfTransfersThere = ticket.segments[0].stops.length
      // const numberOfTransfersBack = ticket.segments[1].stops.length
      // dispatch(addNumberTransfers({ numberOfTransfersThere, numberOfTransfersBack, index}));
      let startTImethere = ticket.segments[0].date // время старта туда
      let flightTimethere = ticket.segments[0].duration; //время в полете туда
      let startTImeback = ticket.segments[1].date; // время возврата обратно
      let flightTimeback = ticket.segments[1].duration; //время в полете обратно
      const StartStopTimeThere = makeTime(startTImethere, flightTimethere);
      const StartStopTimeBack = makeTime(startTImeback, flightTimeback)

      let travelHourseThere = parseInt((flightTimethere / 60).toFixed(0))
      let travelMinutesThere = flightTimethere % 60

      let travelHourseBack = parseInt((flightTimeback / 60).toFixed(0))
      let travelMinutesBack =  flightTimeback % 60

      

      const travelTimeThere = `${travelHourseThere > 9 ? travelHourseThere : `0${travelHourseThere}`} час ${travelMinutesThere > 9 ? travelMinutesThere : `0${travelMinutesThere}`} мин`
      const travelTimeBack = `${travelHourseBack > 9 ? travelHourseBack : `0${travelHourseBack}`} час ${travelMinutesBack > 9 ? travelMinutesBack : `0${travelMinutesBack}`} мин`
      

      function makeTime(time, flightTime) {
        const date = new Date(time);
        const hoursMinutesStart = date.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        });
        const [hours, minutes] = hoursMinutesStart.split(':');

        let finishHour = parseInt(hours) + (parseInt((flightTime / 60).toFixed(0)))
        let finishMinutes = parseInt(minutes)+(flightTime % 60)

        // if (finishMinutes > 60) {
        //   finishMinutes += (finishMinutes / 60).toFixed(0);
        //   finishMinutes %= 60;
        // }

        // if (finishHour > 24) {
        //   finishHour -= 24
        // }
        if (finishMinutes >= 60) {
          finishMinutes -= 60;
          finishHour += 1;
        }

        if (finishHour >= 24) {
          finishHour -= 24;
        }

        const hoursMinutesEnd = `${finishHour > 9 ? finishHour : `0${finishHour}`}:${finishMinutes > 9 ? finishMinutes : `0${finishMinutes}`}`;
        return `${hoursMinutesStart} - ${hoursMinutesEnd}`
    }
    // console.log("вот билет", ticket)

      return (

        <div className="ticket" key={generateKey.current += 1}>
          <div className="header_part_ticket">
            <span className="coast_ticket">{`${ticket.price.toLocaleString('ru-RU')} р`}</span>
            <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="Logo" />
          </div>
          <div className="middle_part_ticket">
            <div className="left_middle_ticket middle_ticket_txt">
              <span className="span_ticket span_ticket_top">{`${ticket.segments[0].origin} - ${ticket.segments[0].destination}`}</span>
              <span className="span_ticket span_ticket_bottom">{StartStopTimeThere}</span>
            </div>
            <div className="midle_middle_ticket middle_ticket_txt">
              <span className="span_ticket span_ticket_top">В пути</span>
              <span className="span_ticket span_ticket_bottom">{travelTimeThere}</span>
            </div>
            <div className="right_middle_ticket middle_ticket_txt">
              <span className="span_ticket span_ticket_top">{ticket.segments[0].numberTransWord}</span>
              <span className="span_ticket span_ticket_bottom">{ticket.segments[0].stops.join(",")}</span>
            </div>
          </div>
          <div className="bottom_part_ticket">
            <div className="left_middle_ticket middle_ticket_txt">
              <span className="span_ticket span_ticket_top">{`${ticket.segments[1].origin} - ${ticket.segments[1].destination}`}</span>
              <span className="span_ticket span_ticket_bottom">{StartStopTimeBack}</span>
            </div>
            <div className="midle_middle_ticket middle_ticket_txt">
              <span className="span_ticket span_ticket_top">В пути</span>
              <span className="span_ticket span_ticket_bottom">{travelTimeBack}</span>
            </div>
            <div className="right_middle_ticket middle_ticket_txt">
              <span className="span_ticket span_ticket_top">{ticket.segments[1].numberTransWord}</span>
              <span className="span_ticket span_ticket_bottom">{ticket.segments[1].stops.join(",")}</span>
            </div>
          </div>
        </div>
      );
    });
    } // Это конец ифа

  if (ticketsFilters.allFilterFalse && !loadError) {
    return <InfoStartFilter />
    // return "выберите хоть один фильтр"
  }

  if (!ticketsLoad){
    if (loadError) {
      return (
        <>
          <InfoErrorFetch />
          <Loader />
        </>
      ) 
    }

    if (loadError) {
      return(
        <>
          <InfoErrorFetch />
          <Loader />
        </>
      )
    }
    return <Loader />
  }
   
  let resultArrToRender = MakeTicketsElem.slice(0, 6)

  return <>{resultArrToRender ? resultArrToRender : 'гружу'}</>;
}

export default Tickets;