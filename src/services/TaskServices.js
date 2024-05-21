import { db } from  './FirebaseConfig.js'
import { 
    collection, 
    getDocs, 
    addDoc,
    query, 
    where, 
    getDoc,
    limitToLast,
    orderBy
} from 'firebase/firestore';

export const apiListTask = async () => {
    const task = collection(db, 'Task')
    //
    const q = query(
        task, 
        where("state", "==", "En Proceso"),
        orderBy("date_end", "desc"),
        limitToLast(10)
    );
    const querySnapshots = await getDocs(q)
    return querySnapshots.docs.map(doc => doc.data())
}

export const apiAddTask = async (task) => {
    const docRef = await addDoc(collection(db, 'Task'), task);
    return docRef
}
