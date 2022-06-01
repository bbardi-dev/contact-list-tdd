import { useEffect, useState } from "react";

import styles from "./ContactModal.module.css";

type Props = {
  submit?: Function;
  contact?: { name: string; phone: string; email: string };
};

export default function ContactModal({ submit, contact }: Props) {
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState(contact?.name ?? "");
  const [phone, setPhone] = useState(contact?.phone ?? "");
  const [email, setEmail] = useState(contact?.email ?? "");

  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

  const [errors, setErrors] = useState<{
    nameError?: string;
    phoneError?: string;
    emailError?: string;
  }>({});

  const [formDirty, setFormDirty] = useState(false);

  useEffect(() => {
    if ((name || phone || email) && formDirty === false) {
      setFormDirty(true);
    }

    if (formDirty) {
      setErrors({
        ...(!name && { nameError: "Name is required" }),
        ...(!phone && { phoneError: "Phone number required" }),
        ...(phone &&
          !phoneRegex.test(phone) && {
            phoneError: "Phone is improperly formatted",
          }),
        ...(!email && { emailError: "Email address required" }),
        ...(email &&
          !emailRegex.test(email) && {
            emailError: "Email is improperly formatted",
          }),
      });
    }

    setIsValid(
      !!name &&
        !!phone &&
        !!email &&
        phoneRegex.test(phone) &&
        emailRegex.test(email)
    );
  }, [name, phone, email]);

  return (
    <div className={styles.ContactModal}>
      <form
        data-testid="modal-form"
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
          onChange={(e) => {
            console.log(e.target.value);
            setName(e.target.value);
          }}
          type="text"
        />
        {errors["nameError"] && (
          <span data-testid="error" className={styles.error}>
            {errors["nameError"]}
          </span>
        )}
        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors["phoneError"] && (
          <span data-testid="error" className={styles.error}>
            {errors["phoneError"]}
          </span>
        )}
        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        {errors["emailError"] && (
          <span data-testid="error" className={styles.error}>
            {errors["emailError"]}
          </span>
        )}
        <button disabled={!isValid} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
