import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import './dropzone.css';

function CsvDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
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