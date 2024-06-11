// import { useState, useEffect, useRef, useCallback } from 'react';
// import './aviasales.scss';
// import { formatDistanceToNow } from 'date-fns';
// import {useSelector} from 'react-redux'
// import {useDispatch} from 'react-redux'
// import {setTickets, loadError, fetchTickets, addSearchId, setAllTickets} from '../../store/AviaSalesSlice'
// import Tickets from '../Tickets'
// import FilterTickets from '../FiltersTickets'
// import SortPanel from '../SortPanel'
// import Mainlogo from '../AviaSales/Logo.png'


// function Aviasales() {
//   const tickets = useSelector((state) => state.tickets.tickets); //получаем билеты из глобального score
//   // const ticketsLoad = useSelector((state) => state.ticketsLoad);
//   // const ticketsLoad = useSelector((state) => state.tickets.ticketsLoad);
//   // const searchIdFromState = useSelector((state) => state.tickets.searchId);
//   // console.log("вот что в стейте происходит", tickets)
//   const searchIdRef = useRef(null);
//   // console.log("билеты загружены?", ticketsOnLoad)
//   const dispatch = useDispatch()  // тригер что событие случилось что пора событие передать в reducer
//   let searchIdFromState = useSelector((state) => state.tickets.searchId);
  

//   useEffect(() => {
//     let numberFetch = 5
    
//     function getTickets (numberFetch, searchIds = null) {
        
//         dispatch(fetchTickets(searchIds))
//         // dispatch(fetchTickets())
//           .unwrap()
//           .then((result) => {
            
//             console.log("вот searchIdFromState внутри где работаю: ", searchIdFromState)
//             if (searchIds === null) {
              
//               dispatch(setTickets(result.tickets.tickets));

//             }
//             dispatch(addSearchId(result.searchId))
//             // dispatch(setTickets(result.tickets));
//             dispatch(loadError(false));
//             searchIdRef.current = result.searchId;
//             if (!result.tickets.stop) {
//               dispatch(setAllTickets(result.tickets.tickets))
//               console.log("вот какой searchId я передаю", searchIdRef.current)
//               getTickets(numberFetch, searchIdRef.current)
              
//             }
//           })
//           .catch((error) => {
//             console.error('Ошибка при получении билетов:', error);
//             dispatch(loadError(true));
//             if (numberFetch > 0 ) {
//               getTickets(numberFetch-1)
//             }
//           });
//     }
//     getTickets(numberFetch)
//   }, []);



//   // useEffect(() => {
//   //   if (ticketsLoad) {
//   //     console.log('Состояние ticketsLoad изменилось:', ticketsLoad);
      
//   //   }
//   // }, [ticketsLoad]);

//   return (
    
//     <section className="aviasales">
//       <div className="header">
        
//         <img src={Mainlogo} alt="Main Logo" />
        
//       </div>
      
//       <div className="main-div">
//         <div className='left_body'>
//               <FilterTickets />
//         </div>
//         <div className='right_body'>
//             <SortPanel />

//             <Tickets />

//         </div>
//       </div>
      
//     </section>
//   );
// }

// export default Aviasales;








import { useEffect, useRef } from 'react';
import './aviasales.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setTickets, loadError, fetchTickets, addSearchId, setAllTickets, setAllTicketsLoad, SaveAllTickets } from '../../store/AviaSalesSlice';
import Tickets from '../Tickets';
import FilterTickets from '../FiltersTickets';
import SortPanel from '../SortPanel';
import Mainlogo from '../AviaSales/Logo.png';

function Aviasales() {
  const tickets = useSelector((state) => state.tickets.tickets); // получаем билеты из глобального store
  const searchIdFromState = useSelector((state) => state.tickets.searchId);
  const dispatch = useDispatch();  // триггер, что событие случилось, и пора событие передать в reducer

  const searchIdRef = useRef(null);

  useEffect(() => {
    let numberFetch = 10;

    function getTickets(numberFetch) {
      const currentSearchId = searchIdRef.current;

      dispatch(fetchTickets(currentSearchId))
        .unwrap()
        .then((result) => {
          console.log("вот searchIdFromState внутри где работаю: ", currentSearchId);
          if (currentSearchId === null) {
            dispatch(setTickets(result.tickets.tickets));
          } 
          if (!result.tickets.stop) {
            console.log("записываю в массив все билеты т.к result.tickets.stop=", result.tickets.stop)
            dispatch(setAllTickets(result.tickets.tickets))
            // SaveAllTickets(result.tickets.tickets)
          }
          
          // dispatch(setAllTickets(result.tickets.tickets));
          dispatch(addSearchId(result.searchId));
          searchIdRef.current = result.searchId;
          dispatch(loadError(false));
          console.log("вот stop или не stop", result.tickets.stop)
          if (!result.tickets.stop && numberFetch > 0) {
            console.log("вот какой searchId я передаю", searchIdRef.current);
            getTickets(numberFetch);
          } else if (result.tickets.stop) {
            dispatch(setAllTicketsLoad())
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
  }, [] /*[dispatch]*/);

  return (
    <section className="aviasales">
      <div className="header">
        <img src={Mainlogo} alt="Main Logo" />
      </div>
      <div className="main-div">
        <div className='left_body'>
          <FilterTickets />
        </div>
        <div className='right_body'>
          <SortPanel />
          <Tickets />
        </div>
      </div>
    </section>
  );
}

export default Aviasales;

