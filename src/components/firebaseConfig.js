import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import {getAuth} from 'firebase/auth'
// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCtEr5HPLEttrMwmxTz_w4DEIRk1voLsP4",
    authDomain: "cevalogistics-df94d.firebaseapp.com",
    projectId: "cevalogistics-df94d",
    storageBucket: "cevalogistics-df94d.appspot.com",
    messagingSenderId: "485033663739",
    appId: "1:485033663739:web:64180364d2aacd947ee45e",
    measurementId: "G-97Z35HM25L"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)


const storage = getStorage(firebaseApp)

// here we can export reusable database references
export const eventsRef = collection(db, 'dechargements')
export const auth = getAuth()

export { storage }