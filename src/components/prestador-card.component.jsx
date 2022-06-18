import { Card } from 'antd-mobile';
import React from 'react';

const PrestadorCard = ({prestadores, onClick}) => {
    return (
        <>
        {prestadores.map(({id, name, rua}) => {
            return (
                <Card key={id} title={name} onClick={() => onClick(id)}>
                    {rua}
                </Card>
            )
        })}
        </>
    );
}

export default PrestadorCard;
