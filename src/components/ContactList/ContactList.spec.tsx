import { fireEvent, render, screen } from "@testing-library/react";
import ContactList, { Contact } from "./ContactList";

describe("Conact list", () => {
  it("renders a list of contacts", () => {
    const contacts = [
      {
        id: "0",
        name: "Joe",
        phone: "12345678910",
        email: "joe@mama.com",
      },
      {
        id: "1",
        name: "Joe1",
        phone: "12345678910",
        email: "joe1@mama.com",
      },
      {
        id: "2",
        name: "Joe2",
        phone: "12345678910",
        email: "joe2@mama.com",
      },
    ];

    render(<ContactList contacts={contacts} />);

    const firstRow = screen.getByTestId("contact-0");
    const secondRow = screen.getByTestId("contact-1");

    expect(firstRow).toHaveTextContent("Joe");
    expect(firstRow).toHaveTextContent("12345678910");
    expect(firstRow).toHaveTextContent("joe@mama.com");

    expect(secondRow).toHaveTextContent("Joe1");
    expect(secondRow).toHaveTextContent("12345678910");
    expect(secondRow).toHaveTextContent("joe1@mama.com");
  });

  it("calls edit function when edit button is clicked", () => {
    const contacts: Contact[] = [
      {
        id: "0",
        name: "Joe",
        phone: "12345678910",
        email: "joe@mama.com",
      },
      {
        id: "1",
        name: "Joe1",
        phone: "12345678910",
        email: "joe1@mama.com",
      },
    ];

    const editFn = jest.fn();

    render(<ContactList contacts={contacts} onEditClick={editFn} />);

    const firstEditBtn = screen.getByTestId("edit-btn-0");

    fireEvent.click(firstEditBtn);

    expect(editFn).not.toHaveBeenCalledWith(contacts[1]);
    expect(editFn).toHaveBeenCalledWith(contacts[0]);
  });
  it("calls delete function when delete button is clicked", () => {
    const contacts: Contact[] = [
      {
        id: "0",
        name: "Joe",
        phone: "12345678910",
        email: "joe@mama.com",
      },
      {
        id: "1",
        name: "Joe1",
        phone: "12345678910",
        email: "joe1@mama.com",
      },
    ];

    const deleteFn = jest.fn();

    render(<ContactList contacts={contacts} onDeleteClick={deleteFn} />);

    const firstDeleteBtn = screen.getByTestId("delete-btn-0");

    fireEvent.click(firstDeleteBtn);

    expect(deleteFn).not.toHaveBeenCalledWith(contacts[1]);
    expect(deleteFn).toHaveBeenCalledWith(contacts[0]);
  });
});
