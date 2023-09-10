/* canvas 粒子化效果 */
// 文字粒子化
import ImgParticles from './particle/ImgParticles/ImgParticles';
// import TextParticles from './particle/TextParticles/TextParticles';

/* card 效果 */
// 毛玻璃
// import ForstedGlassCard from './card/FrostedGlassCard/FrostedGlassCard';
// 二色渐变边框
// import GradientColorCard from './card/GradientColorCard/GradientColorCard';
// 颜色流转边框
// import FlowingBorder from './card/FlowingColorCard/FlowingColorCard';
function App() {
  return (
    <div className="App">
      {/* <TextParticles strList={['mmy', 'want', 'to', 'sleep']}/> */}
      <ImgParticles></ImgParticles>
      {/* <ForstedGlassCard children={111} /> */}

      {/* <GradientColorCard children={222} beginColor={'yellow'} endColor={'green'}/> */}

      {/* <FlowingBorder layerImgUrl={'eg.jpg'}>
        <p style={{color: 'white', textAlign: 'center'}}>layer content</p>
      </FlowingBorder> */}
    </div>
  );
}

export default App;