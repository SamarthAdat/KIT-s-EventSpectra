import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"


const initialState = {
    clubData: []
}

export const getAllClubs = createAsyncThunk('/clubs/get' , async () => {
    try {
        const response = axiosInstance.get('/clubs')

        toast.promise(response,{
            loading: 'Loading clubs ...' ,
            success: 'Clubs loaded successfully ...' ,
            error: 'Failed to load clubs !'
        })

        // this return becomes action.payload
        return (await response).data.club

    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const createClub = createAsyncThunk('/club/create' , async (data)=> {
    try {
        const response = axiosInstance.post('/clubs',data)

        toast.promise(response,{
            loading: 'Creating new club ...' ,
            success: 'Club created successfully' ,
            error: 'Error in creating club'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const clubSlice = createSlice({
    name: 'clubs' ,
    initialState ,
    reducers: {} ,
    extraReducers: (builder) => {
        builder.addCase(getAllClubs.fulfilled, (state,action) => {
            if(action.payload) {
                state.clubData = [...action.payload]
            }
        })
    }
})

export default clubSlice.reducer    