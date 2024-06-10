import './SortPanel.scss';
import {useState} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {changeSort} from '../../store/AviaSalesSlice'



function SortPanel() {
    // const [selected, setSelected] = useState(null);
//   const dispatch = useDispatch() 
    const selected = useSelector((state) => state.tickets.sortButton); 
    const dispatch = useDispatch() 
// const ticketsFilters = useSelector((state) => state.tickets.filterTicket); 
// // console.log("ticketsFilters внутри компонента филтры", ticketsFilters)
//   const checkFilter = (id) => {
//       dispatch(changeFilter(id))
//   }
    console.log("selected достанный из redux", selected)

    const ChangeSortButton = (id) => {
        dispatch(changeSort(id))
        
        console.log("event", id)
    }


    return(
        <div className='choose_price_option'>
            <button 
                className={`button_price_option button_price_option_left ${selected === 'cheapest' ? 'selected' : ''}`} 
                id='cheapest' 
                onClick={(event) => ChangeSortButton(event.target.id)}
            >
                Самый дешевый
            </button>
            <button 
                className={`button_price_option button_price_option_right ${selected === 'fastest' ? 'selected' : ''}`} 
                id='fastest' 
                onClick={(event) => ChangeSortButton(event.target.id)}
            >
                Самый быстрый
            </button>
        </div>
    ); 
}

export default SortPanel;