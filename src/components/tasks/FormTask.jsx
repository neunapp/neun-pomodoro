//
import { format, isValid, parseISO } from 'date-fns';
//

import { BiTask } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { MdDateRange } from "react-icons/md";

import { GlobalContext } from "../../context/UserProvider";
import { useState, useContext, useEffect } from "react";

//local
import LoadingApp from '../../apps/LoadingApp';
import BaseForm from "../base/BaseForm";
import BaseSelectForm from "../base/BaseSelectForm";
// services



function FormTask(props) {
  const [load, setLoad] = useState(false) 
  const { user } = useContext(GlobalContext);
  const [titleTask, setTitleTask] = useState('')
  const [descriptionTask, setdescriptionTask] = useState('')
  const ahora = format(new Date(), 'yyyy-MM-dd')
  const [dateTask, setdateTask] = useState(ahora)
  const [sizeTask, setsizeTask] = useState('S')
  const [stateTask, setstateTask] = useState('0')
  const [errorForm, setErrorForm] = useState('')

  const optionsSizeTask = [
    {'id': 0,'value': 'S', 'text': 'S - Pequeño'},
    {'id': 1,'value': 'M', 'text': 'M - Medio'},
    {'id': 2,'value': 'L', 'text': 'L - Grande'},
    {'id': 3,'value': 'XL', 'text': 'XL - Muy Grande'},
  ]

  const optionsStateTask = [
    {'id': 0,'value': '0', 'text': 'En Proceso'},
    {'id': 1,'value': '1', 'text': 'Terminado'},
    {'id': 2,'value': '2', 'text': 'Pendiente'},
    {'id': 3,'value': '3', 'text': 'Otro'},
  ]

  const esFechaValida = (fecha) => {
    const fechaObjeto = parseISO(fecha);
    return isValid(fechaObjeto);
  }
  const isValidForm = () => {
    if ((titleTask.trim().length < 4) || (descriptionTask.trim().length < 4) || (!esFechaValida(dateTask))) {
      setErrorForm('Datos incorrectos...')
      return false
    } else {
      setErrorForm('')
      return true
    }
  }

  useEffect(() => {
    
    const getDataUpdate = async () => {
      if (props.isUpdate && props.dataTask) {
        console.log('-- asignar datos --')
        setTitleTask(props.dataTask.title)
        setdescriptionTask(props.dataTask.description)
        // setdateTask(format(props.dataTask.date_end, 'yyyy-MM-dd'))
        setsizeTask(props.dataTask.size)
        setstateTask(props.dataTask.state)
        
      }
    }  
    getDataUpdate()
  }, [props.dataTask])

  const saveData = async () => {
    if (isValidForm()) {
      setLoad(true)
      let data = {
        created: ahora,
        title: titleTask,
        description: descriptionTask,
        date_end: format(dateTask, 'dd-MM-yyyy'),
        size: sizeTask,
        user_id: user.id,
        state: '0'
      }
      try {
        await props.saveFunction(data)
        setLoad(false)
      } catch (error) {
        setLoad(false)
        console.log(error)
      }
    }
    
  }

  const deleteTask = () => {
    setLoad(true)
    console.log('---- eliminando tarea ---')
    props.deleteFunction()
    setLoad(false)
  }
  
  const btnDeleteTask = () => {
    return(
      <div className="is-flex is-justify-content-center  p-2 mt-6">
        <button
          type="button"
          className="button is-danger is-rounded is-fullwidth"
          onClick={deleteTask}>
            Eliminar
        </button>
      </div>
    )
  }

  return (
    <>
      { load ? <LoadingApp /> : null } 
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
          placeholder="fecha..." 
          icon={<MdDateRange />}
          value={dateTask}
          onChange={(value) => {setdateTask(value)}}
        />

        <p className='is-flex is-justify-content-center has-text-danger'>{ errorForm }</p>

        <label className="label">Tamaño:</label>
        <BaseSelectForm 
          options={optionsSizeTask}
          value={sizeTask}
          onChange={(value) => {setsizeTask(value)}}
        />
        <label className="label m-1">Estado:</label>
        <BaseSelectForm 
          options={optionsStateTask}
          value={stateTask}
          onChange={(value) => {setstateTask(value)}}
        />
      </form>
      <div className="is-flex is-justify-content-center  p-2 mt-6">
        <button
          type="button"
          className="button is-info is-rounded is-fullwidth"
          onClick={saveData}>
            Guadar Tarea
        </button>
      </div>
      { props.isUpdate ? btnDeleteTask() : '' }
    </>
  );
}

export default FormTask;