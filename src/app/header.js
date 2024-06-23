import Link from 'next/link';
import { useAuth } from './context/auth';
import { logOut } from '@/lib/firebase/auth';
import styles from './header.module.css'

export default function Header() {
    const { currentUser } = useAuth();
    
    return (
        <header>
            {currentUser ? (
            <div className={styles.navbar}>
                <div className={styles.navtabs}>
                    <Link className={styles.navtab} href="/">Home</Link>
                    
                    <Link className={styles.navtab} href="/search">Search</Link>
                
                    <Link className={styles.navtab} href="/add-series">Add Serie</Link>
                
                    <span className={styles.navtab} onClick={() => logOut()}>Logout</span>
                </div>
            </div>    
            ) : (
            <div className={styles.navbar}>
                <div className={styles.navtabs}>
                    <Link className={styles.navtab} href="/">Home</Link>

                    <Link className={styles.navtab} href="/login">Login</Link>

                    <Link className={styles.navtab} href="/signup">Sign Up</Link>
                </div>
            </div>
            )}
        </header>
    );
}