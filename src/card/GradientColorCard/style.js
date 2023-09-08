import styled from "styled-components";
export const GradientColorCardStyle = styled.div.attrs(props => {
  return {
    $begincolor: props.$begincolor,
    $endcolor: props.$endcolor,
    width: props.width,
    height: props.height,
  }
})`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  .box {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap;
    padding: 12px 0;
  }
  .box::before {
    content: "";
    position: absolute;
    inset: 0;
    background:linear-gradient(45deg, ${props => props.$begincolor}, ${props => props.$endcolor}); 
    -webkit-mask-image: 
        linear-gradient(#fff 0 0), 
        linear-gradient(#fff 0 0);
    -webkit-mask-clip: 
      content-box,
      border-box;
    -webkit-mask-composite: xor;
            mask-composite: exclude; 
    padding: 10px;
    border-radius: 50px;
  }
`;
