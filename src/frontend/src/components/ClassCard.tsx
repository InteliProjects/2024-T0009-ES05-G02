import React, {useEffect, useState} from "react";
import DropdownStatus from "@/components/DropdownStatus";
import InformationField from "./informationField";
import EditIcon from "../assets/lapis.svg";

interface Schedule {
    id: number
    workshop_id: number
    day_of_week: string[]
    start_time: string
    end_time: string
    status: number
    frequency: number
}

interface Workshop {
    id: number
    local: string
    name: string
    status: boolean
    category: number
    ong_id: number
}
interface Props {
    schedule: Schedule
}

const ClassCard : React.FC<Props> = ({schedule}) => {

    const [local, setLocal] = useState<string>("")
    const [studentNumber, setStudentNumber] = useState<number>(0)

    const fetchLocal = async () => {
        const url = 'http://localhost:3000/api/workshops'
    
        let response = await fetch(url)
        let data: Workshop[] = await response.json()
        let workshop = data.find(workshop => workshop.id == schedule.workshop_id)!
        setLocal(workshop.local)
          return workshop.local;
      }

      const fetchStudentNumber = async () => {
        const url = 'http://localhost:3000/api/students-classes/students/' + schedule.id
    
        let response = await fetch(url)
        let data: any[] = await response.json()
        setStudentNumber(data.length)
          return data.length;
      }

      useEffect(() => {
        fetchLocal();
        fetchStudentNumber();
      }, [schedule]);
    

    const end_time_parts = schedule.end_time.split(":").map(Number)
    const start_time_parts = schedule.start_time.split(":").map(Number)

    const formatTime = (t_parts) => {
        let hrs = String(t_parts[0]).padStart(2, '0')
        hrs = hrs.substring(hrs.length-2)
        let min = String(t_parts[1]).padStart(2, '0')
        min = min.substring(min.length-2)

        return `${hrs}:${min}`
    }

    const duration = String(((new Date(98, 1, 1, ...end_time_parts)).getTime() - (new Date(98, 1, 1, ...start_time_parts)).getTime())/(1000*60*60)) + " horas"

    return (

        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-85 ml-2 mr-2 justify-center">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <span className="font-bold text-lg">Turma {schedule.id}</span>
                    <span className="text-gray-3 mt-1">{studentNumber} alunos</span>
                </div>
                <div className="flex justify-end">
                    <DropdownStatus context={'schedules'} data={schedule} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4 justify-end">
                <div className="w-full">
                    <InformationField paddingY="" title={'Período:'} value={'20 Abr 24 - 20 Mai 24'} />
                </div>
                <div className="w-full">
                    <InformationField paddingY="" title={'Duração:'} value={duration} />
                </div>
                <div className="w-full">
                    <InformationField paddingY="" title={'Frequência'} value={schedule.frequency + " por semana"} />
                </div>
                <div className="w-full">
                    <InformationField paddingY="" title={'Dia da semana:'} value={schedule.day_of_week.join(", ")} />
                </div>
                <div className="w-full">
                    <InformationField paddingY="" title={'Local:'} value={local} />
                </div>
                <div className="w-full">
                    <InformationField paddingY="" title={'Horário:'} value={formatTime(start_time_parts) + " horas"} />
                </div>
            </div>
            <div className="flex justify-end">
            <button className="flex border border-gray-4 text-gray-4 text-[14px] rounded-2xl px-6 gap-2 justify-end">
                <img src={EditIcon} alt="" className="w-[16px] h-[16px] self-center" />
                <p>Editar</p>
            </button>
            </div>
        </div>
    )

}

export default ClassCard