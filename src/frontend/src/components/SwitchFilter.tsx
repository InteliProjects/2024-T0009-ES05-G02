import React from "react";
import { useState, useEffect } from "react";

interface Props {
    data: any;
    onFilterChange: any;
}

const SwitchFilter: React.FC<Props> = ({ data, onFilterChange }) => {
    console.log('data', data)
    const [filter, setFilter] = useState("all");

    const dictStatus = {
      true: 'ativo',
      false: 'inativo',
      1: 'ativo',
      0: 'inativo',
    }

    useEffect(() => {
      const filteredCards =
        filter == "all" ? data : data.filter((card) => dictStatus[card.status] == filter);
      onFilterChange(filteredCards);
    }, [filter, data, onFilterChange]);

    return (
      <div className="flex gap-4 w-[40%]">
        <button className={`rounded-2xl w-[100%] text-center opacity-70 ${filter == 'all' ? 'border-2 border-[#00B094] text-[#00B094]' : 'border border-gray-4 '}`} onClick={() => setFilter('all')}>Todas</button>
        <button className={`rounded-2xl w-[100%] text-center opacity-70 ${filter == 'ativo' ? 'border-2 border-[#00B094] text-[#00B094]' : 'border border-gray-4 '}`} onClick={() => setFilter('ativo')}>Ativas</button>
        <button className={`rounded-2xl w-[100%] text-center opacity-70 ${filter == 'inativo' ? 'border-2 border-[#00B094] text-[#00B094]' : 'border border-gray-4 '}`} onClick={() => setFilter('inativo')}>Inativas</button>
      </div>
    );
};  

export default SwitchFilter;