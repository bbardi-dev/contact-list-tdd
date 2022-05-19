import { useEffect, useState } from "react";

import styles from "./ContactModal.module.css";

export default function ContactModal() {
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {}, [name, phone, email]);

  return (
    <div className={styles.ContactModal}>
      <form>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button disabled={!isValid} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
