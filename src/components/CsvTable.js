function CsvTable({data}) {
	const headers = Object.keys(data[0]);

	return (
		<table>
			<thead>
				<tr>{headers.map((header, idx) => {
					return <th key={idx}>{header}</th>;
				})}</tr>
			</thead>
			<tbody>
		        {data.map((row_obj, row_idx) => (
		          <tr key={row_idx}>
		            {headers.map((col, col_idx) => (
		            	<td key={col_idx}>{row_obj[col]}</td>
		            ))}
		          </tr>
		        ))}
	        </tbody>
    	</table>
	)
}

export default CsvTable;