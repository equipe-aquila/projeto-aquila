import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const HeroContainer = styled.div`
background-repeat: no-repeat;
background-size: cover;
background-image: url(./HerroBanner.svg);
display:flex;
justify-content: center;
height: 100vh;
`;


export const HeroContent = styled.section`
height: 100%;
max-width: 1500px;
position: relative;
display: flex;
justify-content: center;
align-items: center;
text-align: left;
color: #00000;

@media only screen and (max-width:375px) {
    text-align: start;
    height: 80%;
}
`;


export const HeroContentText = styled.div`
width: 50%;
display: flex;
flex-direction: column;
justify-content: left;
align-items: left;
box-shadow: 0 1px 2px #0003;
padding: 20px;
background-color: white;
border-radius: 35px;
margin: 0px;


@media only screen and (max-width:600px) {
    width: 80%;
}
@media only screen and (max-width:375px) {
    position: absolute;
    align-items: flex-start;
}
`;

export const HeroTitle = styled.h1`
padding-bottom: 5px;
font-size: clamp(2rem, 3rem, 4rem);
margin: 0;

font-weight: 900;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const HeroSubTitle = styled.h2`
padding-bottom: 5px;
font-size: clamp(2rem, 3rem, 4rem);
margin: 0;
font-weight: 900;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const HeroTitleText = styled.span`
display: block;
`;

export const HeroText = styled.h3`
font-size: clamp(1rem, 1.3rem,1.8rem);
font-weight: 700;
padding: 0;
margin: 0;
padding-bottom: 10px;
font-family: 'Lora', serif;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
max-width:600px;

@media only screen and (max-width:375px) {
}
`;

export const HeroBtn = styled(Link)`
text-decoration: none;
outline: none;
border: none;
`;

export const ImgHero = styled.div`
display: absolute;

@media only screen and (max-width:600px) {

    display: none;
}
`