import Link from 'next/link';
import { useAuth } from './context/auth';
import { logOut } from '../lib/firebase/auth';

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
                            <span onClick={() => logOut()}>Logout</span>
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