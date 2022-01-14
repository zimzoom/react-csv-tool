import 'bootstrap/dist/css/bootstrap.min.css';

import {useState} from 'react';
import CsvDropzone from './components/CsvDropzone';
import CsvTable from './components/CsvTable.js';
import Papa from 'papaparse';

function App() {
  const [parsedCsvData, setParsedCsvData] = useState([]);
  var file;

  const parseFile = file => {
    Papa.parse(file, {
      header: true,
      complete: results => {
        setParsedCsvData(results.data);
      },
    });
  };

  return (
    <div className="App">
      <CsvDropzone handleDrop={parseFile}/>

      {!!parsedCsvData.length && <CsvTable initialData={parsedCsvData} />}
    </div>
  );
}

export default App;
