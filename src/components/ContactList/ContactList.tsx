import styles from "./ContactList.module.css";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

type Props = {
  contacts?: Contact[];
  onEditClick?: Function;
  onDeleteClick?: Function;
};

export default function ContactList({
  contacts,
  onEditClick,
  onDeleteClick,
}: Props) {
  return (
    <div className={styles.main}>
      {contacts?.map((c) => (
        <div key={`row-${c.id}`} data-testid={`contact-${c.id}`}>
          <div>{c.name}</div>
          <div>{c.phone}</div>
          <div>{c.email}</div>

          <div
            data-testid={`edit-btn-${c.id}`}
            onClick={() => onEditClick?.(c)}
          >
            Edit
          </div>
          <div
            data-testid={`delete-btn-${c.id}`}
            onClick={() => onDeleteClick?.(c)}
          >
            Delete
          </div>
        </div>
      ))}
    </div>
  );
}
