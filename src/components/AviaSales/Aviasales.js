import { useState, useEffect, useRef, useCallback } from 'react';
import './aviasales.scss';
import { formatDistanceToNow } from 'date-fns';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {setTickets, loadError} from '../../store/AviaSalesSlice'
import Tickets from '../Tickets'
import FilterTickets from '../FiltersTickets'
import SortPanel from '../SortPanel'
import Mainlogo from '../AviaSales/Logo.png'

import swapyServices from '../services/swapyServices';



const newSwapy = new swapyServices();
function Aviasales() {
  // const tickets = useSelector((state) => state.tickets.tickets); //получаем билеты из глобального score
  // const ticketsLoad = useSelector((state) => state.ticketsLoad);
  // const ticketsLoad = useSelector((state) => state.tickets.ticketsLoad);
  
  
  // console.log("билеты загружены?", ticketsOnLoad)
  const dispatch = useDispatch()  // тригер что событие случилось что пора событие передать в reducer

  

  useEffect(() => { 

    let countFetchToServer = 5;

    async function FetchServer(countFetchToServer) {
      try {
        const res = await newSwapy.getTickets();
        if (res) {
          dispatch(setTickets(res));
          dispatch(loadError(false));
        }
      } catch (error) {
        console.error('Ошибка при получении билетов:', error);
        if (countFetchToServer > 0) {
          dispatch(loadError(true));
          await FetchServer(countFetchToServer - 1);
        } 
      }
    }

    FetchServer(countFetchToServer);
    
     
  }, []); 


  // useEffect(() => {
  //   if (ticketsLoad) {
  //     console.log('Состояние ticketsLoad изменилось:', ticketsLoad);
      
  //   }
  // }, [ticketsLoad]);

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
