import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ContactModal from "./ContactModal";

afterEach(cleanup);

describe("ContactModal", () => {
  it("should initialize an empty form", () => {
    // arrange
    render(<ContactModal />);

    // act
    const nameInput = screen.queryByPlaceholderText("Name");
    const phoneInput = screen.queryByPlaceholderText("Phone Number");
    const emailInput = screen.queryByPlaceholderText("Email Address");
    const submitButton = screen.getByText("Submit");

    // assert
    expect(nameInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toHaveValue("");
    expect(phoneInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(submitButton).toBeDisabled();
  });

  it("Disables submit button until form is valid", () => {
    // arrange
    render(<ContactModal />);

    // act
    const nameInput = screen.queryByPlaceholderText("Name");
    const phoneInput = screen.queryByPlaceholderText("Phone Number");
    const emailInput = screen.queryByPlaceholderText("Email Address");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput!, { target: { value: "My Name" } });
    fireEvent.change(phoneInput!, { target: { value: "123-456-7890" } });
    fireEvent.change(emailInput!, { target: { value: "my@email.com" } });

    expect(submitButton).not.toBeDisabled();
  });

  it("displays error messages for invalid input", () => {
    // arrange
    render(<ContactModal />);

    // act
    const nameInput = screen.queryByPlaceholderText("Name");
    const phoneInput = screen.queryByPlaceholderText("Phone Number");
    const emailInput = screen.queryByPlaceholderText("Email Address");

    fireEvent.change(nameInput!, { target: { value: "" } });
    fireEvent.change(phoneInput!, { target: { value: "1234567" } });
    fireEvent.change(emailInput!, { target: { value: "@email.com" } });

    const nameError = screen.getByText("Name required");
    const phoneError = screen.getByText("Phone is improperly formatted");
    const emailError = screen.getByText("Email is improperly formatted");

    expect(nameError).toBeInTheDocument();
    expect(phoneError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();

    fireEvent.change(nameInput!, { target: { value: "My Name" } });

    expect(nameError).not.toBeInTheDocument();

    fireEvent.change(phoneInput!, { target: { value: "123-456-7890" } });

    expect(phoneError).not.toBeInTheDocument();

    fireEvent.change(emailInput!, { target: { value: "me@email.com" } });

    expect(emailError).not.toBeInTheDocument();
  });
});
