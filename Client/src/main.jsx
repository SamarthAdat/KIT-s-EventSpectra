import store from './Redux/store.js'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {Toaster} from 'react-hot-toast'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {PersistGate}  from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'


let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter >


           <PersistGate persistor={persistor}>
                <App />
           </PersistGate>


            <Toaster />
        </BrowserRouter>
    </Provider>
)
