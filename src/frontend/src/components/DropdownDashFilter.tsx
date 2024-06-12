import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DropdownDashFilterProps {
    type: string;
    data: any[];
    onFilterChange: (value: string) => void;
    verify: (value: boolean) => void;
}

const DropdownDashFilter: React.FC<DropdownDashFilterProps> = ({ type, data, onFilterChange, verify }) => {
    const [filterValues, setFilterValues] = useState<{ id: string, name: string }[]>([]);
    const [selectedItem, setSelectedItem] = useState<{ id: string, name: string } | null>(null);

    useEffect(() => {
        if (Array.isArray(data)) {
            const filterValues = data.map(item => ({ id: item.id, name: item.name }));
            setFilterValues(filterValues);
        }
    }, [data])

    const handleValueChange = (value: string) => {
        const selectedItem = filterValues.find(item => item.id === value);
        setSelectedItem(selectedItem);
        onFilterChange(value || '');
        verify(value !== null);
    }

    const renderSelectValue = () => {
        if (!selectedItem) return `Selecione uma ${type}`;
        return type === 'oficina' ? selectedItem.name : 'Turma ' + selectedItem.id;
    }

    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px] shadow-shadow-20 rounded-2xl py-2 mr-2" value={selectedItem?.id}>
                <SelectValue placeholder={`Selecione uma ${type}`}>{renderSelectValue()}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={null}>Sem filtro</SelectItem>
                {filterValues.map((value) => (
                    <SelectItem key={value.id} value={value.id}>
                        {type === 'turma' ? 'Turma ' + value.id : value.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default DropdownDashFilter;
