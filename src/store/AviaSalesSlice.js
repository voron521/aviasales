import { createSlice, createSelector } from '@reduxjs/toolkit';
import { parseJSON } from 'date-fns';


const AviaSalesSlice = createSlice({
    name: 'tickets',
    initialState: {
        tickets: [],
        ticketsLoad: false,
        filterTicket: {
            all: false,
            no: false,
            one: false,
            two: false,
            three: false,
            allFilterFalse: true,
            
        },
        sortButton: null,
        TicketAfterFilter: [],
        loadError: false,
        

    },
    reducers: {
        setTickets(state, action) {
            state.tickets = action.payload;
            state.ticketsLoad = !state.ticketsLoad
            // let sortArray = [...state.tickets.tickets].sort((ticketA, ticketB) =>   ticketA.price - ticketB.price)
            // state.sortTicketCheapest = sortArray
            
            
        },
        loadError(state, action) {
            if (action.payload) {
                state.loadError = true
            } else {
                state.loadError = false
            }
            
        },
        changeSort(state, action) {
            state.sortButton = state.sortButton === action.payload ? null : action.payload
            // let sortArray = [...state.tickets.tickets].sort((ticketA, ticketB) =>   ticketA.price - ticketB.price)
            // state.sortTicketCheapest = sortArray
            // setSelected(prevSelected => prevSelected === id ? null : id);
        },
        addTicketsAfterFilter(state, action) {
            state.TicketAfterFilter = action.payload
        },
        changeFilter(state, action) {

            
            state.filterTicket[action.payload] = !state.filterTicket[action.payload]

            if ((state.filterTicket.all || !state.filterTicket.all) && action.payload==='all' ) {
                Object.keys(state.filterTicket).forEach((KeyFilter)=>{
                    state.filterTicket[KeyFilter] = state.filterTicket.all
                })

            }
            if (action.payload !== 'all' && state.filterTicket.all) {

                state.filterTicket.all = !state.filterTicket.all
            }
            if (!state.filterTicket.all) {
                
                if (!Object.values(state.filterTicket).slice(1, -1).includes(false)) {
                    state.filterTicket.all = true
                }
                

                

            }
            if (Object.values(state.filterTicket).slice(0, -1).includes(true)) {
                state.filterTicket.allFilterFalse = false
            } else {
                state.filterTicket.allFilterFalse = true
            }
            
            
        },
        addNumberTransfers(state, action) {
            
            // let wayIndex
            const { numberOfTransfersThere, numberOfTransfersBack, index, travelTimeThere, travelTimeBack } = action.payload;

            function addNumtrans (wayIndex, numberOfTransfers, index) {
                if (state.tickets.tickets[index] && state.tickets.tickets[index].segments[wayIndex].numberTransWord === undefined) {
                    state.tickets.tickets[index].segments[wayIndex].numberTrans = numberOfTransfers;
                    state.tickets.tickets[index].AllTimeInTravel = travelTimeThere + travelTimeBack;
                    switch(numberOfTransfers) {
                        case 0: 
                            state.tickets.tickets[index].segments[wayIndex].numberTransWord = 'без пересадок';
                            break
                        case 1:
                            state.tickets.tickets[index].segments[wayIndex].numberTransWord = 'одна пересадка';
                            break
                        case 2:
                            state.tickets.tickets[index].segments[wayIndex].numberTransWord = 'две пересадки';
                            break
                        case 3:
                            state.tickets.tickets[index].segments[wayIndex].numberTransWord = 'три пересадки';
                            break
                    }
                }

            }

            addNumtrans(0, numberOfTransfersThere, index)
            addNumtrans(1, numberOfTransfersBack, index)


        
            
           
            
        }

    }



})














export const selectFilteredTickets = createSelector(
    [(state) => state.tickets.tickets, (state) => state.tickets.filterTicket, (state) => state.tickets.ticketsLoad],
    (tickets, filterTicket, ticketsLoad) => {
        let result = []
        const filtDict = {1: 'one', 2: 'two', 3: 'three', 0: 'no'}

        if (ticketsLoad) {
            if (filterTicket.all) {
                return tickets.tickets
            }
           
            let ChosefilterArray = []  // one, two, three, no
            for (let filter in filterTicket) {
                if (filterTicket[filter]) {
                    ChosefilterArray.push(filter)
                }
            }

            result = tickets.tickets.filter((ticket) => {
                
                // console.log("ticket", ticket)
                
                
                // if (ChosefilterArray.includes(filtDict[ticket.segments[0].numberTrans])) {
                //     return true
                // }
                if ( ChosefilterArray.includes(filtDict[ticket.segments[0].stops.length]) || ChosefilterArray.includes(filtDict[ticket.segments[1].stops.length])) {
                    return true
                }
            }) 





            
        
        }

        return result
       
    }
)


export const selectSortTickets = createSelector(
    [(state) => state.tickets.TicketAfterFilter, (state) => state.tickets.sortButton],
    (TicketAfterFilter, sortButton) => {
        if (sortButton === 'cheapest') {
            let sortArray = [...TicketAfterFilter].sort((ticketA, ticketB) =>   ticketA.price - ticketB.price)
            return sortArray
        } else if (sortButton === 'fastest') {
            console.log(TicketAfterFilter)
            let sortArray = [...TicketAfterFilter].sort((ticketA, ticketB) =>  (ticketA.segments[0].duration + ticketA.segments[1].duration) - (ticketB.segments[0].duration + ticketB.segments[1].duration))
            return sortArray
        } else {
            return TicketAfterFilter
        }


    }
)

export const {setTickets, filterTickets, changeFilter, addNumberTransfers, changeSort, addTicketsAfterFilter, loadError } = AviaSalesSlice.actions

export default AviaSalesSlice.reducer

