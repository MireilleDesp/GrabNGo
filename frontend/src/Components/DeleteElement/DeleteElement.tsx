import React, { SyntheticEvent } from "react";
import { BsTrash } from "react-icons/bs";
import DeletePopup from "../PopupBoxes/DeletePopup";

interface Props {
  onDeleteElement: (e: SyntheticEvent) => void;
  elementId: number;
  elementName: string | undefined;
}

const DeleteElement = ({ onDeleteElement, elementId, elementName }: Props) => {
  const handleDeleteClick = (e: SyntheticEvent, close: () => void) => {
    e.preventDefault(); // Prevent default form submission
    onDeleteElement(e); // Call the deletion handler
    close(); // Close the popup
  };

  return (
    <div className="centerButtons  flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
      <DeletePopup>
        {(close: () => void) => (
          <form
            className="poppup-child-form"
            onSubmit={(e) => handleDeleteClick(e, close)}
          >
            <input readOnly hidden value={elementId} />
            <p>
              Are you sure you want to delete <strong className="elementToDelete"> {elementName}</strong>?
            </p>

            <button className="form-button" type="submit">
              Save
            </button>
          </form>
        )}
      </DeletePopup>
    </div>
  );
};

export default DeleteElement;
