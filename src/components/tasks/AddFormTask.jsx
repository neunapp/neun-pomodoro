import { useNavigate } from "react-router-dom";
// services
import { apiAddTasksUser } from '../../services/TaskServices.js'
import { getUserStorage } from "../../services/userServices.js";
import FormTask from "./FormTask"

const AddFormTask = () => {
  const navigate = useNavigate();

  const saveNewData = async (data) => {
    const currentUser = getUserStorage()
    await apiAddTasksUser(currentUser, data)
    navigate("/task")
  }
  
  return(
    <>
      <FormTask saveFunction={saveNewData}/>
    </>
  )
}

export default AddFormTask