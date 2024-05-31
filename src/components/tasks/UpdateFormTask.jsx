//
import { format } from 'date-fns';
//
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
// context
import {  SuccessContext } from '../../context/SuccessContext'
import { GlobalContext } from '../../context/GlobalContext.jsx';
// services
import { apiDeleteTasksUser } from "../../services/TaskServices"
import { apiRetriveTask, apiUpdateTasksUser } from "../../services/TaskServices";
// local apss
import LoadingApp from '../../apps/LoadingApp';
import FormTask from "./FormTask";

const UpdateFormTask = () => {
  const { user } = useContext(GlobalContext)
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
      const response = await apiRetriveTask(user, params.idTask)
      setDataTask(response)
      setLoad(false)
    }  
    loadTask()
  }, [])

  const updateDataTask = async (data) => {
    
    await apiUpdateTasksUser(user, params.idTask, data)
    setLoadSuccess(true)
    setInterval(() => {
      setLoadSuccess(false)
    }, 2000);
    
  }

  const deleteTask = () => {
    apiDeleteTasksUser(user, params.idTask)
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