import { createSlice } from "@reduxjs/toolkit"


// 创建学校的 slice
const schoolSlice = createSlice({
    name: 'school',
    initialState: {
        name: '尚硅谷',
        address: '北京',
    },
    reducers: {
        setName(state, action) {
            state.name = action.payload
        },
        setAddress(state, action) {
            state.address = action.payload

        }
    }
})

// 导出切片中的 action 创建器
export const { setName, setAddress } = schoolSlice.actions

// 导出 reducer
export const { reducer: schoolReducer } = schoolSlice
