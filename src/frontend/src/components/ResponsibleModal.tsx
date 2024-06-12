import React, { useState, useEffect } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import ExitButton from "./exitButton";
import Avatar from "./avatar";
import InformationField from "./informationField";
import EditIcon from '../assets/lapis.svg'

interface Responsable {
    name: string
    email: string
    gender: number
    race: number
    birthday: string
    rg: string
    cpf: string
    telephone: string
    state: number
    city: string
    address: string
    ong_id: number
    civil_state: number
}
interface Props {
    responsable_id: number
}


const ResponsibleModal: React.FC<Props> = ({ responsable_id }) => {

    const [responsable, setResponsable] = useState<Responsable>()

    async function fetchResponsable() {
        try {
            const url = `http://localhost:3000/api/responsables/${responsable_id}`

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao obter estudantes');
            }
            const data: Responsable = await response.json();
            setResponsable(data)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchResponsable()
    }, [responsable_id]);

    const computeAge = (birthday: Date) => {

        const dataNascimentoObj = new Date(birthday);
            
        const dataAtual = new Date();
            
         let idade = dataAtual.getFullYear() - dataNascimentoObj.getFullYear();
            
        // Verifica se o aniversário já ocorreu este ano
        const mesAtual = dataAtual.getMonth();
        const diaAtual = dataAtual.getDate();
        const mesNascimento = dataNascimentoObj.getMonth();
        const diaNascimento = dataNascimentoObj.getDate();
            
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
                idade--;
        }
            
        return String(idade);
        }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <button className="flex rounded-2xl px-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mt-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                    Acessar Responsável
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="border justify-center border-gray-4 rounded-2xl pl-8 pb-4 mt-0 mx-4">
                        <div className="flex flex-row justify-end w-[98%]">
                            <AlertDialogCancel className="w-[10px] hover:bg-transparent border-transparent mb-2"> <ExitButton /> </AlertDialogCancel>
                        </div>
                        {responsable ? (
                            <div>
                                <div className="flex flex-col items-center">
                                    <Avatar defaultImage="" profileImage={''} widthImage={'80px'} heightImage={'80px'} />
                                    <AlertDialogTitle>{responsable.name}</AlertDialogTitle>
                                    <div className="text-[12px] text-gray-3">Responsável</div>
                                </div>
                                <div className="border border-gray-3 w-[90%] h-[1px] mb-4 mt-2"></div>
                                <AlertDialogDescription>
                                    <div className="flex flex-col gap-2 w-[90%] max-h-[230px] overflow-y-scroll">
                                        <InformationField paddingY="" title={'E-mail:'} value={responsable.email} />
                                        <InformationField paddingY="" title={'CPF:'} value={responsable.cpf} />
                                        <InformationField paddingY="" title={'RG:'} value={responsable.rg} />
                                        <InformationField paddingY="" title={'Cidade/Estado:'} value={responsable.city + "," + responsable.state} />
                                        <InformationField paddingY="" title={'Nascimento:'} value={responsable.birthday} />
                                        <InformationField paddingY="" title={'Celular:'} value={responsable.telephone} />
                                        <InformationField paddingY="" title={'Endereço:'} value={responsable.address} />
                                        <InformationField paddingY="" title={'Última Visita:'} value={'01/01/2002'} />
                                        <InformationField paddingY="" title={'Idade:'} value={computeAge(new Date(responsable.birthday)) + " anos"} />
                                        <InformationField paddingY="" title={'Raça:'} value={String(responsable.race)} />
                                        <InformationField paddingY="" title={'Gênero:'} value={String(responsable.gender)} />
                                        <InformationField paddingY="" title={'Estado Civil:'} value={String(responsable.civil_state)} />
                                    </div>
                                    <div className="mt-4">
                                        <button className="flex border border-gray-4 text-gray-4 text-[14px] rounded-2xl px-6 gap-2">
                                            <img src={EditIcon} alt="" className="w-[16px] h-[16px] self-center" />
                                            <p>Editar</p>
                                        </button>
                                    </div>
                                </AlertDialogDescription>
                            </div>

                        ) : <span className="flex justify-center mr-8">Aluno não tem responsável cadastrado!</span>}
                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ResponsibleModal;