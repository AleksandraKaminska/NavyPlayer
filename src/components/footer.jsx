import React from 'react';
import { login } from './functions.js';

const Footer = () => (
    <footer>
        <p onClick={login}>
            Powered by Deezer <a href="http://www.deezer.com/pl/" target='_blank' rel="noopener noreferrer">
                <img src="images/DZ_Logo.png" alt='Deezer Logo'/>
            </a>
        </p>
    </footer>
);

export default Footer;