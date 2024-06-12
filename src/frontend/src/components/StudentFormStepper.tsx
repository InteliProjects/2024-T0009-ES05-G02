import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataMinorContext } from '../context/isMinor.jsx'


interface FormData {
  name: string;
  gender: number;
  civil_state: number;
  race: number;
  birthday: any;
  rg: string;
  cpf: string;
  telephone: string;
  state: number;
  city: string;
  address: string;
  status: number,
  responsable_id: any,
  ong_id: number,
  email: string;
}

const StudentFormStepper: React.FC = ({ }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: 0,
    civil_state: 0,
    race: 0,
    birthday: new Date("0000-00-00T00:00:00.000Z"),
    rg: "",
    cpf: "",
    telephone: "",
    state: 0,
    city: "",
    status: 0,
    address: "",
    ong_id: 1,
    email: "",
    responsable_id: null
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;
  const {minorState, setMinorState} = useContext(DataMinorContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name == 'birthday') {
      const dateValue = new Date(value);
      formattedValue = dateValue.toISOString().split('T')[0];
    }  

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
};

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const isLastStep = currentStep === totalSteps;
  const estados = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
    "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
    "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
    "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
    "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
  ];

  const handleButtonClick = async () => {
    if (isLastStep) {

      try {
        console.log('fetching')
        console.log(JSON.stringify(formData))
        const response = await fetch('http://localhost:3000/api/students', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Formulário enviado com sucesso!");
          navigate('/');
        } else {
          console.error("Erro ao enviar o formulário");
        }
      } catch (error) {
        console.error("Erro ao enviar a requisição:", error);
      }
    } else {
      nextStep();
    }
  };

  useEffect(() => {
    console.log('minorState', minorState)
    if (minorState == false) {
      setFormData(prevData => ({
        ...prevData,
        responsable_id: null,
      }));
    } else if (minorState == true) {
      fetch('http://localhost:3000/api/responsables')
        .then(response => response.json())
        .then(data => {
          const lastId = data[data.length - 1].id;
          setFormData(prevData => ({
            ...prevData,
            responsable_id: lastId,
          }));
        })
        .catch(error => console.error('Erro ao buscar responsáveis:', error));
    }
  }, []);  
  

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-2xl w-full">
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <div className="relative h-4 ">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-1000 ease-in-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>


        <div className="items-center bg-white p-4 rounded shadow-md">
        <form
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                nextStep();
              }
            }}
          >
            {currentStep === 1 && (
              <div className="form-step">
                <label className="text-3xl font-bold block text-center">
                  Qual é o nome do aluno?
                </label>


                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-12 mb-4 p-2 border w-full"
                  placeholder={`Escreva o nome do aluno`}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-step">
                <label className="text-3xl font-bold block text-center"> Informações pessoais </label>
                <section className="flex flex-col gap-8 mt-8 ml-8">
                  <div className="flex">
                    <p className="text-[red]">*</p>
                    <p className="font-medium">Gênero:</p>
                    <span className="flex ml-4 gap-4">
                      <span>
                        <input type="radio" id="masculino" name="gender" value="1" onChange={handleChange} />
                        <label htmlFor="masculino">Masculino</label>
                      </span>
                      <span>
                        <input type="radio" id="feminino" name="gender" value="2" onChange={handleChange} />
                        <label htmlFor="feminino">Feminino</label>
                      </span>
                      <span>
                        <input type="radio" id="outro" name="gender" value="3" onChange={handleChange} />
                        <label htmlFor="outro">Outro</label>
                      </span>
                    </span>
                  </div>

                  <div className="flex">
                    <p className="text-[red]">*</p>
                    <p className="font-medium">Data de Nascimento:</p>
                    <input
                      type="date"
                      id="birthday"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      className="flex ml-4 py-0 px-2 text-gray-4 border rounded-full bg-transparent w-[20%] h-[25px] text-[12px] align-text-top "
                    >
                    </input>
                  </div>

                  <div className="flex">
                    <p className="text-[red]">*</p>
                    <p className="font-medium">Raça:</p>
                    <select
                      id="race"
                      name="race"
                      value={formData.race}
                      onChange={handleChange}
                      className="flex ml-4 py-0 px-2 text-gray-4 border rounded-full bg-transparent w-[25%] h-[25px] text-[12px] align-text-top "
                    >
                      <option value="">Escolha uma opção</option>
                      <option value={1}>Branca</option>
                      <option value={2}>Preta</option>
                      <option value={3}>Amarela</option>
                      <option value={4}>Parda</option>
                      <option value={5}>Indígena</option>
                    </select>
                  </div>
                </section>
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-step">
                <label className="text-3xl font-bold block text-center"> Informações pessoais </label>
                <section className="flex flex-col gap-8 mt-8 ml-8">

                  <div className="flex">
                    <p className="text-[red]">*</p>
                    <p className="font-medium">Estado Civil:</p>
                    <select
                      id="civil_state"
                      name="civil_state"
                      value={formData.civil_state}
                      onChange={handleChange}
                      className="flex ml-4 py-0 px-2 text-gray-4 border rounded-full bg-transparent w-[25%] h-[25px] text-[12px] align-text-top "
                    >
                      <option value="">Escolha uma opção</option>
                      <option value={1}>Solteiro</option>
                      <option value={2}>Casado</option>
                      <option value={3}>Separado</option>
                      <option value={4}>Divorciado</option>
                      <option value={5}>Viúvo</option>
                    </select>
                  </div>

                  <div className="flex">
                    <p className="text-[red]">*</p>
                    <p className="font-medium">RG:</p>
                    <input
                      type="text"
                      id="rg"
                      name="rg"
                      value={formData.rg}
                      onChange={handleChange}
                      className="p-2 border w-[25%] text-[12px] ml-4 h-[25px] rounded-3xl"
                      placeholder="Exemplo: 0000000000"
                    />
                  </div>

                  <div className="flex">
                    <p className="text-[red]">*</p>
                    <p className="font-medium">CPF:</p>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      className="p-2 border w-[25%] text-[12px] ml-4 h-[25px] rounded-3xl"
                      placeholder="Exemplo: 00000000000"
                    />
                  </div>

                </section>
              </div>
            )}

            {currentStep === 4 && (
              <div className="form-step">
                <label className="text-3xl font-bold block text-center">Informações de contato</label>
                <section className="flex flex-col gap-8 mt-8 ml-8">

                  <div className="flex">
                    <p className="text-[red]">*</p>
                    <p className="font-medium">Estado:</p>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="flex ml-4 py-0 px-2 text-gray-4 border rounded-full bg-transparent w-[25%] h-[25px] text-[12px] align-text-top "
                    >
                      <option value="">Escolha uma opção</option>
                      {estados.map((estado, index) => (
                        <option value={index + 1} key={index}>{estado}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex">
                    <p className="text-[red]">*</p>
                    <p className="font-medium">Cidade:</p>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="p-2 border w-[40%] text-[12px] ml-4 h-[25px] rounded-3xl"
                      placeholder="Exemplo: São Paulo"
                    />
                  </div>

                  <div className="flex">
                    <p className="text-[red]">*</p>
                    <p className="font-medium">Endereço:</p>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="p-2 border w-[60%] text-[12px] ml-4 h-[25px] rounded-3xl"
                      placeholder="Exemplo: Rua da felicidade, número 10, Bairro da alegria"
                    />
                  </div>

                  <div className="flex">
                    <p className="text-[red]">*</p>
                    <p className="font-medium">Telefone:</p>
                    <input
                      type="text"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="p-2 border w-[40%] text-[12px] ml-4 h-[25px] rounded-3xl"
                      placeholder="Exemplo: (00) 0000-00000"
                    />
                  </div>

                  <div className="flex">
                    <p className="text-[red]">*</p>
                    <p className="font-medium">E-mail:</p>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="p-2 border w-[40%] text-[12px] ml-4 h-[25px] rounded-3xl"
                      placeholder="Exemplo: email@email.com"
                    />
                  </div>

                </section>
              </div>
            )}

            <div className={`flex ${currentStep == 1 ? 'justify-end' : 'justify-between'} mt-8`}>
              {currentStep !== 1 && (
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-4 py-1 text-gray-4 rounded-full bg-transparent border hover:border-green-1 hover:text-green-3"
                >
                  {"Voltar"}
                </button>
              )}
              <button
                type="button"
                onClick={handleButtonClick}
                className={`px-4 py-1 ${isLastStep ? 'bg-green-3 text-white hover:bg-green-4' : 'bg-transparent text-gray-4 border hover:border-green-1 hover:text-green-4'} rounded-full`}
              >
                {isLastStep ? "Enviar" : "Próximo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentFormStepper;
