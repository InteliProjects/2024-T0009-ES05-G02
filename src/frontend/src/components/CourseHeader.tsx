import React from "react";
import artsIcon from '../assets/artsIcon.svg';
import sportsIcon from '../assets/sportsIcon.svg';
import musicIcon from '../assets/musicIcon.svg'
import techIcon from '../assets/techIcon.svg'

interface CourseHeader {
    data: {
        name: string;
        category: string;
    }
}

const CourseHeader: React.FC<CourseHeader> = ({data}) => {

    const workshopHeaders = [
        {id: '0', category: "Artes", color: "bg-[#00B094]", image: artsIcon},
        {id: '1', category: "Esporte", color: "bg-[#F5821E]", image: sportsIcon},
        {id: '2', category: "Dança", color: "bg-[#63236F]", image: musicIcon},
        {id: '3', category: "Música", color: "bg-[#EB1C68]", image: musicIcon},
        {id: '4', category: "Tecnologia", color: "bg-[#FABE28]", image: techIcon},
    ];

    const currentCategory = workshopHeaders.find(item => item.id == data.category);

    return (
        <div className="w-[90%]">
            <div className="flex flex-row items-center align-middle justify-start gap-4">
                <div className={`flex flex-row ${currentCategory?.color} w-[50px] h-[50px] rounded-xl items-center justify-center`}>
                    <img src={currentCategory?.image} alt="" className="h-[32px] w-[32px]" />
                </div>
                <div className="flex w-[80%] h-[10px] items-center">
                    <p className="text-[28px] font-medium overflow-hidden text-ellipsis whitespace-nowrap">{data.name}</p>
                </div>
            </div>
        </div>
    );
};

export default CourseHeader;
