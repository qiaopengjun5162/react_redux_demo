import { createSlice } from '@reduxjs/toolkit'

// 创建一个切片
const stuSlice = createSlice({
    // 切片的名称
    name: 'stud', // 用来自动生成 action 中的 type

    // 切片的初始状态
    initialState: {
        name: '张三',
        age: 18,
        gender: '男',
        address: '北京',
    },

    // 处理状态变化的 reducer 函数 指定 state的各种操作 可以直接在对象中添加方法
    reducers: {
        // 可以通过不同的方法来指定对 state的不同操作
        // 两个参数：
        // state: 当前的状态 这个state 是一个代理对象 可以直接修改
        // action: 当前触发的 action
        addStudent(state, action) {
            state.list.push(action.payload)
        },
        removeStudent(state, action) {
            state.list = state.list.filter(item => item.id !== action.payload)
        },
        setName(state, action) {
            state.name = action.payload
        },
        setAge(state, action) {
            state.age = action.payload
        }
    }
})

export const { addStudent, removeStudent, setName, setAge } = stuSlice.actions
export const { reducer: stuReducer } = stuSlice
