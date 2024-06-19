
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



export const apiListUsersTasks = async (currentUser, taskState='0') => {
    if (taskState == null) {
        taskState = '0'
    }
    if (currentUser) {
        const tasksCollection = collection(db, 'users', currentUser.user_id, 'tasks')
        const q = query(tasksCollection, 
            where('state','==',taskState),
            orderBy("date_end", "asc"),
            limitToLast(15)
        )
        const querySnapshots = await getDocs(q)
        const resultados = querySnapshots.docs.map(
            (doc) => ({
                id: doc.id,
                ...doc.data()
            })
        )
        return resultados
    } else {
        return []
    }
}


export const apiRetriveTask = async (currentUser, taskId) => {
    if (currentUser) {
        const taskRef = doc(db, 'users', currentUser.user_id, 'tasks', taskId)
        try {
            const docSnap = await getDoc(taskRef)
            if (docSnap.exists()) {
                return docSnap.data()
            } else {
                return null
            }
        } catch(error) {
            console.log(error);
            return null
        }
    } else {
        return null
    }
}


export const apiGetSelectedTaskUser = async (currentUser) => {
    if (currentUser) {
        const tasksCollection = collection(db, 'users', currentUser.user_id, 'tasks')
        //
        const q = query(
            tasksCollection, 
            where("state", "==", "2"),
            orderBy("date_end", "asc"),
            limitToLast(1)
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
    } else {
        return []
    }
    
}


export const apiAddTasksUser = async (currentUser, dataTask) => {
    if (currentUser) {
        try {
            // referencia a la coleccion del usuario
            const userRef = doc(db, 'users', currentUser.user_id)
            // referencia  la coleccion task para agregar una atrea
            const taskRef = collection(userRef, 'tasks')
            // creamos nuevo documento para tasks
            await addDoc(taskRef, dataTask)
        } catch(error) {
            console.log(error)
        }
        
    }
    
}

export const apiUpdateTasksUser = async (currentUser, taskID, dataTask) => {
    if (currentUser) {
        try {
            // referencia  la coleccion task para agregar una atrea
            const taskRef = doc(db, 'users', currentUser.user_id, 'tasks', taskID)
            await updateDoc(taskRef, dataTask)
            return true;
        } catch(error) {
            console.log(error)
            return false
        }
        
    } else {
        return false
    }
}

export const apiDeleteTasksUser = async (currentUser, taskID, dataTask) => {
    if (currentUser) {
        try {
            // referencia  la coleccion task para agregar una atrea
            const taskRef = doc(db, 'users', currentUser.user_id, 'tasks', taskID)
            await deleteDoc(taskRef, dataTask)
        } catch(error) {
            console.log(error)
        }
        
    }
}


export const apiCountTasksCompleted = async (currentUser) => {
    if (currentUser) {
        const tasksCollection = collection(db, 'users', currentUser.user_id, 'tasks')
        const q = query(
            tasksCollection, 
            where('state','==', '1'),
            orderBy("date_end", "asc"),
        )
        // const querySnapshots = await getDocs(q)
        //
        const querySnapshot = await getDocs(q);
        return querySnapshot.size
    }
}
