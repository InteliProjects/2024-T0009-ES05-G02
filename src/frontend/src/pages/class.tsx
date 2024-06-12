import React, { useState, useEffect } from 'react';
import NavBar from "../components/navBar.tsx";
import Avatar from "../components/avatar.tsx";
import InformationField from "../components/informationField.tsx";
import Card from "../components/card.tsx";
import addIcon from "../assets/add.svg";
import { Link } from "react-router-dom";
import AttendanceModal from "../components/attendanceModal.tsx";
import InformationDropdown from "../components/InformationDropdown.tsx";
import { useParams } from 'react-router-dom';
import TextInput from '@/components/textInput.tsx';
import DropdownStatus from '@/components/DropdownStatus.tsx';
import { notify } from '../components/ui/toast.tsx';
import { ToastContainer } from 'react-toastify';


export default function Class() {

    const [classStartTime, setClassStartTime] = useState('');
    const [classId, setClassId] = useState(null);
    const [idClasses, setIdClasses] = useState(null);
    const [totalAlunos, setTotalAlunos] = useState(null); 
    const [workshop, setWorkshop] = useState(null);
    const { id } = useParams();
    const [salvo, setSalvo] = useState(false);
    const [instanceClassData, setinstanceClassData] = useState([]);
   
    const fetchTotalStudents = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/instance-classes/${id}`);
            const data = await response.json();
            const class_schedule_id = data.class_schedule_id;
            const totalResponse = await fetch(`http://localhost:3000/api/student-classes`);
            const totalData = await totalResponse.json();
            const filteredData = totalData.filter(item => item.class_schedule_id === class_schedule_id);
            console.log("alunos: ",filteredData);
            const total = filteredData.length;
            
            return total;
        } catch (error) {
            console.error('Erro ao buscar o total de alunos', error);
            throw error;
        }
    };
    fetchTotalStudents();

    useEffect(() => {
        const urlParts = window.location.href.split('/');
        const idFromUrl = parseInt(urlParts[urlParts.length - 1], 10);
        setClassId(idFromUrl);
        fetch('http://localhost:3000/api/instance-classes')
            .then(response => response.json())
            .then(data => {
                const foundClass = data.find(item => item.id === idFromUrl);
                if (foundClass) {
                    setIdClasses(foundClass.id_classes);
                }
                setinstanceClassData(foundClass);
            })
            .catch(error => console.error('Erro ao buscar ID da rota instance-classes:', error));

    }, []);

    useEffect(() => {
        const fetchClassSchedule = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/instance-classes`);
                const data = await response.json();
                const filteredObject = data.find(obj => obj.id == id);
                const idClassSchedule = filteredObject.class_schedule_id;
                const responseClass = await fetch(`http://localhost:3000/api/class-schedules/${idClassSchedule}`);
                const dataClass = await responseClass.json();
                const idWorkshop = dataClass.workshop_id;
                const responseWorkshop = await fetch(`http://localhost:3000/api/workshops/${idWorkshop}`);
                const workshopData = await responseWorkshop.json();
                const workshopName = workshopData.name;
                const nomeFormatado = `${workshopName} - Turma ${idClassSchedule}`;
                setWorkshop(nomeFormatado);
                } catch (error) {
                console.error('Erro ao buscar dados:', error);
                }
            };
            fetchClassSchedule();
            }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/instance-classes`);
                const data = await response.json();
                const filteredObject = data.find(obj => obj.id == id);
                const idClassSchedule = filteredObject.class_schedule_id;
                const responseClass = await fetch(`http://localhost:3000/api/class-schedules/${idClassSchedule}`);
                const dataClass = await responseClass.json();
                const time = dataClass.start_time;
                console.log(time)
                setClassStartTime(time);
            } catch (error) {
                setClassStartTime('Horário não encontrado');
            }
            try {
                const total = await fetchTotalStudents(id);
                setTotalAlunos(total);
            } catch (error) {
                console.error('Erro ao buscar o total de alunos:', error);
            }
        };
    
        fetchData();
    }, []);
            

    return (
        <div>
            <ToastContainer />
            <header>
                <NavBar name={'Nome'} role={'líder'} avatar={<Avatar defaultImage="" profileImage={'imagem'} widthImage={'30px'} heightImage={'30px'}/>}/>
            </header>
            <main className="flex px-28 py-12 pb-8 h-full">
                <section className=" mt-8 flex flex-col px-12 bg-white shadow-shadow-10 w-[100%] rounded-[20px] p-6">
                    <div>
                        <button className=" rounded-3xl border border-gray-3 px-4 text-[12px] text-gray-3 mb-8"><Link to='/course'>Voltar</Link></button>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-[24px]">{workshop ? workshop : "Carregando..."}</p>
                        <DropdownStatus context={'classes'} data={instanceClassData}/>
                    </div>
                    <div className="border border-gray-3 w-[100%] h-[1px] mt-4 mb-8"/>
                    <div className="flex flex-col gap-2 justify-between w-[100%]">
                        <div className="flex justify-between mb-8">
                            <div className="flex flex-col w-[49%] gap-4">
                                <InformationDropdown type={'calendar'}/>
                                <InformationField title={'Horário:'} value={classStartTime} paddingY={'py4'} />
                                <InformationField title={'Total de alunos:'} value={totalAlunos} paddingY={'py4'}/>
                            </div>
                            <div className="flex flex-col w-[49%] gap-4">
                                <InformationDropdown type={'professors'}/>
                                <InformationField title={'Frequência:'} value={'75%'} paddingY={'py4'}/>
                                <AttendanceModal idClass={classId}/>
                            </div> 
                        </div>
                    </div>
                    <div className="">
                        <TextInput />
                        <button className="flex justify-center gap-2 my-4 shadow-shadow-25 w-[16%] text-[14px] rounded-3xl py-1"><img src={addIcon} className='w-[16px] h-[16px] self-center' /> Registrar foto</button>
                        <div className='flex justify-evenly'>
                            <Card imageUrl="https://picsum.photos/200/300"/>
                            <Card imageUrl="https://picsum.photos/200/300"/>
                            <Card imageUrl="https://picsum.photos/200/300"/>
                            <Card imageUrl="https://picsum.photos/200/300"/>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
