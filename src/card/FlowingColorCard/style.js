import styled from "styled-components";
export const FlowingBorderStyle = styled.div.attrs(props => {
  return {
    $bgColor: props.$bgColor,
    $layerColor: props.$layerColor,
    $layerImgUrl: props.$layerImgUrl,
    $flowBorderColor1: props.$flowBorderColor1,
    $flowBorderColor2: props.$flowBorderColor2,
  }
})`
.flow-border{
  width: ${props => props.width}px;
  height : ${props => props.height}px;
  background-color: ${props => props.$bgColor};
  box-sizing: border-box;
  border-radius: 20px;
  .box{
    position: relative;
    width: 100%;
    height: 100%;
    background: repeating-conic-gradient(from var(--startAngle), 
    ${props => props.$flowBorderColor1} 0%, ${props => props.$flowBorderColor2} 5%, 
    transparent 5%, transparent 40%, ${props => props.$flowBorderColor1} 50%);
    animation: flow 4s linear infinite;
    border-radius: 20px;
  }
  .box::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: repeating-conic-gradient(from var(--startAngle), 
    ${props => props.$flowBorderColor2} 0%, ${props => props.$flowBorderColor2} 5%, 
    transparent 5%, transparent 40%, ${props => props.$flowBorderColor2} 50%);
    animation: flow 4s linear infinite;
    border-radius: 20px;
    animation-delay: -1s;
  }
  .layer{ 
    position: absolute;
    inset: 8px;
    background-color: ${props => props.$bgColor};
    background-image: url(${props => props.$layerImgUrl});
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 15px;
    border: 8px solid ${props => props.$layerColor};
  }
}
@property --startAngle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
@keyframes flow{
  0% {
    --startAngle: 0deg;
  }
  100% {
    --startAngle: 360deg;
  }
}
`