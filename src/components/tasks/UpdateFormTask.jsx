import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import FormTask from "./FormTask";
// services
import { apiDeleteTask } from "../../services/TaskServices";

const UpdateFormTask = () => {
  const params = useParams()
  const navigate = useNavigate();

  const updateData = (data) => {
    console.log(data)
  }

  useEffect(() => {
    const loadTask = () => {
      console.log('-- retive task --')
      console.log(params.idTask)
    }  
    loadTask()
  }, [])

  const deleteTask = () => {
    apiDeleteTask(params.idTask)
    navigate("/task");
  }

  return(
    <>
      <FormTask saveFunction={updateData} isUpdate={true} deleteFunction={deleteTask} />
    </>
  )
}

export default UpdateFormTask;