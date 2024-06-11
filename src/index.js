import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import Aviasales from './components/AviaSales';
import store from './store';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Aviasales />
  </Provider>
);
