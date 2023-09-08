import React from 'react';
import './FrostedGlassCard.less';

export default function ForstedGlassCard(props) {
  const {children} = props;
  return (
    <div className="frosted-glass-card">
      {children}
    </div>
  )
}
