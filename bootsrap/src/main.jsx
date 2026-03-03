import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { SkillsProvider } from './context/SkillsContext'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SkillsProvider>
        <App />
      </SkillsProvider>
    </Provider>
  </React.StrictMode>,
)
