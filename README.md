# what type is this pokémon?

A demo using local SQLite using [p5.js](https://p5js.org) & [sql.js](https://github.com/sql-js/sql.js)

## Overview

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com) : For code changes, reading `.md` etc.
- [SQLite 3 editor](https://marketplace.visualstudio.com/items?itemName=yy0931.vscode-sqlite3-editor) : Make queries and changes to the database and its schema
- [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) : To host and run the files as if it was a server serving http requests.

### Files

#### Library files

Because all library files used in this project are located within the project, this application can also run offline without internet.

#### Files you shouldn't really care about

- `p5.js` : Library for drawing things to the DOM (Web browser)
- `sql-wasm.js` : Library for interacting with SQLite databases
- `sql-wasm.wasm` : The underlying WebAssembly that the library `sql-wasm.js` is using for the underlying database connection.
- `.vscode` : A folder containing extra information used by visual studio code, currently contains conditional formatting for the database, coloring the rows for the different pokemon types.

#### Files you should care about

- `index.html` : The html that runs and shows the javascript (`.js`) code, there is no real need to change anything in this file, unless stylesheets, static html or new libraries have to be added.
- `sketch.js` : Custom js to handle app (Your code goes here)
- `demo.db` : You database file for which you can query and or modify, currently contains a table for all pokemons, which have been imported from `.csv` via the vscode extension [SQLite 3 editor](https://marketplace.visualstudio.com/items?itemName=yy0931.vscode-sqlite3-editor). The .csv can be found [here](https://gist.github.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6) (Right-click on raw and select 'Download link as file')

### Getting started

#### Run the project

- Clone the project using git or download as a .zip
- If zip, unpack to a folder
- Open the folder using visual studio code
- If [LiveServer](#prerequisites) is installed, in the lower right corner there is a "Go Live" button, press that and a new browser window is open.
- The browser window should show the html (`index.html`) and should be running the `sketch.js` code.
- Press f12 and go to the console tab to see any debug information.

#### Look in the database

- If [SQLite 3 editor](#prerequisites) is installed, double-click the `demo.db` file from visual studio code.
- This opens up the database where you can select from which table to view.
- Tables is the equivalent of an excel sheet, with the exception that each column can only be of one type, this is defined in the schema of the table, which also can be accessed or modified in the editor.

#### What's next?

This project has intentional shortcomings, as an easier for the ones who would to play around and extend this projects functionality. Ideas to additions/changes could be:

- Add the missing color types in `sketch.js`
- There is more data that can be shown, such as pokémons that have more than one type? How would you visualize that?
- In the dropdown you can search though by the first letter of the pokémon, can you add a dedicated search field with a dropdown like google searches?

___Made without AI___
