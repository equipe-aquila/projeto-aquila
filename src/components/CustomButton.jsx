import "./custom-button.css";

export const CustomButton = ({ children, onClick, ...props }) => {
  return (
    <button className="custom-button" onClick={onClick} {...props}>
      {children}
    </button>
  );
};
