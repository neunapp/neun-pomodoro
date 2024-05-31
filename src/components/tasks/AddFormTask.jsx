import { useNavigate } from "react-router-dom";
import { useContext } from "react";
//
import { GlobalContext } from '../../context/GlobalContext.jsx';
// services
import { apiAddTasksUser } from '../../services/TaskServices.js'
import FormTask from "./FormTask"

const AddFormTask = () => {
  const { user } = useContext(GlobalContext)
  const navigate = useNavigate();

  const saveNewData = async (data) => {
    await apiAddTasksUser(user, data)
    navigate("/task")
  }
  
  return(
    <>
      <FormTask saveFunction={saveNewData}/>
    </>
  )
}

export default AddFormTask