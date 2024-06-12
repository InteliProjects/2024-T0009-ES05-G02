import React, { useEffect, useState } from 'react';
import ArrowUp from './arrowUp';
import ArrowDown from './arrowDown';
import Calendar from 'react-calendar';
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
import { useParams } from 'react-router-dom';
import { constants } from 'buffer';
import ResponsibleModal from './ResponsibleModal';
import { notify } from '../components/ui/toast.tsx';
import { notifyError } from './ui/toastError.tsx';
import { ToastContainer } from 'react-toastify';

const InformationDropdown = ({ type }) => {
    const [settedName, setSettedName] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [position, setPosition] = useState("Professor");
    const [allClasses, setAllClasses] = useState([]);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [idProfessor, setIdProfessor] = useState();
    const [idClassInstance, setIdClassInstance] = useState();
    const [isProfessorNull, setIsProfessorNull] =  useState();
    const [itemSelected, setItemSelected] = useState();
    const [nameProfessor, setNameProfessor] = useState();
    const [nameUpdate, setNameUpdate] = useState();
    const [idValue, setIdValue] = useState();
    const [hasFetchedID, setHasFetchedID] = useState(false);
    const [pass, setPass] = useState(false);

    const onDateChange = (data) => {
        const dateString = data.toLocaleDateString('pt-BR');
        setData(dateString);
        fetch(`http://localhost:3000/api/instance-classes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: dateString }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data updated successfully:', data);
            notify('Data atualizada com sucesso!')
            setData(dateString);
        })
        .catch(error => {
            notifyError('Ops! Algo deu errado.')
            console.error('Error updating date:', error);
        });
    };

    useEffect(() => {
        const fetchGet = async () => {
            try {
                // Fetch para obter dados da instância da classe
                const responseClassInstances = await fetch(`http://localhost:3000/api/professor-class-instances`);
                if (!responseClassInstances.ok) {
                    throw new Error('Erro ao buscar dados da instância da classe');
                }
                const dataClassInstances = await responseClassInstances.json();
                const filteredObject = dataClassInstances.find(obj => obj.class_instance_id == id);
                console.log("Obejto filtrado ", filteredObject)
                if (filteredObject) {
                    const idprof = filteredObject.professor_id;
                    console.log("id :", idprof)
                    // setIdProfessor(idprof);

                    const responseProfessor = await fetch(`http://localhost:3000/api/professors/${idprof}`);
                    const dataProfessor = await responseProfessor.json();

                    console.log(dataProfessor.name)
                    setNameProfessor(dataProfessor.name)
                    setItemSelected(nameProfessor);
                    setPosition(dataProfessor.name);
                    setIdClassInstance(filteredObject.class_instance_id);
                    setIsProfessorNull(false);
                    setIdProfessor(idprof)

                } else {

                    setIsProfessorNull(true);
                    setItemSelected("Selecione o facilitador");
                    setPosition("Selecione o facilitador");
                    console.log('Nenhum professor encontrado para esta instância da classe.');
                }
                setHasFetchedID(true); // Sinaliza que fetchID terminou
    
                // Fetch para obter todos os professores
                const responseProfessors = await fetch('http://localhost:3000/api/professors');
                const dataProfessors = await responseProfessors.json();
                setAllClasses(dataProfessors);
    
                // Chama fetchName após fetchData ser concluída
                // await fetchName();
    
            } catch (error) {
                notifyError('Ops! Algo deu errado.')
                console.error('Erro ao buscar dados:', error);
            }
        };
    
        fetchGet();    
    }, []);
    
    
    const fetchCalendar = () => {
        return fetch(`http://localhost:3000/api/instance-classes/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const dataa = data.date;
                if (dataa === undefined) {
                    return 'Selecione a data';
                } else {
                    const dataFormatada = new Date(data.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                    return dataFormatada;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados de instance-classes:', error);
                notifyError('Ops! Algo deu errado.')
                throw error; // Propaga o erro para o chamador
            });
    };

    fetchCalendar()
        .then(data => {
            setData(data); 
        })
        .catch(error => {
            console.error('Erro ao buscar dados de instance-classes:', error);
            notifyError('Ops! Algo deu errado.')
            throw error; 
        });  

    const handleSelect = (value) => {
        const selectedClass = allClasses.find(item => item.id === value);
        setPosition(selectedClass.name);
        setIdValue(selectedClass.id);
        console.log("select name ", selectedClass.name)
        console.log("select id ", selectedClass.id)
        setPass(true);

    };
    
    //Função do POST PROFESSOR
    useEffect(() => {
        if(pass == true)
            if (isProfessorNull) {
                console.log("featch post");
                console.log(idProfessor)
                console.log(idClassInstance)
                console.log("value post:", idValue)
                fetch(`http://localhost:3000/api/professor-class-instances`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        professor_id: idValue,
                        class_instance_id: id
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao enviar requisição de POST PROFESSOR.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Requisição POST PROFESSOR bem-sucedida:', data);
                    notify('Professor adicionado com sucesso!')
                    setPass(false)
                })
                .catch(error => {
                    notifyError('Ops! Algo deu errado.')
                    console.error('Erro durante a requisição POST PROFESSOR:', error);
                });
            }
            else {
                //put
                console.log("suposto nome ",position)
                fetch(`http://localhost:3000/api/professors/${idProfessor}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: position })
                    
                })
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Erro ao enviar requisição PUT PROFESSOR.');
                    }
                    return response.json();
                  })
                  .then(data => {
                    console.log("posiçãoo ", nameProfessor)
                    setItemSelected(position);
                    setPass(false)
                    notify('Professor atualizado com sucesso!')
                    console.log('Requisição PUT PROFESSOR bem-sucedida:', data);
                  })
                  .catch(error => {
                    notifyError('Ops! Algo deu errado.')
                    console.error('Erro durante a requisição PUT PROFESSOR:', error);
                  });
            }
    }, [position]); 


    if (type !== 'calendar') {
        return (
            <DropdownMenu onOpenChange={setIsOpen}>
                <DropdownMenuTrigger>
                    <div className="flex items-center border border-gray-3 rounded-full px-3 w-[100%] h-[33px]" onClick={() => setIsOpen(!isOpen)}>
                        <p className='font-semibold text-[14px] w-[40%] text-start'>Facilitador:</p>
                        <p className='text-[14px] text-center w-[60%] cursor-default overflow-hidden text-ellipsis whitespace-nowrap'>{position}</p>
                        <div className=''>
                            {isOpen ? <ArrowUp fill={'#686868'} width={12} height={12} /> : <ArrowDown fill={'#686868'} width={12} height={12} />}
                        </div>
                    </div>
                </DropdownMenuTrigger>
   
                <DropdownMenuContent className="bg-white shadow-shadow-10">
                    <div className='w-[430px] max-h-[120px] overflow-y-scroll overflow-x-hidden'>
                        <DropdownMenuLabel>Turmas</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={idValue} onValueChange={handleSelect}>
                            {allClasses.map((item, index) => (
                                <DropdownMenuRadioItem key={index} className='hover:bg-gray-1' value={item.id}>{item.name}</DropdownMenuRadioItem> 
                            ))}
                        </DropdownMenuRadioGroup>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    } else {
        return (
            <DropdownMenu onOpenChange={setIsOpen}>
                <DropdownMenuTrigger>
                    <div className="flex items-center border border-gray-3 rounded-full px-3 w-[100%] h-[33px]" onClick={() => setIsOpen(!isOpen)}>
                        <p className='font-semibold text-[14px] w-[40%] text-start'>Data:</p>
                        <p className='text-[14px] text-center w-[60%] cursor-default overflow-hidden text-ellipsis whitespace-nowrap'>{data}</p>
                        <div className=''>
                            {isOpen ? <ArrowUp fill={'#686868'} width={12} height={12} /> : <ArrowDown fill={'#686868'} width={12} height={12} />}
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <div className="bg-white shadow-shadow-10 w-[100%]">
                        <Calendar onChange={onDateChange}/>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
    
};

export default InformationDropdown;
