import { db } from  './FirebaseConfig.js'
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const apiListTask = async () => {
    const task = collection(db, 'Task')
    const queryTask = await getDocs(task)
    const taskList = queryTask.docs.map(doc => doc.data())
    return taskList
}

export const apiAddTask = async (task) => {
    const docRef = await addDoc(collection(db, 'Task'), task);
    return docRef
}
