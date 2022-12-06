import { Card, Avatar, Grid, Space } from "antd-mobile";

const PrestadorCard = ({ prestador, onClick }) => {
  return (
    <Card
      className="cursor-pointer"
      style={{ zIndex: 99999, minWidth: "230px", marginTop: "10px" }}
      onClick={() => onClick(prestador.id)}
    >
      <Grid
        columns={1}
        style={{
          display: "flex"
        }}
      >
        <Grid.Item>
          <Avatar src="./logo-placeholder-image.png" />
        </Grid.Item>
        <Grid.Item style={{ alignSelf: "center", justifySelf: "right" }}>
          <Space direction="vertical">
            <font
              style={{
                fontWeight: "bolder",
                fontSize: "medium",
                color: "#7f6aab"
              }}
            >
              {prestador.name}
            </font>
            <font style={{}}>
              <span
                style={{
                  color: "#7f6aab"
                }}
              >
                ★
              </span>{" "}
              {prestador.rua}, {prestador.numero} - {prestador.cidade} (
              {prestador.estado})
            </font>
          </Space>
        </Grid.Item>
      </Grid>
    </Card>
  );
};

export default PrestadorCard;
