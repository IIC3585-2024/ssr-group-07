import Link from 'next/link';
import { useAuth } from './context/auth';

export default function Header() {
    const { currentUser } = useAuth();
    return (
        <header>
            <nav>
                <div>
                    <Link href="/">
                        Home
                    </Link>
                    {currentUser ? (
                        <div>
                            <Link href="/search">
                                Search
                            </Link>
                            <Link href="/add-series">
                                Add
                            </Link>
                            <Link href="/logout">
                                Logout
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link href="/login">
                                Login
                            </Link>
                            <Link href="/signup">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}