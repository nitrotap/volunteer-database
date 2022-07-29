import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Copyright from '../components/Copyright'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Volunteer Database</title>
        <meta name="description" content="Manage your volunteers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Volunteer Database
        </h1>

        <p className={styles.description}>
          Create an account to manage your volunteers.
        </p>

        <div className={styles.grid}>
          <a href="/signup" className={styles.card}>
            <h2>Sign-Up &rarr;</h2>
            <p>Make an Account!</p>
          </a>

          <a href="/login" className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>Already have an account? Log in to pick up where you left off!</p>
          </a>

          <a
            href="/new"
            className={styles.card}
          >
            <h2>Add a volunteer &rarr;</h2>
            <p>Go straight to adding another great volunteer!</p>
          </a>

          <a
            href="/all"
            className={styles.card}
          >
            <h2>All Volunteers &rarr;</h2>
            <p>
              View all your volunteers!
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <Copyright />
      </footer>
    </div>
  )
}
