import React from 'react';
import '../App.css'
import Navigate from '../components/Navigate';


function Main({ children }) {


    return (
        <>
            <div>
                <Navigate />
                <div>{children}</div>
            </div>

        </>
    );
}

export default Main;