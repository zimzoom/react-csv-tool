import { useState } from 'react';
import clone from '../util.js';

function CsvTable(props) {
	const [state, setState] = useState({ 
		data: props.initialData, 
		sortby: null,
		descending: false,
		editCell: null
	});
	const [headers, setHeaders] = useState(Object.keys(props.initialData[0]));
	//const [editCell, setEditCell] = useState(null); // row: index, column: index

	// Sorts by column clicked - reverse order if clicked again
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
		setState({ ...state, data: dataClone, sortby: column, descending: descending});
	}

	// Changes cell to input field when double-clicked
	const showEditor = e => {
		setState({
			...state,
			editCell: {
				row: parseInt(e.target.closest("tr").dataset.row, 10),
				column: e.target.cellIndex,
			}
		});
	}

	// Saves changes from input field
	const save = e => {
		e.preventDefault();
		const input = e.target.firstChild;
		const dataClone = clone(state.data);
		const editRow = state.editCell.row;
		const editCol = state.editCell.column;
		dataClone[editRow][headers[editCol]] = input.value;
		setState({...state, data: dataClone, editCell: null});
	}

	return (
		<table>
			<thead onClick={sort}>
				<tr>{headers.map((header, idx) => {
					if (state.sortby === header) {
						// add arrow to signify sorting column
						header += state.descending ? ' \u2191' : ' \u2193';
					}
					return <th key={idx}>{header}</th>;
				})}</tr>
			</thead>
			<tbody onDoubleClick={showEditor}>
		        {state.data.map((row_obj, row_idx) => (
		          <tr key={row_idx} data-row={row_idx}>
		            {headers.map((col, col_idx) => {
						if (state.editCell && state.editCell.row === row_idx && state.editCell.column === col_idx) {
							return <td key={col_idx}>
									<form onSubmit={save}>
										<input type="text" defaultValue={row_obj[col]} />
									</form>
								</td>;
						}
		            	return <td key={col_idx}>{row_obj[col]}</td>;
					})}
		          </tr>
		        ))}
	        </tbody>
    	</table>
	)
}

export default CsvTable;