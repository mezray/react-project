'use client'
import React from 'react';
import HomePage from '../app/pages/HomePage/page'
import { TokenContextProvider } from '@/context/TokenContext';
import LoggoutButton from '@/components/LogoutButton';

const Sidebar = () => {
    return (
    <div>
        <button onClick={() => window.location.href = 'https://www.linkedin.com/in/rayhan-mezghani-258a20112/overlay/1710510278221/single-media-viewer/?profileId=ACoAABxFe2QBmT_Ep3YvLiQ9BlhBVK60Jms5nrQ'}>About me</button>
        <button onClick={() => window.location.href = 'https://github.com/mezray/react-project'}>Github Repository</button>
        <LoggoutButton />
        </div>
    );
}

export default Sidebar;