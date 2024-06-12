import React, { useEffect, useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import ExitButton from "./exitButton";
import CreationButton from "./creationButton";
import ClassCard from "./ClassCard";
import GroupIcon from "../assets/turma.svg"
import SwitchFilter from "./SwitchFilter";

interface Props {
    workshopId: number
}

interface Workshop {
    id: number
    local: string
    name: string
    status: boolean
    category: number
    ong_id: number
}

interface Schedule {
    id: number
    workshop_id: number
    day_of_week: string[]
    start_time: string
    end_time: string
    status: number
    frequency: number
}

const ClassModal: React.FC<Props> = ({workshopId}) => {

    const [classSchedules, setClassSchedules] = useState<Schedule[]>([])
    const [name, setName] = useState<string>("")
    const [filteredClassSchedules, setFilteredClasSchedules] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://localhost:3000/api/class-schedules';
            let response = await fetch(url);
            let data = await response.json();
            let filteredSchedules = data.filter(schedule => schedule.workshop_id === workshopId);
            setClassSchedules(filteredSchedules);
            return data;
        };
        fetchData();
    }, [workshopId]);    

    const fetchName = async () => {
        const url = 'http://localhost:3000/api/workshops'

        let response = await fetch(url)
        let data: Workshop[] = await response.json()
        let workshop = data.find(workshop => workshop.id == workshopId)!
        setName(workshop.name)
        return workshop.name
    }

    useEffect(() => {
        fetchName();
    }, []);

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <button className="flex border border-gray-4 text-gray-4 text-[14px] rounded-2xl px-6 gap-2">
                    <img src={GroupIcon} alt="" className="w-[16px] h-[16px] self-center" />
                    Turma
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-3xl">
                <AlertDialogHeader>
                    <div className="border border-gray-400 rounded-2xl pb-2">
                        <div className="flex flex-row justify-end w-[98%]">
                            <AlertDialogCancel className="w-[10px] hover:bg-transparent border-transparent mb-4"> <ExitButton /> </AlertDialogCancel>
                        </div>
                        <div className="flex justify-between mr-8 ml-8">
                            <AlertDialogTitle className="text-[24px]">Turmas</AlertDialogTitle>
                            <div className="flex gap-2 justify-end ml-auto w-40 mr-8">
                                <CreationButton name="Cadastrar turma" route="/cadastrar-turma" />
                            </div>
                        </div>
                        <div>
                            <p className="text-[18px] text-gray-300 ml-8">{name}</p>
                        </div>
                        <div className="flex justify-end mr-16 my-4">
                            <SwitchFilter data={classSchedules} onFilterChange={setFilteredClasSchedules}/>
                        </div>
                        <AlertDialogDescription className="flex flex-col items-center">
                            <div className="flex flex-col gap-2 w-[90%] max-h-[250px] overflow-y-scroll">
                                {filteredClassSchedules.length != 0 ? filteredClassSchedules.map(schedule => <ClassCard schedule={schedule} />) : <p className="my-20  text-[20px] self-center">Nenhuma turma foi registrada ainda!</p> }
                            </div>
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ClassModal;