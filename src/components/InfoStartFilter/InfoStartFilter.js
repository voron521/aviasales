import './InfoStartFilter.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../store/AviaSalesSlice';

function InfoStartFilter() {
  return (
    <div className="info_start_filter">
      <span>Выберите количество пересадок для отображения билетов</span>
    </div>
  );
}

export default InfoStartFilter;
