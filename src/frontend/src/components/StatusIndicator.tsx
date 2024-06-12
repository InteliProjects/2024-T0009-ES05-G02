import React, { useState, useEffect } from "react";

const StatusIndicator = ({ itemStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState({});

    const dictStatus = [
        { response:'0', status: 'Agendada', context: 'classes', colorBG: 'bg-gray-2', colorText: 'text-gray-4'},
        { response:'1', status: 'Concluída', context: 'classes', colorBG: 'bg-green-2', colorText: 'text-green-4'},
        { response:'2', status: 'Cancelada', context: 'classes', colorBG: 'bg-red-1', colorText: 'text-red-2'},
    ];
    
    useEffect(() => {
        const currentStatus = dictStatus.find(item => item.response == itemStatus);
        if (currentStatus) {
            setSelectedStatus(currentStatus);
        }
      }, [itemStatus]);

    return (
        selectedStatus && (
        <div className={`rounded-3xl px-6 py-[2px] ${selectedStatus.colorBG} ${selectedStatus.colorText}`}>
            {selectedStatus.status}
        </div>
        )
    );
}

export default StatusIndicator;
