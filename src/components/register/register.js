import React from "react";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
            registerConfirmation: '',
        }
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value});
    }

    onConfirmationChange = (event) => {
        this.setState({registerConfirmation: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch("https://face-recognition-api-5adn.onrender.com/register", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                confirmation: this.state.registerConfirmation,
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render() {
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 shadow-5 w-50-m w-25-1 mw6 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={this.onNameChange} className="pa2 br2 input-reset ba bg-transparent hover-bg-moon-gray hover-white w-100" type="text" name="name"  id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 br2 input-reset ba bg-transparent hover-bg-moon-gray hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 br2 input-reset ba bg-transparent hover-bg-moon-gray hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="confirm-password">Confirm Password</label>
                            <input onChange={this.onConfirmationChange} className="b pa2 br2 input-reset ba bg-transparent hover-bg-moon-gray hover-white w-100" type="password" name="confirm-password"  id="confirm-password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('signin')} className="f6 link dim black db">Sign In</p>
                        </div>
                    </div>
                </main>
            </article>

        )
    }
}

export default Register;