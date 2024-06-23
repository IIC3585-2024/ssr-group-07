'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logIn } from "@/lib/firebase/auth";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await logIn(email, password)
            router.push("/")
        } catch (error) {
            console.error(error)
            if (error.code === "auth/user-not-found") {
                setErrorMessage("User not found")
            } else if (error.code === "auth/wrong-password") {
                setErrorMessage("Wrong password")
            } else if (error.code === "auth/invalid-email") {
                setErrorMessage("Invalid email")
            } else {
                setErrorMessage("An error occurred")
            }
        }
    }

    return (
        <main>
            <h1>Login</h1>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <form onSubmit={onSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </main>
    );
}