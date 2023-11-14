import app from './firebase';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

const firestore = getFirestore(app);

const createData = async (collectionName: string, data: any, index:number) => {
    console.log("createData", collectionName, data, index);
    const item = await readData(collectionName, index.toString());
    if (item) {
        console.log("update");
        const docRef = doc(firestore, collectionName, index.toString());
        await updateDoc(docRef, data);
    } else {
        console.log("create");
        const docRef = doc(firestore, collectionName, index.toString());
        await setDoc(docRef, data);
    }
    return readAllData(collectionName);
}

const readData = async (collectionName: string, id: string) => {
    const docRef = doc(firestore, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

const readAllData = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    const data = querySnapshot.docs.map(doc => doc.data());
    data.forEach((item, index) => {
        if (Object.values(item).includes("")) {
            deleteData(collectionName, index.toString());
        }
    });
    return data;
}

const deleteData = async (collectionName: string, id: string) => {
    await deleteDoc(doc(firestore, collectionName, id));
}

export { createData, readData, readAllData, deleteData, useCollection };