import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../Helpers/axiosInstance'

const initialState = {
    eventData: []
}

export const getAllEvents = createAsyncThunk('/events/get', async () => {
    try {
        const response = axiosInstance.get('/events')

        toast.promise(response,{
            loading: 'loading events' ,
            error: 'Error in loading events',
            success: 'Events Loaded Successfully'
        })

        return (await response).data.events
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const updateEvent = createAsyncThunk('/events/update-event' , async(data) => {
    try {
       
        console.log(`DATA :${data.get('Id')}`);
        
        const response = axiosInstance.post(`/clubs/${data.get('Id')}/updateEvent`,data)

        toast.promise(response,{
            loading: 'Updataing Event..' ,
            error: 'Error in updatae event',
            success: 'Update added successfully'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const addEvent = createAsyncThunk('/events/add-event' , async(data) => {
    try {
       
        console.log(`DATA :${data.get('thumbnail')}`);
        
        const response = axiosInstance.post(`/clubs/${data.get('clubId')}/addEvent`,data)

        toast.promise(response,{
            loading: 'Adding Event' ,
            error: 'Error in creating event',
            success: 'Event added successfully'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const getEventDetailsById = createAsyncThunk('/events/getById', async() => {
    try {
        const res = axiosInstance.get('/user/me/registered-events')
        // console.log(`res.data.eventid: ${(await res).data.eventId}`);
        // console.log((await res).data.eventId);
        toast.promise(res,{
            loading: 'loading registered events' ,
            success: 'Events loaded successfully' ,
            // error: 'Error in loading events'
            error: d => {
                // console.log('err', d?.response?.data?.message)
                return d?.response?.data?.message
            }
        })

        // sending eventID array
        return (await res).data.eventId
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {} ,
    extraReducers: (builder) => {
        builder.addCase(getAllEvents.fulfilled, (state,action) => {
            if(action.payload){
                state.eventData = [...action.payload]
            }
        })

        builder.addCase(getEventDetailsById.fulfilled, (state,action) => {
            // console.log(`ACTION.PAYLOAD: ${action.payload}`);
            if(action.payload ){
                // console.log('true');
                state.eventData = [...action.payload]
            }else{
                // console.log('false');
                state.eventData = []
            }

            // console.log(state.eventData);
        })

       



       
    }
})

export default eventSlice.reducer