import Link from 'next/link';
import { useAuth } from './context/auth';
import { logOut } from '@/lib/firebase/auth';
import './header.module.css'

export default function Header() {
    const { currentUser } = useAuth();
    return (
        <header>
            <nav className='navbar'>
                <div className='nav-tab'>
                    <Link href="/">Home</Link>
                </div>
                {currentUser ? (
                    <div className='tabs-container'>
                        <div className='nav-tab'>
                            <Link href="/search">Search</Link>
                        </div>
                        <div className='nav-tab'>
                            <Link href="/add-series">Add</Link>
                        </div>
                        <div className='nav-btn'>
                            <span onClick={() => logOut()}>Logout</span>
                        </div>
                    </div>
                ) : (
                    <div className='sesion-buttons'>
                        <div className='nav-btn'>
                            <Link href="/login">Login</Link>
                        </div>
                        <div className='nav-btn'>
                            <Link href="/signup">Sign Up</Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}