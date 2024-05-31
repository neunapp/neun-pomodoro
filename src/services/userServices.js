import { db } from  './FirebaseConfig.js'
import { 
    doc,
    collection,
    addDoc,
    setDoc
} from 'firebase/firestore';

export const getUserStorage = () => {
  // recuepramos objeto
  const userPomodoro = localStorage.getItem("userPomodoro")
  
  // si existe convertimos la cadena a json
  if (userPomodoro) {
    const currentUser = JSON.parse(userPomodoro)
    return currentUser
  } else {
    return null
  }
}

export const apiAddUsers = async (currentUser) => {
    // const docRef = await addDoc(collection(db, 'Times'), timeObj);

    const userUID = currentUser.uid
    const userDocRef = doc(db, "users", userUID);
    const userData = {
      email: currentUser.email,
      name: currentUser.displayName || "Default Name"
    }

    try {
      await setDoc(userDocRef, userData, { merge: true });
      console.log("User data saved successfully.");
      return true
    } catch (error) {
      console.error("Error saving user data: ", error);
      return false
    }
}