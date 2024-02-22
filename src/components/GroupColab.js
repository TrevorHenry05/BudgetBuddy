import React from 'react';
import Main from '../Layout/Main';

function GroupColab({onLogout}) {
    console.log('Goup')
    return (
        <>
    <Main onLogout={onLogout}>
        <p>Gro page</p>
    </Main>
        </>
    );
}
export default GroupColab;