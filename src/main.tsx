import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'mobx-react';
import './index.css';
import App from './app/App';
import store from './store/metersStore';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
