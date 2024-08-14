import React from "react";
import Popup from "reactjs-popup";

const AddPopup = ({ children }) => {
  return (
    <div>
      <Popup
        trigger={
          <button className="buttonLocation p-2 px-8 bg-lightGreen rounded-lg hover:opacity-70 focus:outline-none">
            +
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

export default AddPopup;
