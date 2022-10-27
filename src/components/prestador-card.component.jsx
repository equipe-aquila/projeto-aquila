import { Card, Avatar, Grid, Space } from 'antd-mobile';

const PrestadorCard = ({prestador, onClick}) => {
    return (
        <Card style={{ zIndex:99999,width:"230px",marginTop:"10px"}} onClick={() => onClick(prestador.id)}>
            <Grid columns={1} style={{display:"flex"}}>
                <Grid.Item>
                    <Avatar src='./logo-placeholder-image.png'/>
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
