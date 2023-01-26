import { render, fireEvent } from "@testing-library/react";
import { RecipientListComponent } from "./RecipientList.component";

describe("RecipientListComponent", () => {
  it("renders a list of recipients", () => {
    // given
    const recipients = [
      { recipientId: "1", firstName: "John", lastName: "Doe" },
      { recipientId: "2", firstName: "Jane", lastName: "Doe" },
    ];

    const setSelectedRecipient = jest.fn();

    // when
    const { getByText } = render(
      <RecipientListComponent
        recipients={recipients}
        selectedRecipient={null}
        setSelectedRecipient={setSelectedRecipient}
      />
    );

    // then
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Jane Doe")).toBeInTheDocument();
  });

  it("calls setSelectedRecipient when a recipient card is clicked", () => {
    // given
    const recipients = [
      { recipientId: "1", firstName: "John", lastName: "Doe" },
      { recipientId: "2", firstName: "Jane", lastName: "Doe" },
    ];

    const setSelectedRecipient = jest.fn();
    const selectedRecipient = "1";

    // when
    const { getByText } = render(
      <RecipientListComponent
        recipients={recipients}
        selectedRecipient={selectedRecipient}
        setSelectedRecipient={setSelectedRecipient}
      />
    );

    fireEvent.click(getByText("John Doe"));
    fireEvent.click(getByText("Jane Doe"));

    // then
    expect(setSelectedRecipient).toHaveBeenCalledWith("1");
    expect(setSelectedRecipient).toHaveBeenCalledWith("2");
  });
});
