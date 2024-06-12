import React from "react";
import pasteIcon from "../assets/content_paste.svg"
import personIcon from "../assets/Group.svg"
import groupIcon from "../assets/content_paste.svg"
import evasionIcon from "../assets/person_remove.svg"
import workshopIcon from "../assets/piece.svg"
import attendanceIcon from "../assets/calendar.svg"

const DashCardONG = ({ type, data }) => {

    const dictType = {
        'Atendimentos': pasteIcon,
        'Colaboradores': groupIcon,
        'Atendidos': personIcon,
        'Evasão': evasionIcon,
        'Oficinas': workshopIcon,
        'Presença': attendanceIcon,
    }

    return(
        <div className="bg-white flex w-[300px] rounded-xl p-2 py-8 justify-around shadow-shadow-10">
            <img src={dictType[type]} alt={`Ícone de ${type}`} className="w-[32px] h-[32px] self-center"/>
            <div className="flex flex-col items-center">
                <p className="text-[32px]">{data}</p>
                <p className="text-[14px]">{type}</p>
            </div>
        </div>
    )
}

export default DashCardONG