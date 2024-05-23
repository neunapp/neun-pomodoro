//
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
// components
import LoadingApp from '../../apps/LoadingApp';
// services
import { apiListTask } from '../../services/TaskServices.js'
//
import TaskCard from "./TaskCard"


const LisTask = () => {
    const [searchParams] = useSearchParams();

    let [listTask, setListTask] = useState([])
    let [load, setLoad] = useState(false)

    useEffect(() => {
        const loadTaskApi = async () => {
          console.log('--cargando tasks --')
          const paramstate = searchParams.get('paramState');
          setLoad(true)
          const resultado = await apiListTask(paramstate)
          setListTask(resultado)
          setLoad(false)
        }
        loadTaskApi()
        
    }, [searchParams])

    return (
        <>
        {load ? <LoadingApp /> : null }
        { listTask.length > 0 ? (
            listTask.map((_, index) => {
                return (
                    <TaskCard key={index} task={listTask[index]} />
                )
            })
        ) : <p className='has-text-warning is-size-4'>No hay tareas</p> }
        </>
    )
}

export default LisTask