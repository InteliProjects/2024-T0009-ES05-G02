import React from "react";
import pasteIcon from "../assets/content_paste.svg"
import personIcon from "../assets/Group.svg"
import groupIcon from "../assets/content_paste.svg"
import homeIcon from "../assets/home.svg"
import attendIcon from "../assets/how_to_reg.svg"
import evasionIcon from "../assets/person_remove.svg"
import placeIcon from "../assets/place.svg"
import workIcon from "../assets/work.svg" 

const DashCardGF = ({ type }) => {

    const dictType = {
        'Atendimentos': pasteIcon,
        'ONGs': homeIcon,
        'Favelas': placeIcon,
        'Colaboradores': groupIcon,
        'Atendidos': personIcon,
        'Evasão': evasionIcon,
        'Atendidos por Vaga': workIcon,
        'Atendidos matriculados': attendIcon,
    }

    return(
        <div className="bg-white flex w-[250px] rounded-xl p-2 mt-5 justify-around shadow-shadow-10">
            <img src={dictType[type]} alt={`Ícone de ${type}`} className="w-[32px] h-[32px] self-center"/>
            <div className="flex flex-col items-center">
                <p className="text-[32px]">234</p>
                <p className="text-[14px]">{type}</p>
            </div>
        </div>
    )
}

export default DashCardGF