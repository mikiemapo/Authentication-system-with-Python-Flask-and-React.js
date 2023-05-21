import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(" ");
	const [password, setPassword] = useState(" ");

	const handleClick = () => {
		const opts = {
			method: 'POST',
			Body: JSON.stringify({
				"email": "test" ,
 				"password" : "test"
		})
		};


		fetch('https://mikiemapo-sturdy-enigma-56p47gpvj79375jp-3001.preview.app.github.dev/api/token', opts)
		.then(resp =>{
			if(resp.status == 200) return resp.json;
			else alert('THERE WAS AN ERROR!!!!!!!!');
		})
		.then()
		.catch(error => {
			console.error('THERE WAS AN ERROR!!!!!!!!', error);
		})
	}

	
	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			
			
				<input type='text' placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <input type='password' placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				
                <button onClick={handleClick}>LOGIN</button>
                
			
		</div>
	);
};
