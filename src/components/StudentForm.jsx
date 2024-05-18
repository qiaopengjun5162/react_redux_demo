import React, { useEffect, useState } from "react";
import { useGetStudentByIDQuery } from "../store/studentApi";
import classes from "./StudentForm.module.css";

const StudentForm = (props) => {
    console.log(props, "props");
    console.log(props.studentId, "studentId");
    const [inputData, setInputData] = useState({
        name: "",
        gender: "男",
        age: "",
        address: "",
    });
    const { data: studentData, isSuccess } = useGetStudentByIDQuery(props.studentId.id);

    useEffect(() => {
        if (isSuccess) {
            console.log(studentData, "studentData");
            setInputData(studentData.attributes);
        }


    }, [isSuccess])


    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        inputData.age = parseInt(inputData.age);
        // 调用addStudent函数

    };

    const handleUpdate = (e) => {
        e.preventDefault();
        // 调用updateStudent函数
        // updateStudent(props.student.id, inputData);

    }



    return (
        <>
            <tr className={classes.StudentForm}>
                <td>
                    <input
                        onChange={handleChange}
                        value={inputData.name}
                        name="name"
                        type="text"
                    />
                </td>
                <td>
                    <select
                        onChange={handleChange}
                        value={inputData.gender}
                        className={classes.select}
                        name="gender"
                    >
                        <option value="">请选择</option>
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </td>
                <td>
                    <input
                        onChange={handleChange}
                        value={inputData.age}
                        name="age"
                        type="number"
                    />
                </td>
                <td>
                    <input
                        onChange={handleChange}
                        value={inputData.address}
                        name="address"
                        type="text"
                    />
                </td>
                <td>
                    {props.studentId && <>
                        <button onClick={() => props.onCancel()}>Cancel</button>
                        <button onClick={handleUpdate}>Confirm</button>
                    </>}
                    {!props.studentId &&
                        <button onClick={handleSubmit} className={classes.btn}>
                            Add
                        </button>
                    }
                </td>
            </tr>
            {/* {loading && <tr><td colSpan={5}>加载中...</td></tr >} */}
            {/* {error && <tr><td colSpan={5}>{error}</td></tr>} */}
        </>
    );
};

export default StudentForm;
