import { Card, Space, Divider } from "antd-mobile";

const ColaboradorCard = ({ colaborador, onClick }) => {
  return (
    <Card onClick={onClick} style={{ cursor: "pointer" }}>
      <Space>
        <Space direction="vertical">
          <font style={{ fontWeight: "bold", fontSize: "large" }}>
            {colaborador.nomeColaborador}
          </font>
        </Space>
      </Space>
      <Divider />
    </Card>
  );
};

export default ColaboradorCard;
