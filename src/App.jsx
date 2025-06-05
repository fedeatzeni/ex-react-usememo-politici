import { useState, useEffect, useMemo } from "react"

function App() {

	const url = "http://localhost:3333"

	const [data, setData] = useState([])
	const [search, setSearch] = useState("")


	const loadData = async () => {
		const res = await fetch(`${url}/politicians`);
		const data = await res.json();
		setData(data);
	};

	useEffect(() => {
		loadData();
	}, []);

	const filtredData = useMemo(() => data.filter(el => el.name.toLowerCase().includes(search.toLowerCase()) ||
		el.biography.toLowerCase().includes(search.toLowerCase())), [data, search])

	// console.log(data);
	// console.log(search);

	return (

		<>
			<h2>Lista Politici</h2>
			<span>Cerca:</span>
			<input type="text" value={search} onChange={e => setSearch(e.target.value)} />
			<ul>
				{filtredData.map(p => (
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
