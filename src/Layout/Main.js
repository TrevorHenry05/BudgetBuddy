import React from 'react';
import '../App.css'
import Navigate from '../components/Navigate';


function Main({ children, onLogout }) {


    return (
        <>
            <div>
                <Navigate onLogout={onLogout}/>
                <div>{children}</div>
            </div>

        </>
    );
}

export default Main;