import "./select.css";
export const Select = ({ children, onChange, ...props }) => {
  return (
    <select className="custom-select" onChange={onChange}>
      <option value="10">10:00</option>
      <option value="11">11:00</option>
      <option value="12">12:00</option>
      <option value="13">13:00</option>
      <option value="14">14:00</option>
    </select>
  );
};
