import { useEffect, useState } from "react";

import styles from "./ContactModal.module.css";

export default function ContactModal({ submit }: { submit?: VoidFunction }) {
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});

  useEffect(() => {
    setErrors({
      name: name ? "" : "Name required",
      phone: phone
        ? /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
            phone
          )
          ? ""
          : "Phone is improperly formatted"
        : "Phone number required",
      email: email
        ? /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)
          ? ""
          : "Email is improperly formatted"
        : "Email address required",
    });
    setIsValid(
      !!name &&
        !!phone &&
        !!email &&
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
          phone
        ) &&
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)
    );
  }, [name, phone, email]);

  return (
    <div className={styles.ContactModal}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) {
            submit?.();
          }
        }}
      >
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        {errors["name"] && (
          <span className={styles.error}>{errors["name"]}</span>
        )}
        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors["phone"] && (
          <span className={styles.error}>{errors["phone"]}</span>
        )}
        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        {errors["email"] && (
          <span className={styles.error}>{errors["email"]}</span>
        )}
        <button disabled={!isValid} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
