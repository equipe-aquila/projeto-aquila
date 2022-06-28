import React from 'react';

const DatePicker = ({index, day, color, onClick}) => {
    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return (
        <div
            style={
                {
                    width: '3rem',
                    height: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: '.5rem',
                    border: `0.1rem solid ${color}`,
                    marginTop: '1rem',
                }
            }
            onClick={() => onClick(index)}
        >
            <div style={{padding: '.1rem', color: `${color}`}}>
                {weekdays[day.getDay()]}
            </div>
            <div style={{color: `${color}`, fontSize: '200%', fontWeight: 'bold', padding: '.1rem'}}>
                {day.getDate()}
            </div>
        </div>
    );
}

export default DatePicker;
