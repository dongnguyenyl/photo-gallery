import { useState, useEffect } from 'react'
import {firestore} from '../firebase.js'

const useFireStore = (collection) => {
    const [docs, setDocs] = useState(null)


    useEffect(() => {
        const unsub = firestore.collection(collection).orderBy('createdAt', 'desc').onSnapshot((snap) =>{
            let documents = [];
            snap.forEach(doc => {
            documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
            console.log('reload')
        })
        return () => unsub()
    },[collection])

    return docs
}

export default useFireStore