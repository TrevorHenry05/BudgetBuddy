import React from 'react'
import Main from '../Layout/Main';

function ExpenseTracking({onLogout}) {
    console.log('function ExpenseTracking')
    return (
        <>
    <Main onLogout={onLogout}>
        <p>Expense tracking page</p>
    </Main>
        </>
    );
}

export default ExpenseTracking;