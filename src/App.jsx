import { useState, useEffect } from "react"

function App() {

	const url = "http://localhost:3333"

	const [data, setData] = useState([])

	const loadData = async () => {
		const res = await fetch(`${url}/politicians`);
		const data = await res.json();
		setData(data);
	};

	useEffect(() => {
		loadData();
	}, []);

	console.log(data);

	return (

		<>
			<h2>Lista Politici</h2>
			<ul>
				{data.map(p => (
					<li key={p.id}>
						<p>{`Nome: ${p.name}`}</p>
						<p>{`Posizione: ${p.position}`}</p>
						<p>{`Biografia: ${p.biography}`}</p>
						<img src={p.image} alt={p.name} />
					</li>
				))}
			</ul>

		</>
	)
}

export default App
