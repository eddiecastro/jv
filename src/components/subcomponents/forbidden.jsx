import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

export default function Forbidden() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => history.push('/'), 2000)
  });

  return (
    <div style={{
      backgroundColor: 'black',
      display: 'flex',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{
        margin: 'auto',
        color: 'white',
        display: 'block',
        textAlign: 'center'
      }}>
        <div style={{
          marginBottom: 16,
          fontSize: 36,
        }} >no match</div>
        <div style={{
          fontSize: 24,
        }} >...redirecting</div>
      </div>
    </div>
  );
}