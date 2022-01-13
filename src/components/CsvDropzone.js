import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default CsvDropzone;