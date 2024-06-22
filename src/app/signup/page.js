'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/firebase/auth";

export default function SignInPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(name, email, password)
            router.push("/");
        } catch (error) {
            console.error(error);
            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("Email already in use")
            } else if (error.code === "auth/weak-password") {
                setErrorMessage("Password is too weak")
            } else if (error.code === "auth/invalid-email") {
                setErrorMessage("Invalid email")
            } else {
                setErrorMessage("An error occurred")
            }
        }
    }

    // change error message in case of error



    return (
        <div>
            <h1>Register</h1>
            {errorMessage && <div className="error">{errorMessage}</div>
            }
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder=""
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder=""
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder=""
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}