import React from 'react';
import classes from './App.module.css';
import StudentList from './components/studentList';
import { useGetStudentsQuery } from './store/studentApi';

const App = () => {
    // useSelector 用来加载 redux 中的数据
    // 第一个参数是 redux 中的数据
    // 第二个参数是 当前组件的名称
    // 返回值是 redux 中的数据
    // const student = useSelector(state => state.students)
    // const school = useSelector(state => state.school)
    // const { student, school } = useSelector(state => state)

    // 通过 useDispatch 修改 redux 中的数据 获取派发器对象
    // const dispatch = useDispatch()
    // 获取 action 的构建器


    // const setNameHandler = () => {
    //     dispatch(setName('Student'))

    // }

    // 修改年龄
    // const setAgeHandler = () => {
    //     dispatch(setAge(20))
    // }
    // 调用API查询数据
    // 这个钩子函数它会返回一个对象作为返回值，请求过程中的相关数据都在该对象中存储
    const result = useGetStudentsQuery(null, {
        // 请求成功后，返回的数据存储在 result.data 中
        // 请求是否成功的状态存储在 result.isSuccess 中
        // 请求是否在加载中存储在 result.isLoading 中
        // 请求是否出错存储在 result.isError 中
        // selectFromResult: result => {
        //     if (result.data) {
        //         return result.data = result.data.filter(item => item.attributer.age <= 18)
        //     }
        // },
        // 请求的配置 用来设置轮询的时间 单位是毫秒 
        pollingInterval: 0,
        skip: false, // 是否跳过本次请求
        refetchOnMountOrArgChange: true, // 是否在组件挂载或参数变化时重新请求数据
        refetchOnReconnect: true, // 是否在网络连接断开后重新请求数据
        refetchOnWindowFocus: true, // 是否在窗口获取焦点时重新请求数据
        refetchOnFocus: true, // 是否在组件获取焦点时重新请求数据
    })
    const { data: stuData, isSuccess, isLoading } = result;


    return (
        <div className={classes.App}>
            {/* <h1 className={classes.title}>学生列表</h1> */}
            {/* <table className={classes.table}> */}
            {/* <thead className={classes.thead}> */}
            {/* <th>学校名称</th> */}
            {/* <th>学校地址</th> */}
            {/* <th>姓名</th> */}
            {/* <th>年龄</th> */}
            {/* <th>性别</th> */}
            {/* <th>地址</th> */}
            {/* <th>修改姓名</th> */}
            {/* <th>修改年龄</th> */}
            {/* </thead> */}
            {/* <tbody className={classes.tbody}>
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
                </tfoot> */}


            {/* <tbody className={classes.tbody}>

                    {isLoading && <div>Loading...</div>}

                    {isSuccess && data.data.map(item => {
                        return <tr key={item.id}>
                            <td>{item.attributes.name}</td>
                            <td>{item.attributes.age}</td>
                            <tr>{item.attributes.gender}</tr>
                            <td>{item.attributes.address}</td>
                        </tr>
                    })}

                </tbody> */}
            {/* </table> */}

            {isLoading && <div>Loading...</div>}

            {isSuccess && <StudentList students={stuData} />}
        </div>
    )
}

export default App
