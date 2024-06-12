import React, { useState, useEffect, ChangeEvent } from 'react';
import addIcon from '../assets/add.svg';
import { useParams } from 'react-router-dom';
import { notify } from '../components/ui/toast.tsx';
import { ToastContainer } from 'react-toastify';

function TextInput() {
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState('');
  const [buttonColor, setButtonColor] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchObservation = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/instance-classes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setText(data.observation || 'Escreva algo aqui!');
        } else {
          setText('Erro ao carregar observação');
        }
      } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        setText('Erro ao carregar observação');
      }
    };

    fetchObservation();
  }, [id]);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/instance-classes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ observation: text }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        notify('Mensagem salva com sucesso!')
      } else {
        alert('Erro ao salvar mensagem');
      }
    } catch (error) {
      console.error('Erro ao fazer requisição:', error);
    } finally {
      setButtonColor('');
    }
  };

  return (
    <div className="flex flex-col items-start">
      <ToastContainer />
      <button onClick={handleEdit} className="flex justify-center gap-2 py-1 w-[16%] text-[14px] rounded-3xl shadow-shadow-25 mb-4">
        <img src={addIcon} className='w-[16px] h-[16px] self-center' />
        Observações
      </button>
      {isEditable ? (
        <textarea 
          maxLength={1000}
          value={text} 
          onChange={handleChange} 
          onBlur={handleBlur} 
          className={`w-full border-2 ${isEditable ? 'border-gray-4' : 'border-gray-2'}`}
        />
      ) : (
        <div className="w-full max-h-[80px] border-b-2 mb-2 border-gray-2 whitespace-pre-line text-wrap overflow-y-scroll">
          {text}
        </div>
      )}
      <button
        className={`flex justify-center gap-2 my-4 shadow-shadow-25 w-[16%] text-[14px] rounded-3xl py-1 ${buttonColor}`}
        onClick={handleButtonClick}
        onMouseDown={() => setButtonColor('bg-green-500')} 
        onMouseUp={() => setButtonColor('')} 
      >Salvar alterações</button>
    </div>
  );
}

export default TextInput;
