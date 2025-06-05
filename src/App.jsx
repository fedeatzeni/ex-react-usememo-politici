import { useState, useEffect, useMemo, memo } from "react"

//fuori dal componente per evitare il re render
const PoliticianCard = memo(({ name, position, biography, image }) => {
	console.log("Render");
	return <>
		<p>{`Nome: ${name}`}</p>
		<p>{`Posizione: ${position}`}</p>
		<p>{`Biografia: ${biography}`}</p>
		<img src={image} alt={name} />
	</>
});

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
						<PoliticianCard name={p.name} position={p.position} biography={p.biography} image={p.image} />
					</li>
				))}
			</ul>

		</>
	)
}

export default App
