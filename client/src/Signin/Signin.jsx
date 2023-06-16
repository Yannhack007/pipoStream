import axios from 'axios';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Signin.css';

const Signin = () => {
    const [values, setValues]=useState({
        Nom : '',
        Prenom: '',
        matricule: '',
        password: ''
    })

    const handleSignin=(event)=>{
        setValues({...values,[event.target.id]:[event.target.value]})
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post('http://localhost:8081/meetup',values)
        .then(res=> alert("Registered Successfully!!"))
        .catch(err=>console.log(err));
    }

    return (
        <div className="signin">
            <div className="formulaire">
                <form onSubmit={handleSubmit} className="sign-form">
                <div className="title">
                        Sign In
                </div>
                    <div className="champs">
                        <span className="span">Name</span><input type="text" id="Nom" name="Nom"
                            onChange={handleSignin}
                        />
                        <span className="span">Surname</span><input type="text" id="Prenom" name="Prenom"
                            onChange={handleSignin}
                        />
                        <span className="span">Matricule</span><input type="text" id="matricule" name="matricule"
                        onChange={handleSignin}
                        />
                        <span className="span">Password</span><input type="password" id="password" name="password"
                        onChange={handleSignin}
                        />
                        <span className="span">Confirm Password</span><input type="password" name="" id="confirm" />
                    </div>
                    <div className="signbout">
                        <input type="submit" value="Confirm" name="Confirm" className="button" onClick={handleSignin}/>
                        <input type="reset" value="Cancel" className="button"/> 
                    </div>
                    <div className="signquestion">
                        <span className="signquestion1">Already have an account?</span>
                        <span className="signquestion1">
                            <Link className="Link" to="/Login">Login</Link>
                        </span>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Signin