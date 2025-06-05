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
	const [selectedPosition, setSelectedPosition] = useState("")


	const loadData = async () => {
		const res = await fetch(`${url}/politicians`);
		const data = await res.json();
		setData(data);
	};

	useEffect(() => {
		loadData();
	}, []);

	const filtredData = useMemo(() => data.filter(el => (el.name.toLowerCase().includes(search.toLowerCase()) ||
		el.biography.toLowerCase().includes(search.toLowerCase())) &&
		(selectedPosition === "" || el.position === selectedPosition)), [data, search, selectedPosition])

	// console.log(data);
	// console.log(search);

	// posizioni uniche
	const positions = useMemo(() => {
		const list = [];
		data.forEach(el => {
			if (!list.includes(el.position)) { list.push(el.position) }
		});
		return list;
	}, [data]);

	// console.log("list", positions);
	// console.log(position);

	return (

		<>
			<span>Cerca:</span>
			<input type="text" value={search} onChange={e => setSearch(e.target.value)} />

			<select name="positions" id="positions" onChange={e => setSelectedPosition(e.target.value)}>
				<option value="">--Please choose an option--</option>
				{positions.map(el => <option value={el}>{el}</option>)}
			</select >

			<ul>
				{filtredData.map(p => (
					<li key={p.id}>
						<PoliticianCard name={p.name} position={p.position} biography={p.biography} image={p.image} />
					</li>
				))}
			</ul>
			{filtredData.length === 0 && "Nessun risulato trovato"}

		</>
	)
}

export default App
