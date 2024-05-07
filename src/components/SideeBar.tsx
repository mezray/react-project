'use client'
import React from 'react';
import LoggoutButton from '@/components/LogoutButton';

const Sidebar = () => {
    return (
    <>
    <div>
        <button onClick={() => window.open('https://www.linkedin.com/in/rayhan-mezghani-258a20112/overlay/1710510278221/single-media-viewer/?profileId=ACoAABxFe2QBmT_Ep3YvLiQ9BlhBVK60Jms5nrQ')}>About me</button>
        <button onClick={() => window.open('https://github.com/mezray/react-project')}>Github Repository</button>
        <LoggoutButton />
        <div className="bottom-gif">
        <a href="https://newcp.net" target="_blank">
            <img src="/club.gif" width="200" height="200" />
        </a>
    </div>
    </div>
    
    </>
    );
}

export default Sidebar;