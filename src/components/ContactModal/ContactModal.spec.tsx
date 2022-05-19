import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ContactModal from "./ContactModal";

afterEach(cleanup);

describe("ContactModal", () => {
  // arrange
  render(<ContactModal />);

  // act
  const nameInput = screen.queryByPlaceholderText("Name");
  const phoneInput = screen.queryByPlaceholderText("Phone Number");
  const emailInput = screen.queryByPlaceholderText("Email Address");
  const submitButton = screen.queryByText("Submit");

  it("should initialize an empty form", () => {
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
    fireEvent.change(nameInput!, { target: { value: "My Name" } });
    fireEvent.change(phoneInput!, { target: { value: "1234567" } });
    fireEvent.change(emailInput!, { target: { value: "my@email.com" } });

    expect(submitButton).not.toBeDisabled();
  });
});
