import React from "react";
import Popup from "reactjs-popup";
import { BsPencil } from "react-icons/bs";

const EditPopup = ({ children }) => {
  return (
    <div>
      <Popup
        trigger={
          <button className="p-2 px-4 text-white bg-orange-500 rounded-lg hover:opacity-70 focus:outline-none">
            <BsPencil />
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
                {React.cloneElement(children, { closeOnSubmit: () => close() })}
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default EditPopup;
