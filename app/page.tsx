"use client";

import styles from "./page.module.css";
import ArgentWallet from "./components/ArgentWallet";
import CocosGame from "./components/CocosGame";

export default function Home(): JSX.Element {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ArgentWallet />
        <CocosGame />
      </main>
    </div>
  );
}
