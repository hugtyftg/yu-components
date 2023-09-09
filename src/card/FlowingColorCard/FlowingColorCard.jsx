import React from 'react'
import { FlowingBorderStyle } from './style';
export default function FlowingBorder({children, width, height, layerImgUrl, backgroundColor, layerColor, flowBorderColor1, flowBorderColor2}) {
  width = width ?? 400;
  height = height ?? 350;
  /* 
    一般将静态文件资源放在public下面，因为一旦打包之后，目录结构会改变，index.js会被打包成bundle.js，目录结构如下
    localhost:3000
    |-asstes
    |--img
    |---eg.jpg
    |-static
    |--js
    |---bundle.js
    因此路径的书写应该是以打包后为参照的
  */
  const $layerImgUrl = '../assets/img/'  + (layerImgUrl ?? 'eg.jpg');
  const $bgColor = backgroundColor || 'white';
  const $layerColor = layerColor || '#f4f4f8';
  const $flowBorderColor1 = flowBorderColor1 || 'lightblue';
  const $flowBorderColor2 = flowBorderColor2 || 'pink';
  const style = {
    width,
    height,
    $layerImgUrl,
    $bgColor,
    $layerColor,
    $flowBorderColor1,
    $flowBorderColor2,
  }
  return (
    <FlowingBorderStyle {...style}>
      <div className='flow-border'>
        <div className="box">
          <div className="layer">
            {children}
          </div>
        </div>
      </div>
    </FlowingBorderStyle>
  )
}
