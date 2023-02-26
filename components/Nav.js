import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


export default function Nav() {

    return (
        <nav className={styles.nav}>
            <Image src="/favicon.png" alt="Volunteer Database" width={50} height={50} />
            <Link href="/">
                <a className={styles.navItem}>Home</a>
            </Link>
            <Link href="/signup">
                <a className={styles.navItem}>Sign Up</a>
            </Link>
            <Link href="/login">
                <a className={styles.navItem}>Login</a>
            </Link>
            <Link href="/new">
                <a className={styles.navItem}>Add a Volunteer</a>
            </Link>
            <Link href="/all">
                <a className={styles.navItem}>All Volunteers</a>
            </Link>
        </nav>
    )

}