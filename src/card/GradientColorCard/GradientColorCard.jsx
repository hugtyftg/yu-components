import React from 'react';
import { GradientColorCardStyle } from './style';
export default function GradientColorCard({width, height, children, beginColor, endColor}) {
  width= width ?? 400;
  height = height ?? 300;
  /* 
    styled-components中向props传入自定义变量的时候需要加上$前缀
    因为在编译的时候这些属性将直接添加到DOM element上，无法被识别，react会警告
  */

  const $begincolor = endColor ?? 'red';
  const $endcolor = endColor ?? 'blue';
  const styles = {
    width,
    height,
    $begincolor,
    $endcolor
  }
  return <GradientColorCardStyle {...styles}>
    <div className='gradient-color-card'>
      <div className="box">
        {children}
      </div>
    </div>
  </GradientColorCardStyle>
}