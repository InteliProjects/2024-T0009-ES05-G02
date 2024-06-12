import React, { useEffect, useState } from 'react';
import ArrowUp from './arrowUp';
import ArrowDown from './arrowDown';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ClassDropdown = ({ courseData, student }) => {

    const [classNumber, setClassNumber] = useState<string>('Sem turma');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [position, setPosition] = useState('')

    let allClasses: string[] = [];
    if (Array.isArray(courseData.classSchedules)) {
        allClasses = [...courseData.classSchedules.map(item => item.id)];
    }

    const getDisplayName = (item: string): string => {
        console.log('Turma', item)
        return `Turma ${item}`;
    }

    useEffect(() => {
        async function fetchStudentClass() {
            const response = await fetch('http://localhost:3000/api/student-classes');
            const data = await response.json();
    
            const studentClass = data.find(item => item.student_id == student);
    
            if (!studentClass) {
                return;
            }
    
            const classResponse = await fetch(`http://localhost:3000/api/student-classes/${studentClass.id}`);
            const classData = await classResponse.json();
    
            setClassNumber(`Turma ${classData.class_schedule_id}`);
        }
    
        fetchStudentClass();
    }, [student]);    

    useEffect(() => {

        async function updateStudentClass() {
            // Buscar todas as ocorrências em student-classes
            const response = await fetch('http://localhost:3000/api/student-classes');
            const data = await response.json();

            const classScheduleIds = courseData.classSchedules.map(schedule => schedule.id);
            const filteredData = data.filter(item => classScheduleIds.includes(item.class_schedule_id));

            const studentClass = filteredData.find(item => item.student_id == student);

            if (!studentClass) {
                return;
            }

            try {
                const putResponse = await fetch(`http://localhost:3000/api/student-classes/${studentClass.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        student_id: student,
                        class_schedule_id: position,
                    }),
                });
                if (!putResponse.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                }
            } catch (error) {
            }
        }
        updateStudentClass();
    },[position]);

    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger>
                <button className="flex items-center justify-evenly rounded-2xl font-normal bg-gray-2 text-gray-4 w-[100px]" onClick={() => setIsOpen(!isOpen)}>
                    {classNumber}
                    <div className='mt-[2px]'>
                        {isOpen ? <ArrowUp fill={'#686868'} width={12} height={12} /> : <ArrowDown fill={'#686868'} width={12} height={12} />}
                    </div>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white shadow-shadow-10 w-12">
                <DropdownMenuLabel>Turmas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={(value) => { setPosition(value); setClassNumber(getDisplayName(value)); }}>
                    {Array.isArray(allClasses) && allClasses.map((item) => (
                        <DropdownMenuRadioItem className='hover:bg-gray-1' value={item}>{getDisplayName(item)}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ClassDropdown
