import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from "react-router-dom";
import { useState } from "react";
import DropdownStatus from "./DropdownStatus";
import { format, parseISO } from 'date-fns';
import StatusIndicator from "./StatusIndicator";

interface ClassTableListProps {
    data: {
        date: string;
        id: string;
        class_schedule_id: string;
        status: string;
    }[];
    filterClass: string;
    filterDate: string;
    filterStatus: string;
}

const ClassTableList: React.FC<ClassTableListProps> = ({ data, filterClass, filterDate, filterStatus }) => {
    filterStatus = filterStatus.toString();

    const filteredData = data.filter(item => {
        const parsedDate = parseISO(item.date);
        const formattedDate = format(parsedDate, 'dd/MM/yyyy');
        return (filterDate ? formattedDate == filterDate : true)
        && (filterStatus ? item.status == filterStatus :  true)
        && (filterClass ? item.class_schedule_id == filterClass : true);
    });

    return (
        <Table>
            <TableCaption>{filteredData.length != 0 ? 'Essas são todas as aulas para esta oficina!' : 'Nenhuma aula foi iniciada ainda!' }</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className='text-center text-black'>Turma</TableHead>
                    <TableHead className='text-center text-black'>Dia</TableHead>
                    <TableHead className='text-center text-black'>Horário</TableHead>
                    <TableHead className='text-center text-black'>Situação</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredData.map((item: { date: string; id: any; class_schedule_id: string; status: any; }) => {
                    const parsedDate = parseISO(item.date);
                    const formattedDate = format(parsedDate, 'dd/MM/yyyy');
                    const formattedTime = format(parsedDate, 'HH:mm');
                    return (
                        <TableRow>
                            <TableCell className="font-medium text-center underline">
                                <Link to={`/class/${item.id}`}>Turma {item.class_schedule_id}</Link>
                            </TableCell>
                            <TableCell className='text-center'>{formattedDate}</TableCell>
                            <TableCell className='text-center'>{formattedTime}</TableCell>
                            <TableCell className='flex justify-center'>
                                <StatusIndicator itemStatus={item.status} />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    )
}

export default ClassTableList;
