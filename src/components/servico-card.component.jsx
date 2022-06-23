import { Card, Space, Image } from 'antd-mobile';

const ServicoCard = ({servico, onClick}) => {
    return (
        <Card onClick={() => onClick()} style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
            <Space>
                <Image
                    src='https://i2.wp.com/therighthairstyles.com/wp-content/uploads/2021/09/1-the-ivy-league-mens-cut.jpg?resize=500%2C592'
                    width={100}
                    height={100}
                    fit='fill'
                />
                <Space direction='vertical'>
                    <font style={{fontWeight: 'bold', fontSize: 'large'}}>{servico.titulo}</font>
                    <font>{servico.descricao}</font>
                </Space>
            </Space>
        </Card>
    );
}

export default ServicoCard;
