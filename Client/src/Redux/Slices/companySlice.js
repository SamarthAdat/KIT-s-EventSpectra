import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    companyData : []
}

export const getAllCompanies = createAsyncThunk('/company/get', async () => {
    try {
        const response = axiosInstance.get('/company')
        // console.log('hhh',(await response).data.company);
        toast.promise(response, {
            success: 'Company loaded successfully !',
            loading: 'Loading company data',
            error: 'Error in loading companies'
        })

        return (await response).data.company
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const createnewCompany = createAsyncThunk('/company/' , async (data)=> {
    try {
        console.log('data',data);
        const response = axiosInstance.post('/company',data)
        console.log('res',response);
        toast.promise(response,{
            loading: 'Creating new comapany ...' ,
            success: 'Company created successfully' ,
            error: 'Error in creating compnay'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const UpdateCompanies = createAsyncThunk('/company/',async(data)=>{
    console.log('data',data);
    try {
        console.log(`DATA :${data.get('Id')}`)
        const response = axiosInstance.post(`/company/${data.get('Id')}`,data)
        console.log('res',response);
        toast.promise(response,{
            loading: 'Updating new comapany ...' ,
            success: 'Updating compnay successfully' ,
            error: 'Error in Updating compnay'
        })
        return (await response).data

    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

const companySlice = createSlice({
    name:'company',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllCompanies.fulfilled, (state, action) => {
            if(action.payload){
                state.companyData = [...action.payload]
            }
            // console.log('state',state.companyData);
        })
    }
})

export default companySlice.reducer