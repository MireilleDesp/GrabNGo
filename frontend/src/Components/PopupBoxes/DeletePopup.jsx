import React from "react";
import Popup from "reactjs-popup";
import {  BsTrash } from "react-icons/bs";

const DeletePopup = ({ children }) => {
  return (
    <div>
      <Popup
        trigger={
          <button className="p-2 px-4 text-white bg-red rounded-lg hover:opacity-70 focus:outline-none">
            <BsTrash />
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <button className="close-button" onClick={() => close()}>
                  &times;
                </button>
              </div>
              <div className="content">
                {typeof children === "function"
                  ? children(close)
                  : React.cloneElement(children, { closeOnSubmit: () => close() })}
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default DeletePopup;
