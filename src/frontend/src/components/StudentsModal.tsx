import React from "react";
import turmaImage from "../assets/school.svg";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ClassDropdown from "./ClassDropdown";
import ExitButton from "./exitButton";

interface Student {
    id: number;
    name: string;
}

interface Data {
    students: Student[];
}

interface StudentsModalProps {
    data: Data;
}

const StudentsModal: React.FC<StudentsModalProps> = ({ data }) => {
    console.log("dado estudante", data)
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <button className="flex border border-gray-4 text-gray-4 text-[14px] rounded-2xl px-6 gap-2">
                    <img src={turmaImage} alt="" className="w-[16px] h-[16px] self-center" />
                    Alunos
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="border border-gray-4 rounded-2xl pl-8 pb-8 mx-4 my-4">
                        <div className="flex flex-row justify-end w-[98%]">
                            <AlertDialogCancel className="w-[10px] hover:bg-transparent border-transparent mb-4"> <ExitButton /> </AlertDialogCancel>
                        </div>
                        <div className="flex justify-between mr-8">
                            <AlertDialogTitle>Alunos</AlertDialogTitle>
                            {/* <SearchBar category="page" cards={}/> */}
                        </div>
                        <div className="max-h-[350px] overflow-y-scroll mt-4 mr-8 text-ellipsis">
                            <AlertDialogDescription>
                                <Table>
                                <TableCaption>{data && data.students && data.students.length != 0 ? "Esses são todos os alunos na oficina!" : "Nenhum aluno foi registrado nessa oficina"}</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className=' text-black'>Nome</TableHead>
                                            <TableHead className='text-black text-center'> Situação </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Array.isArray(data.students) && data.students.map((student) => (
                                            <TableRow key={student.id}>
                                                <TableCell className="font-medium">{student.name}</TableCell>
                                                <TableCell className="flex justify-center"> <ClassDropdown courseData={data} student={student.id}/>  </TableCell>
                                            </TableRow>
                                        ))}
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

export default StudentsModal;
