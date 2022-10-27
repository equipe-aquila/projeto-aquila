import { Card, Space, Image, Divider, Button, Grid, AutoCenter } from 'antd-mobile';

const ServicoCard = ({servico, onClick}) => {
    return (
        <Card style={{marginRight:"40px",marginLeft:"40px",marginBottom:"40px"}}>
            <Space>
                <Image
                    src=''
                    width={100}
                    height={100}
                    fit='fill'
                />
                <Space direction='vertical'>
                    <font style={{fontWeight: 'bold', fontSize: 'large'}}>{servico.titulo}</font>
                    <AutoCenter style={{width: '49vw'}}>{servico.descricao}</AutoCenter>
                </Space>
            </Space>
            <Divider/>
            <Grid columns={2}>
                <Grid.Item style={{justifySelf: 'left', alignSelf: 'center'}}>
                    <font style={{fontSize: 'large'}}>{servico.preco.toLocaleString('pt-BR', {currency: 'BRL', style: 'currency'})}</font>
                </Grid.Item>
                <Grid.Item style={{justifySelf: 'right'}}>
                    <Button color='primary' onClick={() => onClick(servico.id)}>Agendar</Button>
                </Grid.Item>
            </Grid>
        </Card>
    );
}

export default ServicoCard;
