import Link from 'next/link';
import { useAuth } from './context/auth';
import { logOut } from '@/lib/firebase/auth';
import styles from './header.module.css'
import { Fragment, useEffect, useState } from 'react';

export default function Header() {
    const { currentUser } = useAuth();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    function headerHandler() {
        if (currentUser && !loading) {
            return (
                    <span className={styles.navtab} onClick={() => logOut()}>Logout</span>
            )
        } else if (!loading) {
            return (
                <Fragment>
                    <Link className={styles.navtab} href="/login">Login</Link>

                    <Link className={styles.navtab} href="/signup">Sign Up</Link>
                </Fragment>
            )
        }
    }
    
    return (
        <header>
            <div className={styles.navbar}>
                <div className={styles.navtabs}>
                    <Link className={styles.navtab} href="/">Home</Link>
                    {headerHandler()}
                </div>
            </div>
        </header>
    );
}