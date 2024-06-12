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

const DropdownCreateMember = () => {
    const [itemSelected, setItemSelected] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleClick = async (value: string) => {
        navigate(`/new/${value}`);
    };

    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className='flex gap-3 items-center rounded-3xl shadow-shadow-10 px-8 py-1 w-[220px] outline-none cursor-pointer'>
                Cadastrar membro
                <div className='mt-1'>
                    {isOpen ? <ArrowUp fill={'#686868'} width={12} height={12} /> : <ArrowDown fill={'#686868'} width={12} height={12} />}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-shadow-10 cursor-default" >
                <div>
                    <DropdownMenuLabel>Cadastrar: </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div>
                        <DropdownMenuRadioGroup value={itemSelected} onValueChange={(value) => { setItemSelected(value); handleClick(value); }}>
                            <DropdownMenuRadioItem className='hover:bg-gray-1 cursor-pointer' value={'responsable'}>Aluno</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className='hover:bg-gray-1 cursor-pointer' value={'professor'}>Facilitador</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );

};

export default DropdownCreateMember;