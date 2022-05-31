import { fireEvent, render, screen } from "@testing-library/react";

import ContactModal from "./ContactModal";

describe("Create Contact Tests", () => {
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

    const nameError = screen.queryByText("Name required");
    const phoneError = screen.queryByText("Phone is improperly formatted");
    const emailError = screen.queryByText("Email is improperly formatted");

    expect(nameError).not.toBeInTheDocument();
    expect(phoneError).not.toBeInTheDocument();
    expect(emailError).not.toBeInTheDocument();
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

    const nameError = screen.queryByText("Name is required");
    const phoneError = screen.queryByText("Phone is improperly formatted");
    const emailError = screen.queryByText("Email is improperly formatted");

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

  it("Prevents submit function from being called if invalid", () => {
    // arrange
    const onSubmit = jest.fn();
    render(<ContactModal submit={onSubmit} />);

    // act
    const nameInput = screen.queryByPlaceholderText("Name");
    const phoneInput = screen.queryByPlaceholderText("Phone Number");
    const emailInput = screen.queryByPlaceholderText("Email Address");
    const submitButton = screen.getByText("Submit");
    const form = screen.getByTestId("modal-form");

    fireEvent.submit(form);

    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(nameInput!, { target: { value: "My Name" } });
    fireEvent.change(phoneInput!, { target: { value: "123-456-7890" } });
    fireEvent.change(emailInput!, { target: { value: "my@email.com" } });

    expect(submitButton).not.toBeDisabled();

    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalled();
  });
});

describe("Edit Contact Tests", () => {
  it("should initialize a form with contact info", () => {
    // arrange
    render(
      <ContactModal
        contact={{ name: "Joe", phone: "12345678910", email: "joe@mama.com" }}
      />
    );

    // act
    const nameInput = screen.queryByPlaceholderText("Name");
    const phoneInput = screen.queryByPlaceholderText("Phone Number");
    const emailInput = screen.queryByPlaceholderText("Email Address");
    const submitButton = screen.getByText("Submit");

    // assert
    expect(nameInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toHaveValue("Joe");
    expect(phoneInput).toHaveValue("12345678910");
    expect(emailInput).toHaveValue("joe@mama.com");
    expect(submitButton).not.toBeDisabled();

    const nameError = screen.queryByText("Name required");
    const phoneError = screen.queryByText("Phone is improperly formatted");
    const emailError = screen.queryByText("Email is improperly formatted");

    expect(nameError).not.toBeInTheDocument();
    expect(phoneError).not.toBeInTheDocument();
    expect(emailError).not.toBeInTheDocument();
  });
});
