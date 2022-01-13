import { useState } from 'react';
import clone from '../util.js';

function CsvTable(props) {
	const [data, setData] = useState(props.data);
	const [headers, setHeaders] = useState(Object.keys(data[0]));

	const sort = e => {
		const column = headers[e.target.cellIndex];
		const dataClone = clone(data);
		dataClone.sort((a, b) => {
			if (a[column] === b[column]) {
				return 0;
			}
			return a[column] > b[column] ? 1 : -1;
		});
		setData(dataClone);
	}

	return (
		<table>
			<thead onClick={sort}>
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