import { useState, useEffect } from "react";
import * as Select from '@radix-ui/react-select';
import { useParams } from 'react-router-dom';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';


const DropdownStatus = ({data, context}) => {
  
  const dictStatus = [
    { response: true, status: 'Ativo', context: 'courses', endpoint: 'workshops', colorBG: 'bg-green-2', colorText: 'text-green-4'},
    { response: false, status: 'Inativo', context: 'courses', endpoint: 'workshops', colorBG: 'bg-red-1', colorText: 'text-red-2'},
    { response: '0', status: 'Ativo', context: 'members', endpoint: 'students', colorBG: 'bg-green-2', colorText: 'text-green-4'},
    { response:'1', status: 'Inativo', context: 'members', endpoint: 'students', colorBG: 'bg-red-1', colorText: 'text-red-2'},
    { response:'2', status: 'Evasão', context: 'members', endpoint: 'students', colorBG: 'bg-gray-2', colorText: 'text-gray-4'},
    { response:'0', status: 'Agendada', context: 'classes', endpoint: 'instance-classes', colorBG: 'bg-gray-2', colorText: 'text-gray-4'},
    { response:'1', status: 'Concluída', context: 'classes', endpoint: 'instance-classes',colorBG: 'bg-green-2', colorText: 'text-green-4'},
    { response:'2', status: 'Cancelada', context: 'classes', endpoint: 'instance-classes', colorBG: 'bg-red-1', colorText: 'text-red-2'},
    { response: '0', status: 'Inativa', context: 'schedules', endpoint: 'class-schedules', colorBG: 'bg-red-1', colorText: 'text-red-2'},
    { response: '1', status: 'Ativa', context: 'schedules', endpoint: 'class-schedules', colorBG: 'bg-green-2', colorText: 'text-green-4'},
  ]

  const translatedStatus =  dictStatus.filter(item => item.context == context);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  useEffect(() => {
    const currentStatus = translatedStatus.find(item => item.response == data.status);
    if (currentStatus) {
      setSelectedStatus(currentStatus);
    }
  }, [data, translatedStatus]);

  useEffect(() => {
    const currentStatus = translatedStatus.find(item => item.response == selectedStatus.response);
    if (currentStatus) {
      setSelectedStatus(currentStatus);
    }
  }, [selectedStatus.response, translatedStatus]);
  
  const { id } = useParams();
  const atualID = parseInt(id);

  const handleSelect = async (value) => {
    setSelectedStatus(value);
    try {
      const response = await fetch(`http://localhost:3000/api/${selectedStatus.endpoint}/${selectedStatus.context == 'members' || 'schedules' ? data.id : atualID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: value }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log('Requisição PUT realizada com sucesso');
      }
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }

    const newStatus = translatedStatus.find(item => item.response == value);
  
  
    if (newStatus) {
      setSelectedStatus(newStatus);
    }
  }

  return (
    <Select.Root onValueChange={handleSelect} onOpenChange={setIsOpen}>
      <Select.Trigger className={`flex justify-evenly w-[120px] h-[25px] border-transparent rounded-3xl ${selectedStatus.colorBG} ${selectedStatus.colorText}`}>
        <Select.Value placeholder={selectedStatus.status || "Status"} />
        <Select.Icon asChild className="self-center">
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="flex w-[120px] bg-white shadow-shadow-10 mt-2 rounded-lg px-[4px] border border-gray-1">
        {translatedStatus.map(item => (
          <Select.Item value={item.response} className={`flex h-[25px] w-[100%] my-1 outline-none rounded-lg focus:bg-gray-1 cursor-pointer`}>
            <div className="flex items-center">
              <div className={`mt-1 mr-2 ml-3 w-[6px] h-[6px] rounded-full ${item.colorBG}`}></div>
              <Select.ItemText>
                {item.status}
              </Select.ItemText>
            </div>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )  
}

export default DropdownStatus;