import React , {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';   
import axios from "axios";
import "../../css/LoginRegister.css";

export const userHash = 'secretHashHere'

export default function SignIn() {
   const navigate = useNavigate();

   const [devState, setDevState] = useState({
            userHash: userHash, // had to set the hash here 
            topic:'',
            dev_state:'',
    });

    const handleInput = (e) =>{
        const {name, value} = e.target;
    
        setDevState(prevState =>({
            ...prevState,
            [name] : value
        }))
    }

    const signedContract = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:3005/state", devState);
            if(res.status == 200)
            {
                setDevState({
                            userHash:'',
                            topic:'',
                            dev_state:'',
                            });

                console.log(devState);

                navigate('/');
               
            }
            else{
                console.log(res);
            }
          }
          catch(err){
              console.log(err);
          }
    }

    return(
        <div>
            <form className="LRForm" onSubmit = {signedContract}>

                <h1 className="header1">Create Account</h1>
                <input className ="inputBox" name = 'userHash' type="hidden"  onChange={handleInput} value={devState.userHash || ({userHash})}/>
                <input className ="inputBox" name = 'topic' type="text"  onChange={handleInput} value={devState.topic || ""} placeholder="Topic" />
                <input className ="inputBox" name = 'dev_state' type="number" onChange={handleInput} value={devState.dev_state || ""}   placeholder="State: 1 or 0" />
                <button className="loginRegbuttons" type="submit"> Change state </button>

              </form>
        </div>
    )
}