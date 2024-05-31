import { db } from  './FirebaseConfig.js'
import { 
    doc,
    collection,
    addDoc,
} from 'firebase/firestore';


export const apiAddTimes = async (timeObj) => {
    const docRef = await addDoc(collection(db, 'Times'), timeObj);
    return docRef
}

export const apiAddTinesUser = async (currentUser, dataTime) => {
    if (currentUser) {
        try {
            // referencia a la coleccion del usuario
            const userRef = doc(db, 'users', currentUser.user_id)
            // referencia  la coleccion task para agregar una atrea
            const timeRef = collection(userRef, 'times')
            // creamos nuevo documento para tasks
            await addDoc(timeRef, dataTime)
            console.log('datos guardados')
        } catch(error) {
            console.log(error)
        }
        
    } else {
        console.log('error: no hay un usuario')
    }
    
}

