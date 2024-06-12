import React, { useState, useEffect, useContext } from "react";
import NavBar from "@/components/navBar";
import Avatar from "@/components/avatar";
import turmaImage from "../assets/turma.svg";
import InformationField from "@/components/informationField";
import EditIcon from "../assets/lapis.svg";
import StudentsModal from "../components/StudentsModal";
import DropdownFilter from "../components/DropdownFilter"
import CourseHeader from "../components/CourseHeader";
import { useParams } from 'react-router-dom';
import DropdownStartClass from "@/components/DropdownStartClass";
import ClassTableList from "@/components/ClassTableList";
import DropdownStatus from "@/components/DropdownStatus";
import { DataIdContext } from '../context/IdCourse.jsx'
import { Link } from "react-router-dom";
import ClassModal from "@/components/ClassModal";

export default function Course() {
    const [filterClass, setFilterClass] = useState('')
    const [filterDate, setFilterDate] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [courseData, setCourseData] = useState<{ class: string; date: string; time: string; status: string; }[]>([]);
    const [instanceClassesData, setInstanceClassesData] = useState([]);
    const [classScheduleData, setClassScheduleData] = useState([]);
    const { idCourse, setIdCourse  } = useContext(DataIdContext);

    const { id } = useParams();
    const courseId = parseInt(id);

    setIdCourse(courseId);
    console.log("eu souno curso", idCourse)

    useEffect(() => {
        const fetchData = async () => {
            const urlClasses = 'http://localhost:3000/api/workshops';
            const urlStudents = 'http://localhost:3000/api/students';
            const urlStudentClasses = 'http://localhost:3000/api/student-classes';
            const urlClassSchedule = 'http://localhost:3000/api/class-schedules';
            const urlInstanceClasses = 'http://localhost:3000/api/instance-classes';
    
            const responseClasses = await fetch(urlClasses);
            const dataClasses = await responseClasses.json();
    
            const responseStudents = await fetch(urlStudents);
            const dataStudents = await responseStudents.json();
    
            const responseStudentClasses = await fetch(urlStudentClasses);
            const dataStudentClasses = await responseStudentClasses.json();
    
            const responseClassSchedule = await fetch(urlClassSchedule);
            const dataClassSchedule = await responseClassSchedule.json();
    
            const responseInstanceClasses = await fetch(urlInstanceClasses);
            const dataInstanceClasses = await responseInstanceClasses.json();
    
            const courseDataFetch = dataClasses.find(item => item.id == courseId);
            const classSchedulesInWorkshop = dataClassSchedule.filter(item => item.workshop_id == courseId);
    
            const studentsInWorkshop = classSchedulesInWorkshop.flatMap(classSchedule => 
                dataStudentClasses.filter(studentClass => studentClass.class_schedule_id == classSchedule.id)
            );
    
            const students = dataStudents.filter(student => studentsInWorkshop.some(item => item.student_id == student.id));
    
            const filteredInstanceClasses = dataInstanceClasses.filter((item) => classSchedulesInWorkshop.some((schedule) => schedule.id == item.class_schedule_id));
    
            courseDataFetch.classSchedules = classSchedulesInWorkshop;
            courseDataFetch.students = students;
            courseDataFetch.studentCount = students.length;
    
            setCourseData(courseDataFetch);
            setInstanceClassesData(filteredInstanceClasses);
        }
        
        fetchData();
    }, [courseId]);

    const translator = [
        { portuguese: 'Oficina', english: 'name' },
        { portuguese: 'Categoria', english: 'category' },
        { portuguese: 'Local', english: 'local' },
        { portuguese: 'Alunos', english: 'students' },
        { portuguese: 'Total de Alunos', english: 'studentCount' },

    ];

    const dictCategory = [
        { id: '0', category: "Artes" },
        { id: '1', category: "Esporte" },
        { id: '2', category: "Dança" },
        { id: '3', category: "Música" },
        { id: '4', category: "Tecnologia" },
    ];

    function translate(key: string) {
        const item = translator.find(item => item.english === key);
        return item ? item.portuguese : key;
    }
    const excludeKeys = ["id", "status", "ong_id", "createdAt", "updatedAt", "students", "classSchedules"];

    return (
        <div>
            <header>
                <NavBar name={'Nome'} role={'líder'} avatar={<Avatar defaultImage="" profileImage={'imagem'} widthImage={'30px'} heightImage={'30px'} />} />
            </header>
            <main className="flex px-24 pt-14 pb-8 h-full gap-14">
                <section className="mt-8 flex flex-col bg-white shadow-shadow-10 w-[40%] h-[450px] rounded-[20px] p-6 items-center justify-evenly gap-4">
                    <div className=" ml-56 ">
                        <DropdownStatus data={courseData} context={'courses'}/>
                    </div>
                    <CourseHeader data={courseData} />
                    <div className="flex gap-2">
                        <ClassModal workshopId={courseId}/>
                        <StudentsModal data={courseData}/>
                    </div>
                    <div className="border border-gray-3 w-[90%] h-[1px]"></div>
                    <div className="flex flex-col gap-2 justify-between w-[90%] h-[auto] max-h-[150px] overflow-y-auto">
                        {Object.keys(courseData).map((key: string) => {
                        if (!excludeKeys.includes(key)) {
                            let value = courseData[key];
                            if (key === 'category') {
                                const translatedCategory = dictCategory.find(item => item.id == courseData.category);
                                value = translatedCategory ? translatedCategory.category : value;
                            } else if (key === 'classSchedules') {
                                value = courseData[key].map((schedule: any) => `id: ${schedule.id}, start_time: ${schedule.start_time}`).join(', ');
                            }
                            return <InformationField paddingY="" title={translate(key)} value={value} />
                        }
                        })}
                    </div>
                    <div className="w-[90%]">
                        <button className="flex border border-gray-3 text-gray-3 text-[14px] rounded-2xl px-4 gap-2 items-start">
                            <img src={EditIcon} alt="" className="w-[16px] h-[16px] self-center opacity-40" />
                            <p><Link to='/new/member'>Editar</Link></p>
                        </button>
                    </div>
                </section>


                <section className="mt-8 flex flex-col bg-white shadow-shadow-10 w-[60%] h-[450px] rounded-[20px] py-6 px-16 items-center gap-4">
                    <div className='flex flex-col w-[100%]'>
                        <p className='font-medium text-[28px] justify-start'>Aulas</p>
                        <div className='self-end'>
                            <DropdownStartClass data={courseData}/>
                        </div>
                    </div>
                    <div className="flex justify-end w-[100%] gap-2">
                        <DropdownFilter placeholder={'Turma'} data={instanceClassesData} onFilterChange={setFilterClass} />
                        <DropdownFilter placeholder={'Data'} data={instanceClassesData} onFilterChange={setFilterDate}/>
                        <DropdownFilter placeholder={'Situação'} data={instanceClassesData} onFilterChange={setFilterStatus} />
                    </div>
                    <div className="h-[100%] w-[100%] max-h-[300px] overflow-y-scroll">
                        <ClassTableList data={instanceClassesData} filterClass={filterClass} filterDate={filterDate} filterStatus={filterStatus} />
                    </div>
                </section>
            </main>
        </div>
    );
}