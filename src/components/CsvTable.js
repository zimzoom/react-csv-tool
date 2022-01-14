import { useState } from 'react';
import clone from '../util.js';

function CsvTable(props) {
	const [state, setState] = useState({ 
		data: props.initialData, 
		sortby: null,
		descending: false
	});
	const [headers, setHeaders] = useState(Object.keys(props.initialData[0]));

	const sort = e => {
		const column = headers[e.target.cellIndex];
		const dataClone = clone(state.data);
		const descending = state.sortby === column && !state.descending;
		dataClone.sort((a, b) => {
			if (a[column] === b[column]) {
				return 0;
			}
			return descending ?
				a[column] < b[column] ? 1 : -1
				: a[column] > b[column] ? 1 : -1;
		});
		setState({ data: dataClone, sortby: column, descending: descending});
	}

	return (
		<table>
			<thead onClick={sort}>
				<tr>{headers.map((header, idx) => {
					return <th key={idx}>{header}</th>;
				})}</tr>
			</thead>
			<tbody>
		        {state.data.map((row_obj, row_idx) => (
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