import React from "react";
import { useState, useEffect } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ExitButton from "./exitButton";
import ArrowDown from "@/components/arrowDown";
import StatusDropdown from "@/components/statusDropdown";
import StatusIndicator from "./StatusIndicator";

const arrowColor = '#686868';

interface Student {
    id: number
    name: string
    email: string
    gender: number
    race: number
    birthday: string
    rg: string
    cpf: string
    telephone: string
    state: number
    city: string
    address: string
    ong_id: number
    civil_state: number
    status: number
    responsable_id: number
    type: "Aluno"
}

interface Professor {
    id: number
    name: string
    gender: number
    civil_state: number
    race: number
    birthday: string
    rg: string
    cpf: string
    telephone: string
    state: number
    city: string
    address: string
    ong_id: number
    user_id: number
    type: "Professor"
}

type Member = Student | Professor

interface HistoricalModalProps {
    member: Member
}

interface StudentClass {
    id: number
    student_id: number
    class_schedule_id: number
}

interface ClassSchedule {
    id: number
}

interface ClassInstance {
    id: number
    class_schedule_id: number
    date: string
}

interface Historical {
    id: number
    class_schedule_id: number
    date: string
    present: boolean
}

interface StudentsPresences {
    student_id: number
    class_instance_id: number
}



const HistoricalModal: React.FC<HistoricalModalProps> = ({ member }) => {

    const [historical, setHistorical] = useState<Historical[]>([])

    const fetchHistorical = async (studentId: number) => {
        const urlStudentClasses = "http://localhost:3000/api/student-classes"
        const urlClassSchedules = "http://localhost:3000/api/class-schedules"
        const urlClassInstances = "http://localhost:3000/api/instance-classes"
        const urlStudentsPresences = "http://localhost:3000/api/students-presences-classes"

        const responseStudentClasses = await fetch(urlStudentClasses);
        const studentClasses: StudentClass[] = await responseStudentClasses.json();
        const filteredStudentClasses = studentClasses.filter(studentClass => studentClass.student_id == studentId)
        const filteredClassSchedulesId = filteredStudentClasses.map(filteredStudentClass => filteredStudentClass.class_schedule_id)

        const responseClassSchedules = await fetch(urlClassSchedules);
        const classSchedules: ClassSchedule[] = await responseClassSchedules.json();
        const filteredClassSchedules = classSchedules.filter(classSchedule => filteredClassSchedulesId.includes(classSchedule.id))

        const responseClassInstances = await fetch(urlClassInstances);
        const classInstances: ClassInstance[] = await responseClassInstances.json();
        const filteredClassInstances = classInstances.filter(classInstance => filteredClassSchedulesId.includes(classInstance.class_schedule_id))


        const responseStudentsPresences = await fetch(urlStudentsPresences);
        const studentsPresences: StudentsPresences[] = await responseStudentsPresences.json();
        const studentHistorical = filteredClassInstances.map(filteredClassInstance => (
            {
                ...filteredClassInstance,
                present: studentsPresences.map(studentPresence => studentPresence.class_instance_id).includes(filteredClassInstance.id)
            }))
        console.log(studentsPresences, "Presença")
        setHistorical(studentHistorical)
    }

    useEffect(() => {
        fetchHistorical(member.id);
    }, [member]);

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <button className="flex border border-gray-4 text-gray-4 text-[14px] rounded-2xl px-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-4 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                    </svg>
                    Histórico
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="border border-gray-4 rounded-2xl pb-2">
                        <div className="flex flex-row justify-end w-[98%]">
                            <AlertDialogCancel className="w-[10px] hover:bg-transparent border-transparent mb-4"> <ExitButton /> </AlertDialogCancel>
                        </div>
                        <div className="flex justify-between mr-8 ml-8">
                            <AlertDialogTitle>Histórico</AlertDialogTitle>
                            {/* <SearchBar category="page" cards={}/> */}
                        </div>
                        <div>
                            <p className="text-[12px] text-gray-3 ml-8">{member.name}</p>
                        </div>
                        <div className="flex gap-2 justify-end w-[90%]">
                            <button className="flex border border-gray-4 text-gray-4 text-[14px] rounded-2xl px-2 gap-2">
                                <p>Status</p>
                                <div className=' scale-75'>
                                    <ArrowDown fill={arrowColor} />
                                </div>
                            </button>
                            <button className="flex border border-gray-4 text-gray-4 text-[14px] rounded-2xl px-3 gap-2">
                                <p>Cargo</p>
                                <div className='flex justify-item-center scale-75'>
                                    <ArrowDown fill={arrowColor} />
                                </div>
                            </button>
                            <button className="flex border border-gray-4 text-gray-4 text-[14px] rounded-2xl px-3 gap-2">
                                <p>Oficina</p>
                                <div className=' scale-75'>
                                    <ArrowDown fill={arrowColor} />
                                </div>
                            </button>
                        </div>
                        <div className="max-h-[350px] overflow-y-scroll mt-4 mr-4 text-ellipsis justify-self-center">
                            <AlertDialogDescription>
                                <Table>
                                    <TableCaption>Esses são todos os registros desse aluno!</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className=' text-black'>Oficina</TableHead>
                                            <TableHead className=' text-black'>Turma</TableHead>
                                            <TableHead className=' text-black'>Data</TableHead>
                                            <TableHead className='text-black'> Situação </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {historical.map((classInstance) => (
                                            <TableRow>
                                                <TableCell className="font-medium">Pintura</TableCell>
                                                <TableCell className="font-medium"> Turma {classInstance.class_schedule_id}</TableCell>
                                                <TableCell className="font-medium">{classInstance.date}</TableCell>
                                                <TableCell className='flex justify-center'>{classInstance.present ? "Presente" : "Ausente"}</TableCell>
                                            </TableRow>))}
                                    </TableBody>
                                </Table>
                            </AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default HistoricalModal;