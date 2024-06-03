import { subDays, startOfDay, format} from 'date-fns'
import { db } from  './FirebaseConfig.js'
import { 
    collection,
    doc, 
    getDocs, 
    addDoc,
    query, 
    where, 
    orderBy,
} from 'firebase/firestore';


export const apiAddTimes = async (timeObj) => {
    const docRef = await addDoc(collection(db, 'Times'), timeObj);
    return docRef
}

export const apiAddTimesUser = async (currentUser, dataTime) => {
    if ((currentUser) && (dataTime.time > 0)) {
        try {
            // referencia a la coleccion del usuario
            const userRef = doc(db, 'users', currentUser.user_id)
            // referencia  la coleccion task para agregar una atrea
            const timeRef = collection(userRef, 'times')
            // creamos nuevo documento para tasks
            await addDoc(timeRef, dataTime)
            console.log('--datos guardados--')
        } catch(error) {
            console.log(error)
        }
        
    } else {
        console.log('error: no hay un usuario')
    }
    
}

export const apiSumTimeHours = async (currentUser) => {
    if (currentUser) {
        const timesCollection = collection(db, 'users', currentUser.user_id, 'times');
        const q = query(
            timesCollection, 
            orderBy('date', 'asc')
        );
        
        const querySnapshot = await getDocs(q);
        let totalSeconds = 0;

        querySnapshot.forEach((doc) => {
            totalSeconds += doc.data().time;
        });

        return totalSeconds;
    } else {
        return 0;
    }
};


export const apiSumTaskHoursLast7Days = async (currentUser) => {
    if (currentUser) {
        const timesCollection = collection(db, 'users', currentUser.user_id, 'times');

        // Obtener la fecha de hace 7 días y la fecha de hoy
        const today = new Date();
        const sevenDaysAgo = subDays(today, 7);

        // Ajustar las fechas al inicio y fin del día para abarcar todo el rango
        const startOfPeriod = format(sevenDaysAgo, 'yyyy-MM-dd');
        const endOfPeriod = format(today, 'yyyy-MM-dd');

        const q = query(
            timesCollection, 
            where('date', '>=', startOfPeriod),
            where('date', '<=', endOfPeriod),
            orderBy('date', 'asc')
        );

        const querySnapshot = await getDocs(q);
        let totalSeconds= 0;

        querySnapshot.forEach((doc) => {
            totalSeconds += doc.data().time;
        });

        //
        return totalSeconds
    } else {
        return 0;
    }
};