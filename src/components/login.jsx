import React from 'react';
import { login } from './functions.js';

const Login = () => (
    <section id='login'>
        <button className="login" onClick={login}>
            Log In to Deezer
        </button>
    </section>
);

export default Login;