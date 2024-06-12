import React, { useState } from "react";
import NavBar from "@/components/navBar";
import Avatar from "@/components/avatar";
import SearchBar from "@/components/searchBar";
import OngTableList from "../components/OngTableList";
import DashCardGF from "../components/DashCardGF"
import downloadIcon from "../assets/download.svg"

export default function DashGF() {

    return (
        <div>
            <header>
                <NavBar name={'Nome'} role={'líder'} avatar={<Avatar defaultImage="" profileImage={'imagem'} widthImage={'30px'} heightImage={'30px'} />} />
            </header>
            <main className="flex px-24 pt-14 pb-8 h-full gap-14">
                <section className="mt-8 flex flex-col bg-white shadow-shadow-10 h-[470px] w-[50%] rounded-[20px] p-6 items-center gap-4">
                    <div className="flex gap-36">
                        <p className="text-[24px] font-medium">ONGs</p>
                        <SearchBar width={'200px'} />
                    </div>
                    <div className="w-[90%] mt-2 max-h-[350px] overflow-y-scroll">
                        <OngTableList data={''} />
                    </div>
                </section>

                <section className="mt-8 w-[50%]">
                    <span className="flex justify-between">
                        <div className="flex bg-white rounded-2xl w-[75%] justify-center py-2 shadow-shadow-10">
                            <p className="text-[18px] font-medium">Gerando Falcões</p>
                        </div>
                        <button className="flex bg-white rounded-2xl w-[20%] justify-evenly py-2 shadow-shadow-10 items-center">
                            <img src={downloadIcon} alt="Ícone de download" className="w-[20px] h-[20px]" />
                            <p className="text-[18px] font-medium">Baixar</p>
                        </button>
                    </span>
                    <div className="flex flex-wrap w-[100%] max-h-[400px] justify-between">
                        <DashCardGF type={'ONGs'} />
                        <DashCardGF type={'Favelas'} />
                        <DashCardGF type={'Colaboradores'} />
                        <DashCardGF type={'Evasão'} />
                        <DashCardGF type={'Atendimentos'} />
                        <DashCardGF type={'Atendidos'} />
                        <DashCardGF type={'Atendidos por Vaga'} />
                        <DashCardGF type={'Atendidos matriculados'} />
                    </div>
                </section>
            </main>
        </div>
    );
};
