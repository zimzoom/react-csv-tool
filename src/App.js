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
        console.log("parsed!")
        console.log(results.data)
        setParsedCsvData(results.data)
      },
    });
  };

  return (
    <div className="App">
      <CsvDropzone handleDrop={parseFile}/>

      {parsedCsvData && <CsvTable data={parsedCsvData} />}
    </div>
  );
}

export default App;
