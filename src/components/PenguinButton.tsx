"use client"
import React, { useContext } from 'react';
import { TokenContext } from '@/context/tokenContext';

function PenguinButton() {
  const { token } = useContext(TokenContext);

  return (
    <div className="bottom-gif">
      {token ? (
        <>
          <div>Click me to see the real penguin</div>
          <a href="https://nguyen.me.uk/teaching/web-architecture/01-react#/1" target="_blank">
            <img src="/club.gif" width="200" height="200" />
          </a>
        </>
      ) : (
        <>
          <div>Login to see the penguin</div>
          <div>dance :)</div>
          <img src="/club.png" width="200" height="200" />
        </>
      )}
    </div>
  );
}

export default PenguinButton;