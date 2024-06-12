import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataIdContext } from '../context/IdCourse.jsx'

interface FormData {
  workshop_id: number;
  day_of_week: Array<string>;
  start_time: any;
  end_time: any;
  frequency: number;
  status: number;
}

const ClassScheduleFormStepper: React.FC = ({ }) => {
  const navigate = useNavigate();
  const { idCourse, setIdCourse } = useContext(DataIdContext)
  const [formData, setFormData] = useState<FormData>({
    day_of_week: [],
    workshop_id: idCourse,
    start_time: "",
    end_time: "",
    status: 0,
    frequency: 0
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      workshop_id: idCourse,
    }));
  }, [idCourse]);
  

  const formatTime = (time: string) => {
  const [hour, minute] = time.split(':');
  return `${hour}:${minute}:00`;
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  let formattedValue = value;
  if (name === 'start_time' || name === 'end_time') {
    formattedValue = formatTime(value);
  }
  setFormData((prevData) => ({
    ...prevData,
    [name]: name === "status" ? value === "true" : formattedValue,
  }));
};

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "status" ? value === "true" : checked ? [...prevData.day_of_week, value] : prevData.day_of_week.filter(day => day !== value),
      workshop_id: name === "workshop_id" ? value : prevData.workshop_id,
    }));    
  };


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "frequency" ? parseInt(value) : value,
    }));
  };
    

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const isLastStep = currentStep === totalSteps;

  const handleButtonClick = async () => {
    if (isLastStep) {
      try {
        console.log('fetching')
        console.log(JSON.stringify(formData))
        const response = await fetch("http://localhost:3000/api/class-schedules", {
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

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-2xl w-full">
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <div className="relative h-4">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="items-center bg-white p-4 rounded shadow-md">
          <form>
            {currentStep === 1 && (
              <div className="form-step">
                <label
                  htmlFor="days"
                  className="text-3xl font-bold block text-center"
                >
                  Quais são os dias que essa turma terá aulas?
                </label>
                <div id="days" className="my-8 flex flexwrap gap-3 justify-center">
                  {['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map((day, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        className="rounded-md m-1 focus:ring-transparent selection:bg-green-4"
                        id={`day_${index}`}
                        name="day_of_week"
                        value={day}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={`day_${index}`}>{day}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {currentStep === 2 && (
              <div className="form-step">
                <label className="text-3xl font-bold block text-center">
                  Que horas são as aulas?
                </label>
                <div className="flex justify-evenly mt-8">
                  <div className="flex flex-col">
                    <p>As aulas vão começar às:</p>
                    <input
                      type="time"
                      id="start_time"
                      name="start_time"
                      value={formData.start_time}
                      onChange={handleChange}
                      className="mt-4 mb-4 p-2 border w-[100%]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <p>As aulas vão terminar às:</p>
                    <input
                      type="time"
                      id="end_time"
                      name="end_time"
                      value={formData.end_time}
                      onChange={handleChange}
                      className="mt-4 mb-4 p-2 border w-[100%]"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-step">
                <label className="text-3xl font-bold block text-center">
                  Com que frequência as aulas vão acontecer?
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleSelectChange}
                  className="px-4 py-2 text-gray-4 border rounded-full bg-transparent mt-4 mb-4 p-2 w-full"
                >
                  <option value="">Escolha a frequência</option>
                  <option value={1}>Todos os dias</option>
                  <option value={2}>1 vez por semana</option>
                  <option value={3}>2 vezes por semana</option>
                  <option value={4}>Mensalmente</option>
                </select>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-4 py-2 text-gray-4 rounded-full bg-transparent border"
              >
                {"Voltar"}
              </button>
              <button
                type="button"
                onClick={handleButtonClick}
                className="px-4 py-2 text-gray-4 border rounded-full bg-transparent"
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

export default ClassScheduleFormStepper;
