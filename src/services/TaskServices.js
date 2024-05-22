import { db } from  './FirebaseConfig.js'
import { 
    collection,
    doc, 
    getDocs, 
    addDoc,
    getDoc,
    deleteDoc,
    query, 
    where, 
    limitToLast,
    orderBy,
    updateDoc 
} from 'firebase/firestore';

export const apiListTask = async () => {
    const task = collection(db, 'Task')
    //
    const q = query(
        task, 
        where("state", "==", "0"),
        orderBy("date_end", "asc"),
        limitToLast(15)
    );
    const querySnapshots = await getDocs(q)
    return querySnapshots.docs.map(
        (doc) => {
             return {
                id: doc.id,
                ...doc.data()
              }
        } 
    )
}

export const apiAddTask = async (task) => {
    const docRef = await addDoc(collection(db, 'Task'), task);
    return docRef
}

export const apiDeleteTask = async (taskId) => {
    await deleteDoc(doc(db, 'Task', taskId));
    return true;
}


export const apiGetTask = async (taskId) => {
    const docRef = doc(db, 'Task', taskId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}

export const apiUpdateTask = async (taskId, data) => {
    const docRef = doc(db, 'Task', taskId)
    await updateDoc(docRef, data)
    return true;
}