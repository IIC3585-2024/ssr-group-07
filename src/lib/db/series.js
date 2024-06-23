'use server'
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";

export const fetchSeries = async (id) => {
    const docRef = doc(db, "series", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}
export const fetchComments = async (id) => {
    const query = collection(db, "comments");
    const snapshot = await getDocs(query);
    const data = snapshot.docs.map(doc => doc.data());
    return data;
}

export const addComment = async (id, comment, rating) => {
    await addDoc(collection(db, "comments"), {
        seriesId: id,
        comment,
        rating
    });

    // change rating of series
    const seriesRef = doc(db, "series", id);
    const seriesDoc = await getDoc(seriesRef);
    const seriesData = seriesDoc.data();
    const newRating = (seriesData.rating * seriesData.rating_count + rating) / (seriesData.rating_count + 1);
    const newRatingCount = seriesData.rating_count + 1;
    await updateDoc(seriesRef, {
        rating: newRating,
        rating_count: newRatingCount
    });
}

export const addSeries = async (seriesId, title, rating, rating_count, description, genres) => {
    await addDoc(collection(db, "series"), {
        seriesId,
        title,
        rating,
        rating_count,
        description,
        genres
    });
}
