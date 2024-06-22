import { auth } from '../../lib/firebase/config';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';

export const signIn = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile( userCredential.user, {
            displayName: name
        });
        return userCredential;
    } catch (error) {
        return error;
    }
}

export const logIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        return error;
    }
}

export const logOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        return error;
    }
}