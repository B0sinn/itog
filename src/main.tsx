import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './index.css'
import { setupStore } from './store/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
