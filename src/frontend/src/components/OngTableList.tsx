import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from "react-router-dom";
import { useState } from "react";
import DropdownStatus from "./DropdownStatus";
import { format, parseISO } from 'date-fns';
import StatusIndicator from "./StatusIndicator";

interface ongTableListProps {
    data: any;
}

const ongTableList: React.FC<ongTableListProps> = ({ data }) => {

    return (
        <Table>
            <TableCaption>Essas são todas as ONGs registradas!</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nome</TableHead>
                    <TableHead className="text-right">Fundação</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Teto</TableCell>
                    <TableCell className="text-right">20/06/2004</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Teto</TableCell>
                    <TableCell className="text-right">20/06/2004</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Teto</TableCell>
                    <TableCell className="text-right">20/06/2004</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Teto</TableCell>
                    <TableCell className="text-right">20/06/2004</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Teto</TableCell>
                    <TableCell className="text-right">20/06/2004</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Teto</TableCell>
                    <TableCell className="text-right">20/06/2004</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Teto</TableCell>
                    <TableCell className="text-right">20/06/2004</TableCell>
                </TableRow>

            </TableBody>
        </Table>
    )
}

export default ongTableList;
