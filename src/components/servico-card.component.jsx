import { Card, Space, Image, Divider, Button, Grid, AutoCenter } from 'antd-mobile';

const ServicoCard = ({servico, onClick}) => {
    return (
        <Card>
            <Space>
                <Image
                    src='https://i2.wp.com/therighthairstyles.com/wp-content/uploads/2021/09/1-the-ivy-league-mens-cut.jpg?resize=500%2C592'
                    width={100}
                    height={100}
                    fit='fill'
                />
                <Space direction='vertical'>
                    <font style={{fontWeight: 'bold', fontSize: 'large'}}>{servico.titulo}</font>
                    <AutoCenter style={{width: '69vw'}}>{servico.descricao}</AutoCenter>
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
