import ContactModal from "@/components/ContactModal/ContactModal";

import styles from "./App.module.css";

export default function App() {
  return (
    <main className={styles.main}>
      <ContactModal submit={(e: any) => console.log("Submitted!", e)} />
    </main>
  );
}
