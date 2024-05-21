//
import { useState, useEffect } from 'react'
// components
import LoadingApp from '../../apps/LoadingApp';
// services
import { apiListTask } from '../../services/TaskServices.js'
//
import TaskCard from "./TaskCard"


const LisTask = () => {
    let [listTask, setListTask] = useState([])
    let [load, setLoad] = useState(false)
    useEffect(() => {
        const loadTaskApi = async () => {
          setLoad(true)
          const resultado = await apiListTask()
          setListTask(resultado)
          setLoad(false)
        }
        loadTaskApi()
    }, [])

    return (
        <>
        {load ? <LoadingApp /> : null }
        {
            listTask.map((_, index) => {
                return (
                    <TaskCard key={index} task={listTask[index]} />
                )
            })
        }
        </>
    )
}

export default LisTask