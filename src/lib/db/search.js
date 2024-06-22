'use server';
import { db } from "../firebase/config";

export const search = async (title, genre, service, rating) => {
    let query = db.collection("series");
    if (title) {
        query = query.where("title", "==", title);
    }
    if (genre) {
        query = query.where("genre", "==", genre);
    }
    if (service) {
        query = query.where("service", "==", service);
    }
    if (rating) {
        query = query.where("rating", ">=", rating);
    }
    const snapshot = await query.get();
    const data = snapshot.docs.map(doc => doc.data());
    return data;
}