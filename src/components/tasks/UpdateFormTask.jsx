//
import { format } from 'date-fns';
//
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
// context
import {  SuccessContext } from '../../context/SuccessContext'
// services
import { apiDeleteTask } from "../../services/TaskServices"
import { apiGetTask } from "../../services/TaskServices";
import { apiUpdateTask } from '../../services/TaskServices';
// local apss
import LoadingApp from '../../apps/LoadingApp';
import FormTask from "./FormTask";

const UpdateFormTask = () => {
  const { 
    _,
    setLoadSuccess
  } = useContext(SuccessContext)
  const params = useParams()
  const navigate = useNavigate();
  // local state
  let [dataTask, setDataTask] = useState({
    title: "",
    description: "",
    state: '',
    date_end: format(new Date(), 'yyyy-MM-dd'),
    size: ''

  })
  const [ load, setLoad ] = useState(false)

  useEffect(() => {
    const loadTask = async () => {
      setLoad(true)
      console.log('-- retive task --')
      const response = await apiGetTask(params.idTask)
      setDataTask(response)
      setLoad(false)
    }  
    loadTask()
  }, [])

  const updateDataTask = async (data) => {
    console.log('actualizando');
    
    await apiUpdateTask(params.idTask, data)
    setLoadSuccess(true)
    setInterval(() => {
      setLoadSuccess(false)
    }, 2000);
    
  }

  const deleteTask = () => {
    apiDeleteTask(params.idTask)
    navigate("/task");
  }

  return(
    <>
      { load ? <LoadingApp /> : null } 
      <FormTask 
        saveFunction={updateDataTask} 
        isUpdate={true} 
        deleteFunction={deleteTask}
        dataTask={ dataTask } 
      />
    </>
  )
}

export default UpdateFormTask;