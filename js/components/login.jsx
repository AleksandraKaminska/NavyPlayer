import React from 'react';

class Login extends React.Component {
    login = () => {
        DZ.login(response => {
            if (response.authResponse) {
                DZ.api('/user/me', response => {
                    console.log('Success.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {
            perms: 'basic_access,email'
        });
    }

    render() {
        return (
            <section id='login'>
                <button className="login" onClick={this.login}>
                    Log In to Deezer
                </button>
            </section>
        );
    }
}

export default Login;
