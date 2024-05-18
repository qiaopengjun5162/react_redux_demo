import React, { useEffect, useState } from "react";
import { useCreateStudentMutation, useGetStudentByIDQuery, useUpdateStudentMutation } from "../store/studentApi";
import classes from "./StudentForm.module.css";

const StudentForm = (props) => {
    const [inputData, setInputData] = useState({
        name: "",
        gender: "男",
        age: "",
        address: "",
    });
    const { data: studentData, isSuccess } = useGetStudentByIDQuery(props.stuId, {
        skip: !props.stuId,
    });

    const [addStudent, { isError, error, isLoading, isSuccess: isSuccessAdd }] = useCreateStudentMutation();

    const [updateStudent, { isError: isErrorUpdate, error: errorUpdate, isSuccess: isSuccessUpdate, isLoading: isLoadingUpdate }] = useUpdateStudentMutation();

    useEffect(() => {
        if (isSuccess) {
            setInputData(studentData.attributes);
        }
    }, [isSuccess, studentData])


    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // age change int
        inputData.age = parseInt(inputData.age);
        // 调用addStudent函数
        addStudent(inputData);
        // 重置数据
        setInputData({
            name: "",
            gender: "男",
            age: "",
            address: "",
        })
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(inputData);
        // age change int
        // inputData.age = parseInt(inputData.age);
        const res = updateStudent({ id: props.stuId, attributes: inputData });
        console.log(res, "res");
        props.onCancel();
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
                    {props.stuId && <>
                        <button onClick={() => props.onCancel()}>Cancel</button>
                        <button onClick={handleUpdate}>Confirm</button>
                    </>}
                    {!props.stuId &&
                        <button onClick={handleSubmit} className={classes.btn}>
                            Add
                        </button>
                    }
                </td>
            </tr>

            {(isSuccessAdd || isSuccessUpdate) && <tr><td colSpan={5}>{isSuccessAdd ? "添加成功" : "修改成功"}</td></tr >}
            {(isLoading || isLoadingUpdate) && <tr><td colSpan={5}>加载中...</td></tr >}
            {(isError || isErrorUpdate) && <tr><td colSpan={5}>{error || errorUpdate}</td></tr >}
        </>
    );
};

export default StudentForm;
