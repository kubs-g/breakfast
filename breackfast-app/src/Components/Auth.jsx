//link the signup and login 
import { link  } from 'react-router-dom';
import { useState } from 'react';

function Auth(){
    return (
        <>
        <button link="/signup">signup</button>
        <button link="/login">login</button>
        
        
        </>
    )
}

export default Auth;