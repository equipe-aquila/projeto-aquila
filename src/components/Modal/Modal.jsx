import "./modal.css";
import { CloseCircleFill } from "antd-mobile-icons";

export const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <CloseCircleFill
          className="modal-btn"
          color="#7f6aab"
          onClick={handleClose}
        />
      </section>
    </div>
  );
};
