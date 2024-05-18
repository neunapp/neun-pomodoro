//
import { format } from 'date-fns';
//
import { BiTask } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { MdDateRange } from "react-icons/md";

import { GlobalContext } from "../../context/UserProvider";
import { useState, useContext } from "react";

//local
import BaseForm from "../base/BaseForm";
import BaseSelectForm from "../base/BaseSelectForm";
// services
import { apiAddTask } from '../../services/TaskServices.js'


function FormTask() {
  const { user } = useContext(GlobalContext);
  
  const [titleTask, setTitleTask] = useState('')
  const [descriptionTask, setdescriptionTask] = useState('')
  const [dateTask, setdateTask] = useState('')
  const [sizeTask, setsizeTask] = useState('0')

  const optionsSizeTask = [
    {'id': 0,'value': 'S', 'text': 'S - Pequeño'},
    {'id': 1,'value': 'M', 'text': 'M - Medio'},
    {'id': 2,'value': 'L', 'text': 'L - Grande'},
    {'id': 3,'value': 'XL', 'text': 'XL - Muy Grande'},
  ]

  const enviarDatos = async () => {
    const ahora = format(new Date(), 'dd-MM-yyyy')
    console.log(titleTask, descriptionTask, dateTask, sizeTask, user.id, ahora);
    let data = {
      created: ahora,
      title: titleTask,
      description: descriptionTask,
      date_end: format(dateTask, 'dd-MM-yyyy'),
      size: sizeTask,
      user_id: user.id,
      state: 'En Proceso'
    }
    try {
      const response = apiAddTask(data)
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
    <form className="">
      <BaseForm
        tipo="text"
        placeholder="Tarea..." 
        icon={<BiTask />}
        value={titleTask}
        onChange={(value) => {setTitleTask(value)}}
      />
      <BaseForm
        tipo="text"
        placeholder="Descripcion..."
        icon={<MdOutlineDescription />} 
        value={descriptionTask}
        onChange={(value) => {setdescriptionTask(value)}}
      />
      <BaseForm
        tipo="date"
        placeholder="Descripcion..." 
        icon={<MdDateRange />}
        value={dateTask}
        onChange={(value) => {setdateTask(value)}}
      />
      <label className="label">Tamaño:</label>
      <BaseSelectForm 
        options={optionsSizeTask}
        value={sizeTask}
        onChange={(value) => {setsizeTask(value)}}
      />
      <div className="is-flex is-justify-content-center  p-2 mt-6">
        <button 
          type="button"
          onClick={enviarDatos}
          className="button is-info is-rounded is-fullwidth"
        >
            Agregar Tarea
        </button>
      </div>
    </form>
  );
}

export default FormTask;