import {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import './dropzone.css';
import Papa from 'papaparse';

function CsvDropzone() {
	const [parsedCsvData, setParsedCsvData] = useState([]);

	const parseFile = file => {
		Papa.parse(file, {
			header: true,
			complete: results => {
				console.log("parsed!")
				console.log(results.data)
				setParsedCsvData(results.data)
			},
		});
	};

	const onDrop = useCallback(acceptedFiles => {
	if (acceptedFiles.length) {
		console.log(acceptedFiles[0]);
		parseFile(acceptedFiles[0]);
	}
	}, []);

	const {
		getRootProps, 
		getInputProps, 
		isDragActive, 
		isDragAccept, 
		isDragReject
	} = useDropzone({onDrop, accept: 'text/csv'})

	return (
		<div {...getRootProps({
			className: `dropzone 
			${isDragAccept && 'fileAccept'} 
			${isDragReject && 'fileReject'}`
		})}>
		  <input {...getInputProps()} />
		  {
		    isDragActive ?
		      <p>Drop here ...</p> :
		      <p>Drag 'n' drop a CSV file here, or click to select file</p>
		  }
		</div>
	)
}

export default CsvDropzone;