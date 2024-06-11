import './InfoErrorFetch.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../store/AviaSalesSlice';

function InfoErrorFetch() {
  return (
    <div className="info_fecth_error">
      <span>К сожалению пока не можем получить билеты с сервера</span>
    </div>
  );
}

export default InfoErrorFetch;
