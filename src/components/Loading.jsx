import { AutoCenter, SpinLoading } from "antd-mobile";
import "./loading.css";

export const Loading = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="loading-container" style={{ position: "absolute" }}>
      <AutoCenter>
        <SpinLoading color={"#7f6aab"} size="large" />
      </AutoCenter>
    </div>
  );
};
