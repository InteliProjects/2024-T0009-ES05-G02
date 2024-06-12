import React, { useState, useEffect } from 'react';
import NavBar from "../components/navBar.tsx";
import Avatar from "../components/avatar.tsx";
import DashCardONG from '@/components/DashCardONG.tsx';
import downloadIcon from "../assets/download.svg"
import DropdownDashFilter from '@/components/DropdownDashFilter.tsx';

export default function DashONG() {
    
    // ONG states
    const [allOngStudents, setAllOngStudents] = useState('')
    const [allOngProfessors, setAllOngProfessors] = useState('')
    const [allOngClasses, setAllOngClasses] = useState([])
    const [allOngWorkshops, setAllOngWorkshops] = useState([])
    const [allOngSchedules, setAllOngSchedules] = useState([])
    
    // ONG unique states
    const [allOngUniqueStudents, setAllOngUniqueStudents] = useState('');
    const [allOngUniqueEvasion, setAllOngUniqueEvasion] = useState('')
    const [allOngUniqueProfessors, setAllOngUniqueProfessors] = useState('')
    
    // Filter states
    const [isFiltered, setIsFiltered] = useState(false);
    const [filterWorkshop, setFilterWorkshop] = useState('')
    // const [filterSchedule, setFilterSchedule] = useState('')

    // Workshop states
    const [workshopClasses, setWorkshopClasses] = useState([])
    const [workshopUniqueStudents, setWorkshopUniqueStudents] = useState('')
    const [workshopUniqueProfessor, setWorkshopUniqueProfessor] = useState('')
    const [workshopUniqueEvasion, setWorkshopUniqueEvasion] = useState('')

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            const urlClasses = 'http://localhost:3000/api/workshops';
            const urlStudents = 'http://localhost:3000/api/students';
            const urlStudentClasses = 'http://localhost:3000/api/student-classes';
            const urlInstanceClasses = 'http://localhost:3000/api/instance-classes';
            const urlClassSchedule = 'http://localhost:3000/api/class-schedules';
            const urlProfessors = 'http://localhost:3000/api/professor-class-instances';
    
            const responseClasses = await fetch(urlClasses);
            const dataClasses = await responseClasses.json();
    
            const responseStudents = await fetch(urlStudents);
            const dataStudents = await responseStudents.json();
    
            const responseStudentClasses = await fetch(urlStudentClasses);
            const dataStudentClasses = await responseStudentClasses.json();
    
            const responseInstanceClasses = await fetch(urlInstanceClasses);
            const dataInstanceClasses = await responseInstanceClasses.json();

            const responseClassSchedules = await fetch(urlClassSchedule);
            const dataClassSchedules = await responseClassSchedules.json();

            const responseProfessors = await fetch(urlProfessors);
            const dataProfessors = await responseProfessors.json();

            // Filter data to get only the workshops from the ONG
            const allOngWorkshops = dataClasses.filter(item => item.ong_id == 1);
            console.log('allOngWorkshops', allOngWorkshops);

            // Filter data to get only the class schedules from the ONG
            const allOngClassSchedules = dataClassSchedules.filter(item => 
                allOngWorkshops.some(workshop => workshop.id == item.workshop_id)
            );
            console.log('allOngClassSchedules', allOngClassSchedules);

            // Filter data to get only the relations between students and classes from the ONG
            const allOngStudents = dataStudentClasses.filter(item =>
                allOngClassSchedules.some(classSchedule => classSchedule.id == item.class_schedule_id)
            );
            console.log('allOngStudents', allOngStudents);

            // Filter data to get only the instance classes from the ONG
            const allOngClasses = dataInstanceClasses.filter(item =>
                allOngClassSchedules.some(classSchedule => classSchedule.id == item.class_schedule_id)
            );
            console.log('allOngClasses', allOngClasses);

            // Filter data to get only the teachers from the ONG
            const allOngProfessors = dataProfessors.filter(item =>
                allOngClasses.some(classInstance => classInstance.id == item.class_instance_id)
            );
            console.log('allOngProfessors', allOngProfessors);
            
            // Filter data to get only the evasions from the ONG
            const allOngEvasions = allOngStudents.filter(item => item.status == 3);

            // Count the unique number of evasions
            const allOngUniqueEvasion = new Set(allOngEvasions.map(item => item.student_id)).size;
            console.log('allOngUniqueEvasion', allOngUniqueEvasion);

            // Count the unique number of students
            const allOngUniqueStudent = new Set(allOngStudents.map(item => item.student_id)).size;
            console.log('allOngUniqueStudent', allOngUniqueStudent);

            // Count the unique number of professors
            const allOngUniqueProfessor = new Set(allOngProfessors.map(item => item.professor_id)).size;
            console.log('allOngUniqueProfessor', allOngUniqueProfessor);

            setAllOngUniqueStudents(allOngUniqueStudent);
            setAllOngUniqueProfessors(allOngUniqueProfessor);
            setAllOngUniqueEvasion(allOngUniqueEvasion);

            setAllOngProfessors(allOngProfessors);
            setAllOngClasses(allOngClasses);    
            setAllOngWorkshops(allOngWorkshops);
            setAllOngSchedules(allOngClassSchedules);
            setAllOngStudents(allOngStudents);
        }
        
        fetchData();
    }, []);

    // Filter data to get only data from a specific workshop
    useEffect(() => {
        if (isFiltered) {
            //  Filter the classes from the selected workshop
            const filteredSchedule = allOngSchedules.filter(item => item.workshop_id == filterWorkshop);

            // Filter the students from the selected workshop
            const filteredClasses = allOngClasses.filter(item => 
                filteredSchedule.some(schedule => schedule.id == item.class_schedule_id)
            );

            // Filter the students from the selected workshop
            const filteredStudents = allOngStudents.filter(item => 
                filteredSchedule.some( classSchedule => classSchedule.id == item.class_schedule_id)
            );
            const filteredUniqueStudent = new Set(filteredStudents.map(item => item.student_id)).size;
            
            // Filter the professors from the selected workshop
            const filteredProfessors = allOngProfessors.filter(item => 
                filteredClasses.some(classInstance => classInstance.id == item.class_instance_id)
            );
            const filteredUniqueProfessor = new Set(filteredProfessors.map(item => item.professor_id)).size;

            // Filter the evasions from the selected workshop
            const filteredEvasions = filteredStudents.filter(item => item.status == 3);
            const filteredUniqueEvasion = new Set(filteredEvasions.map(item => item.student_id)).size;

            // Set the workshop states with the filtered data
            setWorkshopUniqueProfessor(filteredUniqueProfessor);
            setWorkshopUniqueStudents(filteredUniqueStudent);
            setWorkshopUniqueEvasion(filteredUniqueEvasion);
            setWorkshopClasses(filteredClasses);
        }
    }, [isFiltered, filterWorkshop]);

    // Render the page according to the filter state
    switch (isFiltered) {
        // If there is no filter, render the page with all the ONG data
        case false:
            return (
                <div>
                    <header>
                        <NavBar name={'Nome'} role={'líder'} avatar={<Avatar defaultImage="" profileImage={'imagem'} widthImage={'30px'} heightImage={'30px'}/>}/>
                    </header>
                    <main className="flex flex-col px-28 py-12 pb-8 h-[100vh] justify-center">
                        <div>
                            <div className='bg-white rounded-xl mx-12 py-2 text-center font-medium shadow-shadow-20'>Estatísticas de Teto</div>
                            <div className='flex w-[100%] mt-8 justify-between'>
                                <div className='flex ml-12'>
                                    <DropdownDashFilter type={'oficina'} data={allOngWorkshops} onFilterChange={setFilterWorkshop} verify={setIsFiltered}/>
                                    {/* <DropdownDashFilter type={'turma'} data={allOngSchedules} onFilterChange={setFilterSchedule} verify={setIsFiltered}/> */}
                                </div>
                                <button className="flex bg-white rounded-2xl w-[10%] justify-evenly py-2 shadow-shadow-10 items-center mr-12">
                                    <img src={downloadIcon} alt="Ícone de download" className="w-[20px] h-[20px]" />
                                    <p className="text-[18px] font-medium">Baixar</p>
                                </button>
                            </div>
                            <div className='flex flex-wrap gap-8 mt-8 justify-center'>
                                <DashCardONG type={'Atendimentos'} data={allOngClasses.length}/>
                                <DashCardONG type={'Atendidos'} data={allOngUniqueStudents}/>
                                <DashCardONG type={'Colaboradores'} data={allOngUniqueProfessors}/>
                                <DashCardONG type={'Oficinas'} data={allOngWorkshops.length}/>
                                <DashCardONG type={'Presença'} data={'86%'}/>
                                <DashCardONG type={'Evasão'} data={allOngUniqueEvasion}/>
                            </div>
                        </div>
                    </main>
                </div>
            );

        // If there is a filter, render the page with the filtered data
        case true:
            return (
                <div>
                    <header>
                        <NavBar name={'Nome'} role={'líder'} avatar={<Avatar defaultImage="" profileImage={'imagem'} widthImage={'30px'} heightImage={'30px'}/>}/>
                    </header>
                    <main className="flex flex-col px-28 py-12 pb-8 h-[100vh] justify-center">
                        <div>
                            <div className='bg-white rounded-xl mx-12 py-2 text-center font-medium shadow-shadow-20'>Estatísticas de Teto</div>
                            <div className='flex w-[100%] mt-8 justify-between'>
                                <div className='flex ml-12'>
                                    <DropdownDashFilter type={'oficina'} data={allOngWorkshops} onFilterChange={setFilterWorkshop} verify={setIsFiltered}/>
                                    {/* <DropdownDashFilter context={'turmas'} data={allOngSchedules}/> */}
                                </div>
                                <button className="flex bg-white rounded-2xl w-[10%] justify-evenly py-2 shadow-shadow-10 items-center mr-12">
                                    <img src={downloadIcon} alt="Ícone de download" className="w-[20px] h-[20px]" />
                                    <p className="text-[18px] font-medium">Baixar</p>
                                </button>
                            </div>
                            <div className='flex flex-wrap gap-8 mt-8 justify-center'>
                                <DashCardONG type={'Atendimentos'} data={workshopClasses.length}/>
                                <DashCardONG type={'Atendidos'} data={workshopUniqueStudents}/>
                                <DashCardONG type={'Colaboradores'} data={workshopUniqueProfessor}/>
                                <DashCardONG type={'Evasão'} data={workshopUniqueEvasion}/>
                                <DashCardONG type={'Presença'} data={'86%'}/>
                            </div>
                        </div>
                    </main>
                </div>
            );
    }
};