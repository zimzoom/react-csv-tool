# React CSV Tool

Takes a CSV file from user and displays it back in browser with these abilities:

* Sort by column (ascending or descending)
* Double-click cell to edit, hit enter to save
* Filter results by search term 

This tool strives for a functional style: uses only function React components, hooks, immutable data, recursion over loops, pure functions, etc.

### Usage notes

* Assumes CSV file contains header row

### Packages

* [Dropzone](https://react-dropzone.js.org/) for drop file functionality
* [Papaparse](https://www.papaparse.com/) for CSV import and parsing
* [Bootstrap](https://react-bootstrap.github.io/) for styling