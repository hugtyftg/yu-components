import React, { useEffect, useRef, useState } from 'react'
import { ImgParticlesStyle } from './style';
import ImgParticleClass from './ImgParticleClass';
import { flushSync } from 'react-dom';
export default function ImgParticles({width, height, imgUrl}) {
  width = width ?? 500;
  height = height ?? 500;
  const style = {
    width,
    height,
  }

  // 是否加载完img元素
  const [loadImgEl, setLoadImgEl] = useState(false);
  const canvasRef = useRef(null);
  const canvasCtxRef = useRef(null);
  const imgElRef = useRef(null);
  const iCanvasRef = useRef(null);
  const iCanvasCtxRef = useRef(null);

  // 获取2D上下文的原始图像数据，返回一个ImageData实例对象，包含colorspace，width，height和data数组
  // data数组（保存每一个像素的数据，每四个元素表示一个像素的rgba四个属性值）
  const [imgData, setImgData] = useState(null);
  // 存放目前存在的所有像素点的序号信息
  const [imgArr, setImgArr] = useState([]);
  // 存储粒子的数组
  const [particleArray, setParticleArray] = useState([]);
  const [totalPxNum, setTotalPxNum] = useState(0);
  /* 真实DOM绘制到页面上之后，获取一些ref */
  useEffect(() => {
    canvasCtxRef.current = canvasRef.current.getContext('2d');
    canvasRef.current.width = width;
    canvasRef.current.height = height;
  }, [])
  /* 加载一个HTML img元素 */
  useEffect(() => {
    imgElRef.current = new Image();
    imgElRef.current.src = '../assets/img/' + (imgUrl ?? '1.png');
    imgElRef.current.addEventListener('load', () => setLoadImgEl(true));
  }, [])
  /* 加载img元素完毕之后绘制辅助canvas context，并且存储canvas的数据 */
  useEffect(() => {
    if (loadImgEl === true) {
      iCanvasRef.current = document.createElement('canvas');
      iCanvasCtxRef.current = iCanvasRef.current.getContext('2d');
      iCanvasRef.current.width = imgElRef.current.width;
      iCanvasRef.current.height = imgElRef.current.height;
      iCanvasCtxRef.current.drawImage(imgElRef.current, 0, 0, imgElRef.current.width, imgElRef.current.height);
      setImgData(iCanvasCtxRef.current.getImageData(0, 0, imgElRef.current.width, imgElRef.current.height));
    }
  }, [loadImgEl])
  /* 存储图片数据之后创建每个像素点对应的数组 */
  useEffect(() => {
    if (imgData !== null) {
      setImgArr(Array.from({length: imgData.data.length / 4}, (v, i) => i));
      setTotalPxNum(imgData.data.length / 4)
    }
  }, [imgData])


  // 准备好imgArr、imgData之后，一一生成粒子
  useEffect(() => {
    if (imgArr.length === totalPxNum && imgArr.length !== 0 && totalPxNum !== 0) {
      for (let i = 0; i < totalPxNum; i++) {
        // 技巧1: 随机生成 [0, 1) 范围内的数，为了得到 [0, n) 之间的所有数作为索引，乘以n即可，也就是数组长度
        // 技巧2: 按位或运算，操作数会被转化成32补码整数，因此和0进行或运算可以去整
        let ind = (Math.random() * imgArr.length) | 0;
        // 根据索引、图片宽度像素值计算出坐标位置
        let ci = imgArr[ind];
        let cx = ci % imgElRef.current.width;
        let cy = (ci / imgElRef.current.width) | 0;
        // 像素点的颜色信息
        let r = imgData.data[ci * 4];
        let g = imgData.data[ci * 4 + 1];
        let b = imgData.data[ci * 4 + 2];
        let color = `rgb(${r}, ${g}, ${b})`;
        // 生成该像素点对象
        let newParticle = new ImgParticleClass(
          cx + (canvasRef.current.width - imgElRef.current.width) / 2,
          cy + (canvasRef.current.height - imgElRef.current.height) / 2,
          color,
          canvasCtxRef.current
        )
        iCanvasCtxRef.current.clearRect(cx, cy, 1, 1);
        setParticleArray(particleArray => [...particleArray, newParticle]);
        // 在ictx 2d canvas画布上去除对应的像素
        // 在所有像素点的索引追踪数组中删除对应的索引，表示这个像素已被粒子取代了
        setImgArr(imgArr => {
          return [...imgArr.splice(ind, 1)];
        });
      }
    }
  }, [imgArr, totalPxNum])
  /* 图片中所有像素都创建了对应的particle，此时imgArr已经被清空了 */
  useEffect(() => {
    if (particleArray.length === totalPxNum && imgArr.length === 0 && particleArray.length !== 0) {
      setInterval(() => {
        canvasCtxRef.current.fillStyle = 'rgba(0, 0, 0, 1)';
        canvasCtxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasCtxRef.current.drawImage(
          iCanvasRef.current,
          (canvasRef.current.width - imgElRef.current.width) / 2,
          (canvasRef.current.height - imgElRef.current.height) / 2,
          iCanvasRef.current.width,
          iCanvasRef.current.height
        )
        flushSync(() => {
          // generate
        })
        for (let i = 0; i < particleArray.length; i++) {
          particleArray[i].update();
          particleArray[i].draw();
          if (particleArray[i].t > 50) {
            setParticleArray(particleArray => [...particleArray.splice(i, 1)]);
          }        
        }

      }, 50);
    }
  }, [particleArray, imgArr])

  // let disperseAnimation = () => {
  //   canvasCtxRef.current.fillStyle = 'rgba(0, 0, 0, 1)';
  //   canvasCtxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  //   canvasCtxRef.current.drawImage(
  //     iCanvasRef.current,
  //     (canvasRef.current.width - imgElRef.current.width) / 2,
  //     (canvasRef.current.height - canvasRef.current.height) / 2,
  //     iCanvasRef.current.width,
  //     iCanvasRef.current.height
  //   )
  //   generateParticles();
  //   moveParticles();
  //   requestAnimationFrame(disperseAnimation);
  // }
  // // 每次生成100个粒子，随机取代图片上的100个像素点，也就是删除imgData上对应的像素信息、同时把imgArr上对应的像素点的index剔除
  // // 这样一来，经过数次随机生成之后，原来的所有像素已经被若干相同rgba值的粒子取代了，并且这些粒子的坐标是可变的\
  // let generateParticles = () => {
  // /* 
  //   100次for循环中，每个for都会生成一个闭包
  //   for循环执行完毕之后，call stack弹出，检查macro tasks，发现有很多的set jobs在micro tasks中，所以执行【updater使得setXXX在末尾异步执行】
  // */
  //   for (let c = 0; c < 100; c++) {
  //     // 技巧1: 随机生成 [0, 1) 范围内的数，为了得到 [0, n) 之间的所有数作为索引，乘以n即可，也就是数组长度
  //     // 技巧2: 按位或运算，操作数会被转化成32补码整数，因此和0进行或运算可以去整
  //     let ind = (Math.random() * imgArr.length) | 0;
  //     // 根据索引、图片宽度像素值计算出坐标位置
  //     let ci = imgArr[ind];
  //     let cx = ci % imgElRef.current.width;
  //     let cy = (ci / imgElRef.current.width) | 0;
  //     // 像素点的颜色信息
  //     let r = imgData.data[ci * 4];
  //     let g = imgData.data[ci * 4 + 1];
  //     let b = imgData.data[ci * 4 + 2];
  //     let color = `rgb(${r}, ${g}, ${b})`;
  //     // 生成该像素点对象
  //     setParticleArray(particleArray => {
  //       if (particleArray.length !== totalPxNum) {
  //         return [...particleArray, new ImgParticleClass(
  //           cx + (canvasRef.current.width - imgElRef.current.width) / 2,
  //           cy + (canvasRef.current.height - imgElRef.current.height) / 2,
  //           color,
  //           canvasCtxRef.current
  //         )]
  //       }
  //     })
  //     // 在ictx 2d canvas画布上去除对应的像素
  //     iCanvasCtxRef.current.clearRect(cx, cy, 1, 1);
  //     // 在所有像素点的索引追踪数组中删除对应的索引，表示这个像素已被粒子取代了
  //     setImgArr(imgArr => [...imgArr.splice(ind, 1)]);
  //   }
  // }
  // let moveParticles = (stopT = 50) => {
  //   for (let i = 0; i < particleArray.length; i++) {
  //     particleArray[i].update();
  //     particleArray[i].draw();
  //     if(particleArray[i].t > stopT) {
  //       setParticleArray(particleArray => [...particleArray.splice(i, 1)]);
  //     }
  //   }
  // }
  // useEffect(() => {
  //   if (imgArr.length === totalPxNum && imgArr.length !== 0 && totalPxNum !== 0) {
  //     disperseAnimation();
  //   }
  // }, [imgArr, totalPxNum])

  return (
    <ImgParticlesStyle {...style}>
      <div className='img-particles'>
        <canvas id="main" ref={canvasRef}></canvas>
      </div>
    </ImgParticlesStyle>
  )
}
