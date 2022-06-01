import { render, screen } from "@testing-library/react";
import ContactList from "./ContactList";

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

    expect(firstRow).toHaveTextContent("Joe1");
    expect(firstRow).toHaveTextContent("12345678910");
    expect(firstRow).toHaveTextContent("joe1@mama.com");
  });
});
