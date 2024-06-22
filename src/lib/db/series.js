'use server'
import { db } from "../firebase/config";

export const fetchSeries = async (id) => {
    const doc = await db.collection("series").doc(id).get();
    setSeries(doc.data());
    setLoading(false);
}
export const fetchComments = async (id) => {
    const snapshot = await db.collection("comments").where("seriesId", "==", id).get();
    const data = snapshot.docs.map(doc => doc.data());
    setComments(data);
}
export const addComment = async (id, comment, rating) => {
    await db.collection("comments").add({
        seriesId: id,
        content: comment,
        rating
    });
}
