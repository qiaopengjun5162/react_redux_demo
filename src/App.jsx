import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './App.module.css'
import { setAddress as setSchoolAddress, setName as setSchoolName } from './store/schoolSlice'
import { setAge, setName } from './store/stuSlice'
import { useGetStudentsQuery } from './store/studentApi'

const App = () => {
    // useSelector 用来加载 redux 中的数据
    // 第一个参数是 redux 中的数据
    // 第二个参数是 当前组件的名称
    // 返回值是 redux 中的数据
    // const student = useSelector(state => state.students)
    // const school = useSelector(state => state.school)
    const { student, school } = useSelector(state => state)

    // 通过 useDispatch 修改 redux 中的数据 获取派发器对象
    const dispatch = useDispatch()
    // 获取 action 的构建器


    const setNameHandler = () => {
        dispatch(setName('Student'))

    }

    // 修改年龄
    const setAgeHandler = () => {
        dispatch(setAge(20))
    }
    // 调用API查询数据
    // 这个钩子函数它会返回一个对象作为返回值，请求过程中的相关数据都在该对象中存储
    useGetStudentsQuery()
    return (
        <div className={classes.App}>
            <h1 className={classes.title}>学生列表</h1>
            <table className={classes.table}>
                <thead className={classes.thead}>
                    <th>学校名称</th>
                    <th>学校地址</th>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>性别</th>
                    <th>地址</th>
                    <th>修改姓名</th>
                    <th>修改年龄</th>
                </thead>
                <tbody className={classes.tbody}>
                    <tr>
                        <td>{school.name}</td>
                        <td>{school.address}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.gender}</td>
                        <td>{student.address}</td>
                        <button onClick={setNameHandler} className={classes.btn}>update</button>
                        <button onClick={setAgeHandler} className={classes.btn}>update</button>
                    </tr>
                </tbody>
                <tfoot className={classes.tfoot}>
                    <tr>
                        <button onClick={() => dispatch(setSchoolName('School'))} className={classes.btn}>update</button>
                        <button onClick={() => dispatch(setSchoolAddress('School address'))} className={classes.btn}>update</button>
                    </tr>
                </tfoot>

            </table>

        </div>
    )
}

export default App
