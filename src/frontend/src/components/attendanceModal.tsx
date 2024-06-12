import React, { useEffect, useState } from "react";
import presencaIcon from "../assets/presenca.svg";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AttendanceButton from "./attendanceButton";
import ExitButton from "./exitButton";
import SearchBar from "./searchBar";
import AllPresenceButton from "./allPresenceButton"


interface AttendanceModalProps {
    idClass: number|null
}

const AttendanceModal: React.FC<AttendanceModalProps>= ({idClass}) => {

    interface Student {
        name: string
        id: number
        instanceClassId: number
        
    }
    const [students, setStudents] = useState<Student[]>([]);

    async function fetchStudents() {
        try {
            const url = 'http://localhost:3000/api/students'

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao obter os nomes dos alunos');
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    interface studentPresenceClass {
        class_instance_id: number,
        student_id: number
        id: number
        
    }

    const [studentPresenceClasses, setStudentPresenceClasses] = useState<studentPresenceClass[]>([]);


    
    async function fetchInstanceClass() {
        try {
            const url = "http://localhost:3000/api/students-presences-classes"
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao obter as instâncias das classes');
            }
            const data: studentPresenceClass[] = await response.json()
            setStudentPresenceClasses(data.filter(studentPresenceClass => studentPresenceClass.class_instance_id == idClass))
        } catch (error) {
            console.error(error);
        }

        await fetchStudents()
    }

    useEffect(() => {
        fetchInstanceClass();
    }, [idClass]);

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <button className="flex justify-center gap-4 shadow-shadow-25 rounded-3xl py-1 w-[100%]">
                    <img src={presencaIcon} className='w-[16px] h-[16px] self-center' />
                    <p>Lista de Presença</p>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="border border-gray-4 rounded-2xl pl-8 pb-8 mt-4 mx-4">
                        <div className="flex flex-row justify-end w-[98%]">
                            <AlertDialogCancel className="w-[10px] hover:bg-transparent border-transparent mb-4"> <ExitButton /> </AlertDialogCancel>
                        </div>
                        <div className="flex justify-between mr-8">
                            <AlertDialogTitle>Presença</AlertDialogTitle>
                            {/* <SearchBar category="page" /> */}
                            <AllPresenceButton studentPresenceClasses={studentPresenceClasses} students={students} reloadFunction={fetchInstanceClass} instanceClassId={idClass}/>

                        </div>
                        <div className="max-h-[350px] overflow-y-scroll mt-4 mr-8 text-ellipsis">
                            <AlertDialogDescription>
                                <Table >
                                    <TableCaption>Esses são todos os alunos da turma!</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className=' text-black'>Nome</TableHead>
                                            <TableHead className='text-center text-black'>Situação</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.map((student, index) => {
                                            const studentInstance = studentPresenceClasses.find(instance => instance.student_id === student.id);
                                            if (studentInstance === undefined) {
                                                return (
                                                    <TableRow key={student.id}>
                                                        <TableCell className="font-medium">{student.name}</TableCell>
                                                        <TableCell>
                                                            <AttendanceButton reloadFunction={fetchInstanceClass} status={false} instanceClassId={idClass} studentId={student.id} />
                                                        </TableCell>
                                                    </TableRow>
                                               )
                                            }
                                            return (
                                                <TableRow key={student.id}>
                                                    <TableCell className="font-medium">{student.name}</TableCell>
                                                    <TableCell>
                                                        <AttendanceButton reloadFunction={fetchInstanceClass} presenceId={studentInstance.id} status={true} instanceClassId={idClass} studentId={student.id} />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AttendanceModal;