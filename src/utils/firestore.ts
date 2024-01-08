import app from "./firebase";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const firestore = getFirestore(app);

const createData = async (collectionName: string, data: any, index: number) => {
  const item = await readData(collectionName, index.toString());
  if (item) {
    console.log("update", data, index);
    const docRef = doc(firestore, collectionName, index.toString());
    await updateDoc(docRef, data);
  } else {
    console.log("create", data, index);
    const docRef = doc(firestore, collectionName, index.toString());
    await setDoc(docRef, data);
  }
  return readAllData(collectionName);
};

const readData = async (collectionName: string, id: string) => {
  const docRef = doc(firestore, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

const readAllData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  // check if all key in doc empty delete doc
  data.forEach((doc: { [key: string]: any }, index: number) => {
    let isEmpty = true;
    Object.keys(doc).forEach((key) => {
      if (doc[key] !== "" && key !== "id") {
        isEmpty = false;
      }
    });
    if (isEmpty) {
      deleteData(collectionName, index.toString());
    }
  });
  return data;
};

const deleteData = async (collectionName: string, id: string) => {
  console.log("delete", id);
  await deleteDoc(doc(firestore, collectionName, id));
};

export { createData, readData, readAllData, deleteData, useCollection };
