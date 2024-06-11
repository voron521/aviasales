import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { parseJSON } from 'date-fns';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (searchId, { rejectWithValue }) => {
  const apiBase = 'https://aviasales-test-api.kata.academy/search';
  const apiSearch = 'https://aviasales-test-api.kata.academy/tickets?searchId=';
  let id = searchId;
  console.log('id в танкусе', id);

  try {
    if (!id) {
      console.log('id внутри танка: ', id);
      const res = await fetch(apiBase);
      if (!res.ok) {
        throw new Error(`Запрос не получился по url:${apiBase} он завершился со статусом: ${res.status}`);
      }
      // state.searchId = result.searchId
      const result = await res.json();
      id = result.searchId;
    }

    const tickets = await fetch(`${apiSearch}${id}`);
    if (!tickets.ok) {
      throw new Error(`Запрос не получился по url:${apiSearch}${id} он завершился со статусом: ${tickets.status}`);
    }
    // return tickets.json();
    return { tickets: await tickets.json(), searchId: id };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const AviaSalesSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    allTickets: [],
    allTicketsLoad: false,
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
    searchId: null,
  },
  reducers: {
    setTickets(state, action) {
      state.tickets = action.payload;
      state.ticketsLoad = true;
    },

    setAllTickets(state, action) {
      try {
        let arrForAdd = action.payload.map((ticket) => {
          console.log('ticket внутри сет алл', ticket);
          const numberOfTransfersThere = ticket.segments[0].stops.length;
          const numberOfTransfersBack = ticket.segments[1].stops.length;

          const segments = ticket.segments.map((segment, wayIndex) => {
            const updatedSegment = { ...segment }; // создаем копию сегмента
            if (updatedSegment.numberTransWord === undefined) {
              const numberOfTransfers = wayIndex === 0 ? numberOfTransfersThere : numberOfTransfersBack;
              updatedSegment.numberTrans = numberOfTransfers;

              switch (numberOfTransfers) {
                case 0:
                  updatedSegment.numberTransWord = 'без пересадок';
                  break;
                case 1:
                  updatedSegment.numberTransWord = 'одна пересадка';
                  break;
                case 2:
                  updatedSegment.numberTransWord = 'две пересадки';
                  break;
                case 3:
                  updatedSegment.numberTransWord = 'три пересадки';
                  break;
              }
            }
            return updatedSegment;
          });

          const travelTimeThere = ticket.segments[0].duration || 0;
          const travelTimeBack = ticket.segments[1].duration || 0;
          const updatedTicket = {
            ...ticket,
            segments,
            AllTimeInTravel: travelTimeThere + travelTimeBack,
          };

          console.log('вот ticket после логики добавления полей', updatedTicket);
          return updatedTicket;
        });

        state.allTickets = [...state.allTickets, ...arrForAdd];
      } catch (error) {
        console.error('Ошибка в setAllTickets:', error);
      }
    },

    setAllTicketsLoad(state, action) {
      state.allTicketsLoad = true;

      state.tickets = state.allTickets;
    },
    loadError(state, action) {
      if (action.payload) {
        state.loadError = true;
      } else {
        state.loadError = false;
      }
    },
    addSearchId(state, action) {
      state.searchId = action.payload;
    },
    changeSort(state, action) {
      state.sortButton = state.sortButton === action.payload ? null : action.payload;
      // let sortArray = [...state.tickets.tickets].sort((ticketA, ticketB) =>   ticketA.price - ticketB.price)
      // state.sortTicketCheapest = sortArray
      // setSelected(prevSelected => prevSelected === id ? null : id);
    },
    addTicketsAfterFilter(state, action) {
      state.TicketAfterFilter = action.payload;
    },
    changeFilter(state, action) {
      state.filterTicket[action.payload] = !state.filterTicket[action.payload];

      if ((state.filterTicket.all || !state.filterTicket.all) && action.payload === 'all') {
        Object.keys(state.filterTicket).forEach((KeyFilter) => {
          state.filterTicket[KeyFilter] = state.filterTicket.all;
        });
      }
      if (action.payload !== 'all' && state.filterTicket.all) {
        state.filterTicket.all = !state.filterTicket.all;
      }
      if (!state.filterTicket.all) {
        if (!Object.values(state.filterTicket).slice(1, -1).includes(false)) {
          state.filterTicket.all = true;
        }
      }
      if (Object.values(state.filterTicket).slice(0, -1).includes(true)) {
        state.filterTicket.allFilterFalse = false;
      } else {
        state.filterTicket.allFilterFalse = true;
      }
    },
    addNumberTransfers(state, action) {
      // let wayIndex
      const { numberOfTransfersThere, numberOfTransfersBack, index, travelTimeThere, travelTimeBack } = action.payload;

      function addNumtrans(wayIndex, numberOfTransfers, index) {
        // if (!state.allTicketsLoad) {
        if (state.tickets[index] && state.tickets[index].segments[wayIndex].numberTransWord === undefined) {
          state.tickets[index].segments[wayIndex].numberTrans = numberOfTransfers;
          state.tickets[index].AllTimeInTravel = travelTimeThere + travelTimeBack;
          switch (numberOfTransfers) {
            case 0:
              state.tickets[index].segments[wayIndex].numberTransWord = 'без пересадок';
              break;
            case 1:
              state.tickets[index].segments[wayIndex].numberTransWord = 'одна пересадка';
              break;
            case 2:
              state.tickets[index].segments[wayIndex].numberTransWord = 'две пересадки';
              break;
            case 3:
              state.tickets[index].segments[wayIndex].numberTransWord = 'три пересадки';
              break;
          }
        }
      }

      addNumtrans(0, numberOfTransfersThere, index);
      addNumtrans(1, numberOfTransfersBack, index);
    },
  },
});

export const selectFilteredTickets = createSelector(
  [
    (state) => state.tickets.tickets,
    (state) => state.tickets.filterTicket,
    (state) => state.tickets.ticketsLoad,
    (state) => state.tickets.allFilterFalse,
    (state) => state.tickets.searchId,
    (state) => state.tickets.allTicketsLoad,
    (state) => state.tickets.allTickets,
  ],
  (tickets, filterTicket, ticketsLoad, allFilterFalse, searchId, allTicketsLoad, allTickets) => {
    let result = [];
    const filtDict = { 1: 'one', 2: 'two', 3: 'three', 0: 'no' };
    if (ticketsLoad) {
      if (allTicketsLoad && filterTicket.all) {
        // allTicketsLoad
        return allTickets;
      }
      // if (filterTicket.all || !allFilterFalse) {
      if (filterTicket.all) {
        return tickets;
      }

      let ChosefilterArray = []; // one, two, three, no
      for (let filter in filterTicket) {
        if (filterTicket[filter]) {
          ChosefilterArray.push(filter);
        }
      }

      result = tickets.filter((ticket) => {
        if (
          ChosefilterArray.includes(filtDict[ticket.segments[0].numberTrans]) ||
          ChosefilterArray.includes(filtDict[ticket.segments[1].numberTrans])
        ) {
          return true;
        }
      });
    }

    return result;
  }
);

export const selectSortTickets = createSelector(
  [(state) => state.tickets.TicketAfterFilter, (state) => state.tickets.sortButton],

  (TicketAfterFilter, sortButton) => {
    if (sortButton === 'cheapest') {
      let sortArray = [...TicketAfterFilter].sort((ticketA, ticketB) => ticketA.price - ticketB.price);
      return sortArray;
    } else if (sortButton === 'fastest') {
      console.log(TicketAfterFilter);
      let sortArray = [...TicketAfterFilter].sort(
        (ticketA, ticketB) =>
          ticketA.segments[0].duration +
          ticketA.segments[1].duration -
          (ticketB.segments[0].duration + ticketB.segments[1].duration)
      );
      return sortArray;
    } else {
      return TicketAfterFilter;
    }
  }
);

export const {
  setTickets,
  filterTickets,
  changeFilter,
  addNumberTransfers,
  changeSort,
  addTicketsAfterFilter,
  loadError,
  addSearchId,
  setAllTickets,
  setAllTicketsLoad,
} = AviaSalesSlice.actions;

export default AviaSalesSlice.reducer;