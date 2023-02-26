import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Copyright from '../components/Copyright'
import { Box, Button, Container } from '@mui/material'

export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>Volunteer Database</title>
        <meta name="description" content="Manage your volunteers!" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Volunteer Database
        </h1>

        <p className={styles.description}>
          Create an account to manage your volunteers.
        </p>

        <Container style={{ width: '100vw' }}>
          <Box>
            <Button style={{ width: '75vw' }}>
              <Link href="/signup">
                <Box>
                  <div className={styles.grid}>
                    <h2>Sign-Up</h2>
                  </div>
                  <div className={styles.grid}>
                    <p>Make an Account!</p>
                  </div>
                </Box>
              </Link>
            </Button>

            <Box>
              <Button style={{ width: '75vw' }}>
                <Link href="/login" className={styles.card}>
                  <div>
                    <h2>Login</h2>
                    <p>Already have an account? Log in to pick up where you left off!</p>

                  </div>
                </Link>

              </Button>
            </Box>


            <Box>
              <Button style={{ width: '75vw' }}>
                <Link
                  href="/new"
                  className={styles.card}
                >
                  <div>
                    <h2>Add a volunteer</h2>
                    <p>Go straight to adding another great volunteer!</p>


                  </div>
                </Link>

              </Button>
            </Box>

            <Box>
              <Button style={{ width: '75vw' }}>
                <Link
                  href="/all"
                  className={styles.card}
                >
                  <div>
                    <h2>All Volunteers</h2>
                    <p>
                      View all your volunteers!
                    </p>

                  </div>
                </Link>

              </Button>
            </Box>

          </Box>
        </Container>
      </main>

      <footer className={styles.footer}>
        <Copyright />
      </footer>
    </div>
  )
}
