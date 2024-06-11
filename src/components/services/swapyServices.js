import { Component } from 'react';
import './swapy-services.css';

export default class SwapyServices extends Component {
  // apiGuestSession = 'https://api.themoviedb.org/3/authentication/guest_session/new';

  // apiBase = 'https://api.themoviedb.org/3/search/movie?query=';

  // apiOptions = '&include_adult=false&language=en-US&page=';

  // apiBaseImage = 'https://image.tmdb.org/t/p/w500';

  // apiMovieDetails = 'https://api.themoviedb.org/3/movie/';

  // apiSendRateBase = 'https://api.themoviedb.org/3/movie/';

  // apiSendRateEnd = '/rating';

  // _apiGetRateBase = 'https://api.themoviedb.org/4/guest_session/'
  // _apiGetRateEnd = '/rated/movies?api_key=a6d5bfd3342c2caf4d2d5b95cc971180'
  // apiGetRatedVersion4 = 'https://api.themoviedb.org/4/account/664d893a5c47b2b48a188945/movie/rated';

  // _apiBaseGetMovieMyReit = '`https://api.themoviedb.org/3/movie/${movieId}/account_states?api_key=YOUR_API_KEY&session_id=${sessionId}`'
  apiBase = 'https://aviasales-test-api.kata.academy/search';
  // apiSearch = 'https://aviasales-test-api.kata.academy/tickets?searchId=${id}'
  apiSearch = 'https://aviasales-test-api.kata.academy/tickets?searchId=';

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  // optionsGetRate = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //   },
  // };

  // async getTickets() {
  //   const res = await fetch(this.apiBase);
  //   if (!res.ok) {
  //     throw new Error(`запрос не получился по url:${this.apiBase} он завершился со статусом: ${res.status}`);
  //   }
  //   const result = await res.json()
  //   // console.log("ыпа", result.searchId)
  //   // console.log(res.json())
  //   // return res.json();
  //   const tickets = await fetch(`${this.apiSearch}${result.searchId}`);
  //   if (!tickets.ok) {
  //     return false
  //     // throw new Error(`запрос не получился по url:${this.apiSearch}${result.searchId} он завершился со статусом: ${tickets.status}`);

  //   }
  //   return tickets.json();

  //   // return res.json();
  // }
  async getTickets() {
    const res = await fetch(this.apiBase);
    if (!res.ok) {
      throw new Error(`запрос не получился по url:${this.apiBase} он завершился со статусом: ${res.status}`);
    }
    const result = await res.json();
    const tickets = await fetch(`${this.apiSearch}${result.searchId}`);
    if (!tickets.ok) {
      throw new Error(
        `запрос не получился по url:${this.apiSearch}${result.searchId} он завершился со статусом: ${tickets.status}`
      );
    }
    return tickets.json();
  }

  // await fetch(this.apiBase)
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error(`запрос не получился по url:${this.apiBase} он завершился со статусом: ${res.status}`);
  //     }
  //     return res
  //   })
  //   then((res) =>{
  //     return res.json();
  //   })
}
