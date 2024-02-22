import React from 'react'
import Main from '../Layout/Main';

function Expense({onLogout}) {
    console.log('Expense');
    return (
    <>
    <Main onLogout={onLogout}>
        <p>Expense page</p>
    </Main>
    </>
    );
}
export default Expense;