import React from 'react';
// import './FrostedGlassCard.less';
import { FrostedClassCardStyle } from './style';
export default function ForstedGlassCard(props) {
  const {children} = props;
  return (
    <FrostedClassCardStyle>
      <div className="frosted-glass-card">
        {children}
      </div>
    </FrostedClassCardStyle>
  )
}
