import './App.less';
import GradientColorCard from './card/GradientColorCard/GradientColorCard';
// 文字粒子化
// import TextParticles from './particle/TextParticles/TextParticles';

/* card 效果 */
// import ForstedGlassCard from './card/FrostedGlassCard/FrostedGlassCard';

function App() {
  return (
    <div className="App">
      {/* <TextParticles/> */}

      {/* <ForstedGlassCard children={111} /> */}

      <GradientColorCard children={222} beginColor={'yellow'} endColor={'green'}/>
    </div>
  );
}

export default App;