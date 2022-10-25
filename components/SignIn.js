import styles from '../styles/components/SignIn.module.css';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Input from './Input';
import { useSignInEmailPassword } from '@nhost/nextjs'
import { showNotification } from '@mantine/notifications'


const SignIn = () => {
  const router = useRouter()
  const { signInEmailPassword } = useSignInEmailPassword()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const result = await signInEmailPassword(email, password)
    if (result.isError) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: result.error.message
      })
    } else if (result.needsEmailVerification) {
      showNotification({
        color: 'red',
        title: 'Error',
        message:
          'You need to verify your email first. Please check your mailbox and follow the confirmation link to complete the registration.'
      })
    } else {
      router.replace('/')
    }
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    signIn();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles['logo-wrapper']}>
          <Image src="/logo.svg" alt="logo" layout="fill" objectFit="contain" />
        </div>

        <form onSubmit={handleOnSubmit} className={styles.form}>
          <Input
            type="email"
            label="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.button}>
            Sign in
          </button>
        </form>
      </div>

      <p className={styles.text}>
        No account yet?{' '}
        <Link href="/sign-up">
          <a className={styles.link}>Sign up</a>
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
