import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextParticlesStyle } from './style';
import TextParticleClass from './TextParticleCalss';
export default function TextParticles({strList, width, height, backgroundColor, fontSize, fontFamily}) {
  // 参数的初始化
  strList = strList ?? ['Sophisticated', 'React'];
  width = width ?? 1000;
  height = height ?? 400;
  backgroundColor = backgroundColor ?? '#333';
  fontSize = fontSize ?? 20;
  fontFamily = fontFamily ?? 'Arial';
  // 当前展示的str的index
  const [showIndex, setShowIndex] = useState(0);
  // 记录particleArray完整时的粒子数目
  const [particleNum, setParticleNum] = useState(0);
  // 当前展示的str对应的粒子数组
  const [particleArray, setParticleArray] = useState([]);
  // 主canvas及其2d context，文字canvas及其2d context
  const canvas = useRef(null);
  const ctx = useRef(null);
  const textCanvas = useRef(null);
  const textCtx = useRef(null);
  // 动画定时器
  const animationTimer = useRef(null);
  // 控制是否从0加载particleArray
  const [loadDataStatus, setLoadDataStatus] = useState(false);

  /* 计算一定字体和字号下，字符串的宽高 */
  let getTextSize = useCallback((str, fontFamily, fontSize) => {
    const span = document.createElement('span');
    span.style.fontFamily = fontFamily;
    span.style.fontSize = `${fontSize}px`;
    // span行内元素没有宽高，需要设置成行内块
    span.style.display = 'inline-block';
    span.textContent = str;
    document.body.appendChild(span);
    let w = span.clientWidth;
    let h = span.clientHeight;
    document.body.removeChild(span); 
    return [w, h];
  }, [])

  /* 得到字符串的canvas数据 */
  let getTextImageData = useCallback((str, fontFamily = 'Arial', fontSize = 40, textCanvas, textCtx) => {
    let [textWidth, textHeight] = getTextSize(str, fontFamily, fontSize);
    textCanvas.width = textWidth;
    textCanvas.height = textHeight;
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height  );
    textCtx.font = `${fontSize}px ${fontFamily}`;
    textCtx.fillText(str, 0, fontSize);
    return textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height)
  }, [getTextSize])

  /* 加载画布 */
  useEffect(() => {
    /* 主canvas及其context */
    canvas.current.width = width;
    canvas.current.height = height;
    ctx.current = canvas.current.getContext('2d');
    /* 文字的canvas及其context */
    textCanvas.current = document.createElement('canvas');
    textCtx.current = textCanvas.current.getContext('2d');
    setLoadDataStatus(true);
  }, []);
  /* 加载画布之后初始数据 */
  useEffect(() => {
    if (loadDataStatus === true && particleArray.length === 0) {
      setParticleNum(0);
      let pixels = getTextImageData(strList[showIndex % strList.length], fontFamily, fontSize, textCanvas.current, textCtx.current);
      for (let i = 0; i < pixels.data.length / 4; i++) {
        if (pixels.data[i * 4 + 3] !== 0) {
          let x = (i % textCanvas.current.width) * 5 + (canvas.current.width - textCanvas.current.width * 5) / 2;
          let y = (i / textCanvas.current.width | 0) * 5 + (canvas.current.height - textCanvas.current.height * 5) / 2;
          setParticleArray(particleArray => [...particleArray, new TextParticleClass(x, y, ctx.current)]);
          setParticleNum(num => num +1);
        }
      }
      setShowIndex(index => index+1);
      setLoadDataStatus(false);
    }
  }, [loadDataStatus])
  /* 
    由于setXXX更新队列是异步的，所以会在microTasks内执行，也就是说会在宏任务for循环执行后才全部一次更新
    粒子数组载入完毕之后绘制图像
  */
  useEffect(() => {
    // 初始加载完毕所有粒子的绘制
    if (particleArray.length === particleNum && particleNum !== 0) {
      // 如果定时器已经开启则返回
      if (animationTimer.current !== null) {
        return;
      }
      // 开启定时器
      animationTimer.current = setInterval(() => {
        // 清除画布
        ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
        for (let i = 0; i < particleArray.length; i++) {
          particleArray[i].update();
          particleArray[i].draw();
          // 如果粒子下落到画布外面，则清除这个粒子
          if (particleArray[i].y > canvas.current.height) {
            setParticleArray(particleArray => [...particleArray.splice(i, 1)]);
          }
        }
      }, 15);
    }
    // 如果粒子数组目前清空了，并且loadDataStatus目前是false 
    if (animationTimer.current && particleArray.length === 0) {
      clearInterval(animationTimer.current);
      animationTimer.current = null;
      setLoadDataStatus(true);
    }
  }, [particleArray]);

  /* 销毁组件时如果定时器仍然存在，则销毁定时器 */
  useEffect(() => {
    return () => {
      if (animationTimer.current) {
        clearInterval(animationTimer.current);
        animationTimer.current = null;
      }
    }
  }, [])
  return (
    <TextParticlesStyle>
      <div className='text-particles' 
      style={{
        width,
        height,
        backgroundColor,
      }}>
        <canvas ref={canvas}></canvas>
      </div>
    </TextParticlesStyle>
  )
}
