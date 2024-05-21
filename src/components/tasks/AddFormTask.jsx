import { useNavigate } from "react-router-dom";
// services
import { apiAddTask } from '../../services/TaskServices.js'
import FormTask from "./FormTask"

const AddFormTask = () => {
  const navigate = useNavigate();
  const saveNewData = async (data) => {
    console.log('*******', data)
    await apiAddTask(data)
    navigate("/task");
  }
  
  return(
    <>
      <FormTask saveFunction={saveNewData}/>
    </>
  )
}

export default AddFormTask