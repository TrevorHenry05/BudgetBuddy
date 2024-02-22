import React from 'react';
import Main from '../Layout/Main';

function Budget({ onLogout }) {

    //console.log('Budger');
    return (
        <>
         <Main onLogout={onLogout}>
            <p>Budget page</p>
        </Main>
        </>
    );
}

export default Budget;