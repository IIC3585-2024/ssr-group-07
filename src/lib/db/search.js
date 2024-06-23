'use server';
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";

export const search = async (title, genre, service, rating) => {
    const seriesRef = collection(db, "series");
    let queries = [];
    if (title) {
        queries.push(where("title", "==", title));
    }
    if (genre) {
        queries.push(where("genre", "==", genre));
    }
    if (service) {
        queries.push(where("service", "==", service));
    }
    if (rating) {
        queries.push(where("rating", ">=", rating));
    }
    const q = query(seriesRef, ...queries);
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => doc.data());
    return data;
}