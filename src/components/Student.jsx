import React, { useState } from 'react';
import StudentForm from './StudentForm';


const Student = ({ student: { id, attributes: { name, age, gender, address } } }) => {
    const [isEdit, setIsEdit] = useState(false);

    // delete student
    const deleteHandler = () => {
        // delete student

    }

    const cancelEdit = () => {
        setIsEdit(false)
    }

    return (
        <>
            {!isEdit &&
                <tr>
                    <td>{name}</td>
                    <td>{gender}</td>
                    <td>{age}</td>
                    <td>{address}</td>
                    <td>
                        <button className='btn btn-danger' onClick={deleteHandler}>Delete</button>

                        <button className="btn btn-primary" onClick={() => setIsEdit(true)}>
                            Edit
                        </button>
                    </td>
                </tr>
            }
            {isEdit && <StudentForm studentId={{ id }} onCancel={cancelEdit} />}
            {/* {loading && <tr><td colSpan={5}>正在删除数据...</td></tr>} */}
            {/* {error && <tr><td colSpan={5}>删除数据失败...{error.message}</td></tr>} */}
        </>
    )
}

export default Student
