import { configureStore } from '@reduxjs/toolkit'
import { schoolReducer } from './schoolSlice'
import { stuReducer } from './stuSlice'
import studentApi from './studentApi'
import { setupListeners } from '@reduxjs/toolkit/query'


// https://redux.js.org/introduction/getting-started
/*
    createSlice 是一个函数，它接收一个配置对象作为参数。配置对象包含以下属性：
    name: 切片的名称，用于在 Redux 状态树中标识切片。
    initialState: 切片的初始状态。
    reducers: 一个对象，包含多个用于处理状态变化的 reducer 函数。
    extraReducers: 一个对象，包含多个用于处理其他 action 的 reducer 函数。

    createSlice 函数会返回一个对象，该对象包含以下属性：
    name: 切片的名称。
    reducer: 合并后的 reducer 函数，用于更新状态。
    extraReducers: 合并后的 extraReducers 对象，用于处理其他 action。

    使用 createSlice 创建切片时，需要指定切片的名称、初始状态和处理状态变化的 reducer 函数。

*/

// 切片对象会自动的帮助我们生成 action
// actions 中存储的是 slice 自动生成action 创建器（函数），调用函数会自动创建action对象
// action 对象的结构是 { type: 'students/addStudent', payload: { id: 1, name: '张三' } }


// 创建 store
// configureStore 是 Redux Toolkit 提供的用于创建 store 的函数
// configureStore 函数接收一个配置对象作为参数，配置对象包含以下属性：
// reducer: 用于指定应用的状态树。
// middleware: 用于指定应用的中间件。
// devTools: 用于指定是否在开发环境下启用 Redux DevTools。
// 创建 store 时，需要指定应用的状态树和中间件。
const store = configureStore({
    reducer: {
        student: stuReducer,
        school: schoolReducer,
        [studentApi.reducerPath]: studentApi.reducer
    },

    // 指定中间件
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(studentApi.middleware)
    }
})

// setupListeners 函数用于设置监听器，监听器会在状态发生变化时自动触发。
// setupListeners 函数接收一个 dispatch 函数作为参数，用于触发 action。
// setupListeners 函数会自动监听状态变化，并在状态发生变化时触发监听器。
// 设置后，将会支持 refetchOnReconnect refetchOnFocus 等功能
setupListeners(store.dispatch)

export default store

