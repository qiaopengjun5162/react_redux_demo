import React, { useState } from 'react';
import { useDeleteStudentMutation } from '../store/studentApi';
import StudentForm from './StudentForm';


const Student = (props) => {
    const [isEdit, setIsEdit] = useState(false);

    // useMutation 的钩子返回的是一个数组
    // 数组中的第一个元素是 mutation 函数，第二个元素是 mutation 函数的执行结果
    const [deleteStudent, { isSuccess, loading, error }] = useDeleteStudentMutation();


    // delete student
    const deleteHandler = () => {
        deleteStudent(props.student.id);
    }

    const cancelEdit = () => {
        setIsEdit(false)
    }

    return (
        <>
            {(!isEdit && !isSuccess) &&
                <tr>
                    <td>{props.student.attributes.name}</td>
                    <td>{props.student.attributes.gender}</td>
                    <td>{props.student.attributes.age}</td>
                    <td>{props.student.attributes.address}</td>
                    <td>
                        <button className='btn btn-danger' onClick={deleteHandler}>Delete</button>

                        <button className="btn btn-primary" onClick={() => setIsEdit(true)}>
                            Edit
                        </button>
                    </td>
                </tr>
            }

            {isSuccess && <tr><td colSpan={5}>删除成功</td></tr>}
            {isEdit && <StudentForm stuId={props.student.id} onCancel={cancelEdit} />}
            {loading && <tr><td colSpan={5}>正在删除数据...</td></tr>}
            {error && <tr><td colSpan={5}>删除数据失败...{error.message}</td></tr>}
        </>
    )
}

export default Student
