import React, { useState, useEffect } from "react";
import NavBar from "@/components/navBar";
import Avatar from "@/components/avatar";
import InformationField from "@/components/informationField";
import EditIcon from "../assets/lapis.svg";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ArrowDown from "@/components/arrowDown";
import CreationButton from "@/components/creationButton";
import HistoricalModal from "../components/HistoricalModal"
import DropdownStatus from "@/components/DropdownStatus";
import ResponsibleModal from "../components/ResponsibleModal"
import ClassModal from "@/components/ClassModal";
import { stringify } from "querystring";
import DropdownCreateMember from "@/components/DropdownCreateMember";

export default function Course() {

    interface Ong {
        id: number
        name: string
        email: string
        cnpj: string
        telephone: string
        foundationData: string
        address: string
    }

    interface Student {
        id: number
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
        status: number
        responsable_id: number
        type: "Aluno"
        workshop: string
    }

    interface Professor {
        name: string
        gender: number
        civil_state: number
        race: number
        birthday: string
        rg: string
        cpf: string
        telephone: string
        state: number
        city: string
        address: string
        ong_id: number
        user_id: number
        type: "Professor"
    }

    interface Leader {
        id: number
        name: string
        ong_id: number
        user_id: number
    }

    type Member = Student | Professor

    const [leader, setLeader] = useState<Leader>()
    async function fetchLeaders() {
        try {
            const url = 'http://localhost:3000/api/leaders'

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao obter estudantes');
            }
            const data: Leader[] = await response.json();
            const filteredLeaders = data.filter(leader => leader.ong_id == id)
            setLeader(filteredLeaders[0]);
        } catch (error) {
            console.error(error);
        }
    }


    const [ong, setOng] = useState<Ong>()
    const [id, setId] = useState<number>(1)

    async function fetchOngs() {
        try {
            const url = `http://localhost:3000/api/ongs/${id}`

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao obter ongs');
            }
            const data = await response.json();
            setOng(data);
        } catch (error) {
            console.error(error);
        }
    }

    const [members, setMembers] = useState<Member[]>([])

    const [students, setStudents] = useState<Student[]>([])
    async function fetchStudents() {
        try {
            const urlStudents = 'http://localhost:3000/api/students'
            const urlStudentClasses = 'http://localhost:3000/api/student-classes'
            const urlClassSchedules = 'http://localhost:3000/api/class-schedules'
            const urlWorkshops = 'http://localhost:3000/api/workshops'


            const responseStudent = await fetch(urlStudents);
            const students: Student[] = await responseStudent.json();
            const filteredStudents = students.filter(student => student.ong_id == id)


            const responseStudentClasses = await fetch(urlStudentClasses)
            const studentClasses = await responseStudentClasses.json()

            const responseClassSchedules = await fetch(urlClassSchedules)
            const classSchedules = await responseClassSchedules.json()

            const responseWorkshops = await fetch(urlWorkshops)
            const workshops = await responseWorkshops.json()

            const findStudentWorkshop = (student, studentClasses, classSchedules, workshops) => {

                const notFoundText = "Não possui oficina"

                let studentClass = studentClasses.find(studentClass => studentClass.student_id == student.id)

                if (!studentClass) {
                    return notFoundText
                }

                let classSchedule = classSchedules.find(classSchedule => classSchedule.id == studentClass.class_schedule_id)

                if (!classSchedule) {
                    return notFoundText
                }

                let workshop = workshops.find(workshop => workshop.id == classSchedule.workshop_id)

                return workshop ? workshop.name : notFoundText

            };


            setStudents(filteredStudents.map(student => ({
                ...student,
                type: "Aluno",
                workshop: findStudentWorkshop(student, studentClasses, classSchedules, workshops)
            }
            )))
        } catch (error) {
            console.error(error);
        }
    }

    const [professors, setProfessors] = useState<Professor[]>([])
    async function fetchProfessors() {
        try {
            const url = 'http://localhost:3000/api/professors'

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao obter estudantes');
            }
            const data: Professor[] = await response.json();
            const filteredProfessors = data.filter(professor => professor.ong_id == id)
            setProfessors(filteredProfessors.map(professor => ({ ...professor, type: "Professor" })));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchOngs();
        fetchStudents();
        fetchProfessors();
        fetchLeaders();
    }, [id]);

    useEffect(() => {
        setMembers([...students, ...professors])
    }, [students, professors]);



    const [selectedStudent, setSelectedStudent] = useState<Member | null>(null);

    const arrowColor = '#686868';

    const handleStudentClick = (member: Member) => {
        setSelectedStudent(member);
    };

    const handleBackButtonClick = () => {
        setSelectedStudent(null);
    };


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


    const renderOriginalContent = () => {

        return (
            <div>
                <header>
                    <NavBar name={'Nome'} role={'líder'} avatar={<Avatar defaultImage="" profileImage={'imagem'} widthImage={'30px'} heightImage={'30px'} />} />
                </header>
                <main className="flex px-24 pt-14 pb-8 h-full gap-14">
                    <section className="mt-8 flex flex-col bg-white shadow-shadow-10 w-[40%] rounded-[20px] p-6 items-center gap-4">
                        {ong ? (
                            <div className=" flex flex-col rounded-[20px] p-6 items-center gap-4">
                                <Avatar defaultImage="" profileImage={''} widthImage={'80px'} heightImage={'80px'} />
                                <div className="flex flex-col items-center">
                                    <p className="text-[24px] font-medium">{ong.name}</p>
                                    {leader ? (
                                        <p className="text-[16px]">{leader.name}</p>
                                    ) : <span></span>}
                                </div>
                                <div className="border border-gray-3 w-[90%] h-[1px]"></div>
                                <div className="flex flex-col gap-2 w-[90%]">
                                    <InformationField paddingY="" title={'E-mail:'} value={ong.email} />
                                    <InformationField paddingY="" title={'CNPJ:'} value={ong.cnpj} />
                                    <InformationField paddingY="" title={'Celular/Telefone:'} value={ong.telephone} />
                                    <InformationField paddingY="" title={'Fundação:'} value={ong.foundationData} />
                                    <InformationField paddingY="" title={'Endereço:'} value={ong.address} />
                                    <InformationField paddingY="" title={'Membros:'} value={'240'} />
                                </div>
                                <div className="w-[90%]">
                                    <button className="flex border border-gray-3 text-gray-3 text-[14px] rounded-2xl px-4 gap-2 items-start">
                                        <img src={EditIcon} alt="" className="w-[16px] h-[16px] self-center opacity-40" />
                                        <p>Editar</p>
                                    </button>
                                </div>
                            </div>
                        ) : <p>Não existe Ong</p>}
                    </section>


                    <section className="mt-8 flex flex-col bg-white shadow-shadow-10 w-[60%] rounded-[20px] py-6 px-16 items-center gap-4">
                        <p className="font-medium text-[28px] self-start">Membros</p>
                        <div className="flex justify-end gap-2 w-[100%]">
                            {/* <SearchBar category="page" width="90%" /> */}
                            <div className="w-[40%]">
                                <DropdownCreateMember/>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end w-[100%]">
                        </div>
                        <div className="h-[100%] w-[100%] max-h-[300px] overflow-y-scroll">
                            <Table >
                                <TableCaption>Essas são todos os membros da Teto!</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='text-center text-black'>Nome</TableHead>
                                        <TableHead className='text-center text-black'>Cargo</TableHead>
                                        <TableHead className='text-center text-black'>Oficina</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {members.map((member) => (
                                        <TableRow className="h-[100%] w-[100%] max-h-[300px]">
                                            <TableCell className="text-center" onClick={() => handleStudentClick(member)}>{member.name}</TableCell>
                                            <TableCell className='text-center'>{member.type}</TableCell>
                                            <TableCell className='text-center'>{member.workshop}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </section>
                </main>
            </div>
        );
    };

    const renderStudentContent = (member: Member) => {
        return (
            <div>
                <header>
                    <NavBar name={'Nome'} role={'líder'} avatar={<Avatar defaultImage="" profileImage={'imagem'} widthImage={'30px'} heightImage={'30px'} />} />
                </header>
                <main className="flex px-24 pt-14 pb-8 h-full gap-14">
                    <section className="mt-8 flex flex-col bg-white shadow-shadow-10 w-[40%] rounded-[20px] p-6 items-center gap-4">
                        <div className="ml-48">
                            <DropdownStatus context={'members'} data={member} />
                        </div>
                        <Avatar defaultImage="" profileImage={''} widthImage={'80px'} heightImage={'80px'} />
                        <div className="flex flex-col items-center">
                            <p className="text-[28px] font-medium">{member.name}</p>
                        </div>
                        <div className="flex gap-2">
                            <HistoricalModal member={member} />
                            <button className="flex border border-gray-4 text-gray-4 text-[14px] rounded-2xl px-6 gap-2">
                                <img src={EditIcon} alt="" className="w-[16px] h-[16px] self-center" />
                                <p>Editar</p>
                            </button>

                        </div>
                        <div className="border border-gray-3 w-[90%] h-[1px]"></div>
                        <div className="flex flex-col gap-2 w-[90%] max-h-[150px] overflow-y-scroll">
                            {"email" in member ? (
                                <InformationField paddingY="" title={'E-mail:'} value={member.email} />
                            ) : <span></span>}
                            <InformationField paddingY="" title={'CPF:'} value={member.cpf} />
                            <InformationField paddingY="" title={'RG:'} value={member.rg} />
                            <InformationField paddingY="" title={'Cidade/Estado:'} value={`${member.city} , ${member.state}`} />
                            <InformationField paddingY="" title={'Nascimento:'} value={member.birthday} />
                            <InformationField paddingY="" title={'Celular:'} value={member.telephone} />
                            <InformationField paddingY="" title={'Endereço:'} value={member.address} />
                            <InformationField paddingY="" title={'Última Visita:'} value={'01/01/2002'} />
                            <InformationField paddingY="" title={'Idade:'} value={computeAge(new Date(member.birthday)) + " anos"} />
                            <InformationField paddingY="" title={'Raça:'} value={String(member.race)} />
                            <InformationField paddingY="" title={'Gênero:'} value={String(member.gender)} />
                            <InformationField paddingY="" title={'Estado Civil:'} value={String(member.civil_state)} />
                            <div className="flex items-center justify-center border border-gray-3 text-[14px] rounded-2xl px-4 gap-2">
                                {"responsable_id" in member ? (
                                    <ResponsibleModal responsable_id={member.responsable_id} />
                                ) : <span></span>}
                            </div>
                        </div>
                        <div className="w-[90%]">
                            <button className="flex border border-gray-3 text-gray-3 text-[14px] rounded-2xl px-4 gap-2 items-start" onClick={handleBackButtonClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 mt-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                                <p>Voltar</p>
                            </button>
                        </div>
                    </section>


                    <section className="mt-8 flex flex-col bg-white shadow-shadow-10 w-[60%] rounded-[20px] py-6 px-16 items-center gap-4">
                        <p className="font-medium text-[28px] self-start">Membros</p>
                        <div className="flex justify-end gap-2 w-[100%]">
                            {/* <SearchBar category="page" width="90%" /> */}
                            <div className="w-[40%]">
                                <DropdownCreateMember/>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end w-[100%]">
                        </div>
                        <div className="h-[100%] w-[100%] max-h-[300px] overflow-y-scroll">
                            <Table >
                                <TableCaption>Essas são todos os membros da Teto!</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='text-center text-black'>Nome</TableHead>
                                        <TableHead className='text-center text-black'>Cargo</TableHead>
                                        <TableHead className='text-center text-black'>Oficina</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody> 
                                        {members.map((member) => (
                                            <TableRow className="h-[100%] w-[100%] max-h-[300px]">
                                                <TableCell className="text-center" onClick={() => handleStudentClick(member)}>{member.name}</TableCell>
                                                <TableCell className='text-center'>{member.type}</TableCell>
                                                <TableCell className='text-center'>{member.workshop}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </div>
                    </section>
                </main>
            </div>
        );
    };


    return (
        <div>
            {selectedStudent === null ? renderOriginalContent() : renderStudentContent(selectedStudent)}
        </div>
    );
}