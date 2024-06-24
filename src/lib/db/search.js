'use server';
import getSeriesByName from "../api/getSeriesByName";
import getSeriesByGenre from "../api/getSeriesByGenre";

import { db } from "../firebase/config";
import { collection, addDoc, getDocs, getDoc, doc, query, where, orderBy, or } from "firebase/firestore";
import getGenres from "../api/getGenres";

export const search = async (text, queryField, rating, order) => {
    console.log(text, queryField, rating, order);

    if (!text && !rating && !order) {
        return [];
    }

    if (text.length > 0 && queryField === "title") {
        // get series by name
        const series = await getSeriesByName(text);

        // shrink data to just id, name, genre_names, and poster_path
        let seriesData = await shrinkData(series);
        
        // get db data
        const seriesRef = collection(db, "series");
        let queries = [];
        queries.push(where("rating", ">=", rating));
        const q = query(seriesRef, queries);
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());

        // merge data
        seriesData = mergeData(seriesData, data);

        if (rating) {
            // only show series with rating >= rating
            const filteredData = seriesData.filter(series => series.rating >= rating);
            return filteredData;
        }

        if (order) {
            // sort by rating
            if (order === "asc") {
                const sortedData = seriesData.sort((a, b) => a.rating - b.rating);
                return sortedData;
            } else {
                const sortedData = seriesData.sort((a, b) => b.rating - a.rating);
                return sortedData;
            }
        }

        return mergedData;
    } else if (text.length > 0 && queryField === "genre") {
        //get genre id
        const genreId = await getGenreId(text);

        // get series by genre
        const series = await getSeriesByGenre(genreId);

        // shrink data to just id, name, genre_names, and poster_path
        let seriesData = await shrinkData(series);

        // get db data
        const seriesRef = collection(db, "series");
        let queries = [];
        queries.push(where("genres", "array-contains", text));
        if (rating) {
            queries.push(where("rating", ">=", parseInt(rating)));
        }
        const q = query(seriesRef, queries);
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        // merge data
        const joinedData = await joinData(seriesData, data, text);

        if (rating) {
            // only show series with rating >= rating
            const filteredData = joinedData.filter(series => series.rating >= rating);
            return filteredData;
        }

        if (order) {
            if (order === "asc") {
                const sortedData = joinedData.sort((a, b) => a.rating - b.rating);
                console.log(joinedData);
                return sortedData;
            } else {
                const sortedData = joinedData.sort((a, b) => b.rating - a.rating);
                return sortedData;
            }
        }

        return joinedData;
    } else if (rating) {
        // get db data
        const seriesRef = collection(db, "series");
        const q = query(seriesRef, where("rating", ">=", parseInt(rating)));
        if (order) {
            if (order === "asc") {
                orderBy("rating");
            } else {
                orderBy("rating", "desc");
            }
        }
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        return data;
    }
    return [];
}

async function shrinkData(series) {
    return series.map(series => {
        return {
            id: series.id,
            title: series.name,
            genres: series.genre_names,
            poster_path: series.poster_path
        }
    });
}

function mergeData(seriesData, dbData) {
    return seriesData.map(series => {
        const data = dbData.find(data => parseInt(data.seriesId) === parseInt(series.id));
        if (data) {
            return {
                ...series,
                rating: data.rating,
                rating_count: data.rating_count
            }
        }
        return {
            ...series,
            rating: 0,
            rating_count: 0
        }
    });
}

async function joinData(seriesData, dbData, text) {
    // join data, with parts from seriesData and dbData
    const firstData = seriesData.map(series => {
        const data = dbData.find(data => data.seriesId === series.id);
        if (data) {
            return {
                ...series,
                rating: data.rating,
                rating_count: data.rating_count
            }
        }
        return {
            ...series,
            rating: 0,
            rating_count: 0
        }
    });
    // add data not in seriesData
    const secondData = dbData.map(data => {
        const series = seriesData.find(series => series.id === data.seriesId);
        if (!series && data.genres.includes(text)) {
            return {
                id: data.seriesId,
                title: data.title,
                genres: data.genres.join(", "),
                poster_path: data.poster_path,
                rating: data.rating,
                rating_count: data.rating_count
            } 
        }
        return null;
    }).filter(data => data !== null);
    return [...firstData, ...secondData];
}

async function getGenreId(genre) {
    const genreData = await getGenres();
    const genreId = genreData.find(g => g.name === genre).id;
    return genreId;
}