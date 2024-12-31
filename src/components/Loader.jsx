import React from 'react';
import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        fontSize: '14px',
        color: '#f1f1f1',
        fontWeight: 800,
        marginTop: '40px',
        textAlign: 'center'
      }}>
        <p>{progress.toFixed(2)}%</p>
      </div>
    </Html>
  );
};

export default Loader;
