function CsvTable({data}) {
	return (
		<table>
	        {data.map((row_obj, row_idx) => (
	          <tr key={row_idx}>
	            {Object.keys(row_obj).map((cell_name, cell_idx) => (
	              <td key={cell_idx}>{cell_name}</td>
	            ))}
	          </tr>
	        ))}
    	</table>
	)
}

export default CsvTable;