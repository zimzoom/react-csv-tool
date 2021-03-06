import { useState } from 'react';
import clone from '../util.js';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

// Expects array of objects, which requires Papaparse 'headers' set to true
function CsvTable(props) {
	const [state, setState] = useState({ 
		data: props.initialData.map((row_obj, idx) => ({...row_obj, ID: idx})), 
		sortby: null,
		descending: false,
		editCell: null, // {row: index, column: index}
		searching: false,
		preSearchData: null,
	});
	const [headers, setHeaders] = useState(Object.keys(props.initialData[0]));

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

	// Saves changes from editor input field
	const save = e => {
		e.preventDefault();
		const input = e.target.firstChild;
		const editRow = state.editCell.row;
		const editCol = state.editCell.column;
		const dataClone = state.data.map((row) => {
			if (row.ID === editRow) {
				row[headers[editCol]] = input.value;
			}
			return row;
		});
		// If there is cached pre-search data, need to edit that as well
		if (state.preSearchData) {
			const preSearchClone = state.preSearchData.map((row) => {
				if (row.ID === editRow) {
					row[headers[editCol]] = input.value;
				}
				return row;
			});
			setState({
				...state,
				editCell: null,
				preSearchData: preSearchClone,
				data: dataClone
			});
		} else {
			setState({...state, editCell: null, data: dataClone});
		}
	}

	// Filter data based on search input
	const search = (e) => {
		const query = e.target.value.toLowerCase();
		// If user erases input, reload original data
		if (!query) {
			setState({...state, data: state.preSearchData});
			return;
		}
		const idx = e.target.dataset.idx;
		const searchData = state.preSearchData.filter((row) => {
			return (
				!!row[headers[idx]] && // handles rows that are blank for this column
				row[headers[idx]].toString().toLowerCase().indexOf(query) > -1
			);
		});
		setState({...state, data: searchData});
	}

	// Show/hide search bar, enter/exit search mode
	const toggleSearch = () => {
		// If going from searching to not searching,
		// reload pre-search (unfiltered) data and clear presearch 
		if (state.searching) {
			setState({
				...state,
				data: state.preSearchData,
				searching: false,
				preSearchData: null,
			});
		} else {
			// If going from not searching to searching,
			// save copy of unfiltered data
			setState({...state, searching: true, preSearchData: state.data});
		}
	}

	const searchRow = !state.searching ? null : (
		<tr onChange={search}>
			{headers.map((_, idx) => (
				<td key={idx}>
					<input type="text" data-idx={idx} />
				</td>
			))}
		</tr>
	);

	return (
		<>
		<Button variant="primary" onClick={toggleSearch}>
			{state.searching ? 'Hide Search' : 'Show search'}
		</Button>
		<Table striped bordered>
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
				{searchRow}
		        {state.data.map((row_obj, row_idx) => (
		          <tr key={row_obj.ID} data-row={row_obj.ID}>
		            {headers.map((col, col_idx) => {
						if (state.editCell && state.editCell.row === row_obj.ID && state.editCell.column === col_idx) {
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
    	</Table>
		</>
	)
}

export default CsvTable;