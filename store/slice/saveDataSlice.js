import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    singleDetails: {
        num: 0
    },
    allDetails: []
}
const saveDataSlice = createSlice({
    name: 'saveDataSlice',
    initialState,
    reducers: {
        addSingleData(state, action) {
            // console.log(action.payload)
            state.singleDetails = {
                team: action.payload.team,
                num: action.payload.num,
                [`mem${action.payload.num}`]: {
                    ...state.singleDetails[`mem${action.payload.num}`],
                    ...action.payload[`mem${action.payload.num}`]
                }
            }
        },
        addAllDetails(state, action) {
            state.allDetails.push({ ...state.singleDetails })
        }
    }
})
export const { addSingleData, addAllDetails } = saveDataSlice.actions
export default saveDataSlice.reducer
