//
import { format } from 'date-fns';
//
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
// context
import {  SuccessContext } from '../../context/SuccessContext'
// services
import { apiDeleteTasksUser } from "../../services/TaskServices"
import { apiRetriveTask, apiUpdateTasksUser } from "../../services/TaskServices";
import { getUserStorage } from "../../services/userServices.js";
// local apss
import LoadingApp from '../../apps/LoadingApp';
import FormTask from "./FormTask";

const UpdateFormTask = () => {
  const currentUser = getUserStorage()
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
      const response = await apiRetriveTask(currentUser, params.idTask)
      setDataTask(response)
      setLoad(false)
    }  
    loadTask()
  }, [])

  const updateDataTask = async (data) => {
    console.log('actualizando');
    
    await apiUpdateTasksUser(currentUser, params.idTask, data)
    setLoadSuccess(true)
    setInterval(() => {
      setLoadSuccess(false)
    }, 2000);
    
  }

  const deleteTask = () => {
    apiDeleteTasksUser(currentUser, params.idTask)
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