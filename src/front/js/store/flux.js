const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStorage: () => {
				const token = sessionStorage.getItem("token");
				console.log("SYNCINGSESIONTOKEN")
				if(token && token != "" && token != undefined) setStore({ token: token });
			},

			
			// LOG OUT !!
			signout: () => {
				sessionStorage.removeItem("token");
				console.log("SIGNING OUT");
				setStore({ token: null });
			},


			// LOGIN !!
			login: async (email, password) => {
				try {
					const opts = {
						method: 'POST',
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: email,
							password: password
						})
					};

					const resp = await fetch('https://mikiemapo-sturdy-enigma-56p47gpvj79375jp-3001.preview.app.github.dev/api/token', opts);
					if (resp.status !== 200) {
						alert('THERE WAS AN ERROR!!!!!!!!');
						return false;
					}

					const data = await resp.json();
					console.log('ACCESSTOKENBACK', data);
					sessionStorage.setItem('token', data.access_token);
					setStore({ token: data.access_token });
					return true;
				} catch (error) {
					console.error('THERE WAS AN ERROR!!!!!!!!', error);
				}
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
