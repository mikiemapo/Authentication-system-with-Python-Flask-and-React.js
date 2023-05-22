import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const token = sessionStorage.getItem('token');

	// LOG OUT !!
	const handleOut = () => {
		sessionStorage.clear()
	}

	// LOG IN !!
	const handleClick = () => {
		const opts = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password
			})
		};


		fetch('https://mikiemapo-sturdy-enigma-56p47gpvj79375jp-3001.preview.app.github.dev/api/token', opts)
			.then(resp => {
				if (resp.status === 200) {
					return resp.json();
				} else {
					alert('THERE WAS AN ERROR!!!!!!!!');
				}
			})
			.then(data => {
				console.log('ACCESSTOKENBACK', data)
				sessionStorage.setItem('token', data.access_token);
			})
			.catch(error => {
				console.error('THERE WAS AN ERROR!!!!!!!!', error);
			});
	}

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			{
			(token && token!="" && token!= undefined) 
			? 
			<div>
			'You are logged in' + {token} 
				<Link to ='/login' >
				<button onClick={handleOut}>SIGN OUT</button>
				</Link>
			</div> 
			: 
			<div>
			<input type='text' placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
			<input type='password' placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button onClick={handleClick}>LOGIN</button>
			</div>
			}
		</div>
	);
};
