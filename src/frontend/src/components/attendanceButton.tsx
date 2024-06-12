import React, { useEffect, useState } from 'react';


interface Props {
    studentId: number
    instanceClassId: number|null
    presenceId?: number
    status: boolean
    reloadFunction: Function
}

const AttendanceButton: React.FC<Props> = ({ instanceClassId, studentId, presenceId, status, reloadFunction }) => {

    const [isPresent, setIsPresent] = useState<boolean>(status);
    const [backgroundColor, setBackgroundColor] = useState<string>(status ? 'green-2' : 'red-1');
    const [text, setText] = useState<string>(status ? 'Presente' : 'Ausente');
    const [textColor, setTextColor] = useState<string>(status ?'green-4' : 'red-2');

    useEffect(() => {
        setIsPresent(status);
        setBackgroundColor(status ? 'green-2' : 'red-1');
        setText(status ? 'Presente' : 'Ausente');
        setTextColor(status ?'green-4' : 'red-2');
    }, [status])


    const handleClick = async () => {
        if (status == false) {
            handleClickAttendance()
        } else if (presenceId) {
            handleClickAbsense(presenceId)
        }
    }


    const handleClickAttendance = async () => {
        try {

            setIsPresent(prevIsPresent => !prevIsPresent);

            setBackgroundColor(isPresent ? 'red-1' : 'green-2');
            setTextColor(isPresent ? 'red-2' : 'green-4');
            setText(isPresent ? 'Ausente' : 'Presente');

            const url = 'http://localhost:3000/api/students-presences-classes'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    student_id: studentId,
                    class_instance_id: instanceClassId,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar dados de presença');
            }

            reloadFunction()

        } catch (error) {
            console.error(error);
        }
    };


    const handleClickAbsense = async (presenceId: number) => {

        try {

            setIsPresent(prevIsPresent => !prevIsPresent);

            setBackgroundColor(!isPresent ? 'green-2' : 'red-1');
            setTextColor(!isPresent ? 'green-4' : 'red-2');
            setText(!isPresent ? 'Presente' : 'Ausente');

            const url = `http://localhost:3000/api/students-presences-classes/${presenceId}`
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar presença');
            }

            reloadFunction()

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <button onClick={handleClick}>
            <div className={`bg-${backgroundColor} text-${textColor} rounded-2xl py-1 w-[80px] shadow-shadow-25`}>
                {text}
            </div>
        </button>
    )
}

export default AttendanceButton