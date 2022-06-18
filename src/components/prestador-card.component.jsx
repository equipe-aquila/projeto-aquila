import { Card, Avatar, Grid, Space } from 'antd-mobile';

const PrestadorCard = ({prestador, onClick}) => {
    return (
        <Card onClick={() => onClick(prestador.id)}>
            <Grid columns={2}>
                <Grid.Item>
                    <Avatar src='https://img.freepik.com/free-vector/vintage-barbershop-logo-template_441059-26.jpg?w=2000'/>
                </Grid.Item>
                <Grid.Item style={{alignSelf: 'center', justifySelf: 'right'}}>
                    <Space direction='vertical'>
                        <font style={{fontWeight: 'bolder', fontSize: 'medium', float: 'right'}}>{prestador.name}</font>
                        <font style={{}}>★ 4,7 • Barbearia • 1,5 km</font>
                    </Space>
                </Grid.Item>
            </Grid>
        </Card>
    );
}

export default PrestadorCard;
