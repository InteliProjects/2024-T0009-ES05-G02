import React, { useEffect, useState } from 'react';
import ArrowUp from './arrowUp';
import ArrowDown from './arrowDown';
import 'react-datepicker/dist/react-datepicker.css';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

const DropdownStartClass = ({ data }: { data: any }) => {
    const [itemSelected, setItemSelected] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const postData = async (id: string) => {
        const response = await fetch('http://localhost:3000/api/instance-classes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                class_schedule_id: id,
                date: new Date().toISOString(),
                status: 0,
                observation: '',
            }),
        });

        if (!response.ok) {
            console.error('Failed to post data:', response);
        } else {
        }
    };

    const getLastId = async (id:string) => {
        const response = await fetch('http://localhost:3000/api/instance-classes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to get data:', response);
            return;
        }

        const dataResponse = await response.json();


        const filteredData = dataResponse.filter((item: { class_schedule_id: string; }) => item.class_schedule_id == id);


        if (filteredData.length > 0) {
            const lastId = filteredData[filteredData.length - 1].id;
            return lastId;
        } 

        else {
            console.error('No matching data found');
            return;
        }
    };

    const handleClick = async (id: string) => {
        await postData(id);
        const lastId = await getLastId(id);
        navigate(`/class/${lastId}`);
    };

    const turmas = data['classSchedules']

    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className='flex gap-3 items-center rounded-3xl shadow-shadow-10 px-8 py-1 outline-none cursor-pointer'>
                Iniciar aula
                <div className='mt-1'>
                    {isOpen ? <ArrowUp fill={'#686868'} width={12} height={12} /> : <ArrowDown fill={'#686868'} width={12} height={12} />}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-shadow-10 cursor-default" >
                <div className='max-h-[120px] overflow-y-scroll overflow-x-hidden' >
                    <DropdownMenuLabel>Qual turma vai ter aula? </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {Array.isArray(turmas) && turmas.map((item) => (
                        <div>
                            <DropdownMenuRadioGroup value={itemSelected} onValueChange={(value) => { setItemSelected(value); handleClick(value); }}>
                                <DropdownMenuRadioItem className='hover:bg-gray-1 cursor-pointer' value={item.id}>{"Turma " + item.id}</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </div>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );

};

export default DropdownStartClass;