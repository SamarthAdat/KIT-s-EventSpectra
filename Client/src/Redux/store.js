import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './Slices/authSlice'
import clubSliceReducer from './Slices/clubSlice'
import eventSliceReducer from './Slices/eventSlice'
import companySliceReducer from './Slices/companySlice'

// for persist-storage
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {combineReducers} from '@reduxjs/toolkit'


const persistConfig = {
    key: 'root' ,
    version: 1 ,
    storage
}

// NOTE: Whenever we need to use useSelector we need to access the state names as -> auth, clubs, events, companies. The name of the slice in the createSlice does not matter !
// eg: here while accessing companyData we need to accesss it as : useSelector(state => state.companies) even though the name of state is company we need to access it as state.companies since it is written in store as companies !
 
const reducer = combineReducers({
    auth: authSliceReducer ,
    clubs: clubSliceReducer,
    events: eventSliceReducer,
    companies: companySliceReducer,
})

const persistedReducer = persistReducer(persistConfig,reducer)


const store = configureStore({
    reducer: persistedReducer,
    devTools: true
})


// NORMAL STORE BELOW

// const store = configureStore({
//     reducer: {
//         auth: authSliceReducer ,
//         clubs: clubSliceReducer
//     } ,
//     devTools: true
// })

export default store