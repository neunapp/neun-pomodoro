import FormTask from "./FormTask";

const UpdateFormTask = () => {
  const updateData = (data) => {
    console.log(data)
  }
  return(
    <>
      <FormTask saveFunction={updateData}/>
    </>
  )
}

export default UpdateFormTask;