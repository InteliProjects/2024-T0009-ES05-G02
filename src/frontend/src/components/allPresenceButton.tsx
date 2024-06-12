// AllPresenceButton.tsx

import React from 'react';

interface Student {
    id: number;
    name: string;
}

interface studentPresenceClass {
    class_instance_id: number,
    student_id: number
    id: number

}

interface AllPresenceButtonProps {
    students: Student[];
    instanceClassId: number | null;
    reloadFunction: () => void;
    studentPresenceClasses: studentPresenceClass[];
}

const AllPresenceButton: React.FC<AllPresenceButtonProps> = ({
    students,
    instanceClassId,
    reloadFunction,
    studentPresenceClasses
}) => {
   

    const handleMarkAllPresent = async () => {
        
        const classPresences = studentPresenceClasses.filter(presence => presence.class_instance_id == instanceClassId)
        const studentsNotPresent = students.filter(student => !classPresences.find(presence => presence.student_id == student.id))

        // console.log(studentsNotPresent)

        for (const student of studentsNotPresent) {
            const url = 'http://localhost:3000/api/students-presences-classes'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    student_id: student.id,
                    class_instance_id: instanceClassId,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar dados de presença');
            }

        }
        reloadFunction()
    };

    return (
        <div>
            <button onClick={handleMarkAllPresent} className='rounded-3xl bg-white shadow-shadow-10 border hover:bg-gray-1 border-gray-1 mr-3 px-4 py-1'>Marcar todos</button>
        </div>
    );
};

export default AllPresenceButton;
