import Logo from "@/assets/logo.png";
import ContactModal from "@/components/ContactModal/ContactModal";

import styles from "./App.module.css";

export default function App() {
  return (
    <main className={styles.main}>
      <img className={styles.logo} alt='React logo' width='400px' src={Logo} />
    </main>
  );
}
