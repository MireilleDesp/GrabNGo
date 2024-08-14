import React from "react";
import Popup from "reactjs-popup";

const ChangePasswordPopup = ({ children }) => {
  return (
    <div>
      <Popup
        trigger={
          <button  className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70">
            Change Password
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

export default ChangePasswordPopup;
