import {useState} from 'react';
import CsvDropzone from './components/CsvDropzone';
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

      <table>
        {parsedCsvData && parsedCsvData.map((row_obj, row_idx) => (
          <tr key={row_idx}>
            {Object.keys(row_obj).map((cell_name, cell_idx) => (
              <td key={cell_idx}>{cell_name}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
