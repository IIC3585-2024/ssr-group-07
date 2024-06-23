import { auth } from '../../lib/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';

export const signIn = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile( userCredential.user, {
        displayName: name
    });
    return userCredential;
}

export const logIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
}

export const logOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        return error;
    }
}