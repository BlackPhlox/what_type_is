// Database connection setup
const sqlPromise = initSqlJs({
  locateFile: file => `${file}`
});
const dataPromise = fetch("demo.db").then(res => res.arrayBuffer());

// My variables
let pokeSelect;

// Color types
let pokeTypeColorMap = {
  "Water" : "blue",
  "Ice" : "lightblue",
  "Grass": "green",
  "Fire": "red",
  "Electric": "yellow",
  // Add missing types here
}

// Setup function, runs once
async function setup(){
    // Load db connection and the demo database
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
    const db = new SQL.Database(new Uint8Array(buf));
    
    // Your code here
    console.log("Hello World 👋");
    createCanvas(800, 500);

    console.log("Database: ", db);

    // The function call below is called an SQL Statement 
    // which in this case gets the Name column of every row of pokémon
    // The output of the executed statement is in this format:
    // [
    // {
    //    "columns": ['Name'],
    //    "values": [["Bulbasaur"],["Ivysaur"],["Venusaur"]...]
    // }
    // ]
    let allPokemonNames = db.exec("SELECT Name FROM pokemon");
    console.log("All Pokémon names raw:", allPokemonNames);
    // to just get the names in a easier-to-handle format, ie. ["Bulbasaur","Ivysaur",...]
    // we can access the inner array and flatten the result using the flat method
    console.log("All Pokémon names formatted:", allPokemonNames[0]["values"].flat());

    // However, we want both the name and the first type of pokemon
    // Thus, we can create a new SQL statement, select both columns
    // We have to use `` here because there is a space in the type column name:
    let allPokemonNamesAndTheirType = db.exec("SELECT Name,`Type 1` FROM pokemon");
    console.log("All Pokémon names & types raw:",allPokemonNamesAndTheirType);
    // Now the format is:
    // [
    // {
    //    "columns": ['Name', 'Type 1'],
    //    "values": [["Bulbasaur", 'Grass'],["Ivysaur", 'Grass']...]
    // }
    // ]
    // We do the same as before but we instead map each pokémon to an object
    let flattenPokemonNamesAndTheirType = allPokemonNamesAndTheirType[0]["values"].map(p => {
      return { "Name" : p[0], "Type": p[1] };
    } );
    console.log("All Pokémon names & types formatted:",flattenPokemonNamesAndTheirType);

    // Now , lets add the all the pokémons to the html select element:

    // createSelect - https://p5js.org/reference/p5/createSelect/
    pokeSelect = createSelect();
    pokeSelect.position(width / 2 - 100, 200);

    // The empty / start select
    pokeSelect.option('');

    flattenPokemonNamesAndTheirType.forEach(pokemon => {
      pokeSelect.option(pokemon.Name, pokemon.Type)
    });

    // For making specific lookups in the database, you could do like shown below.
    // NOTICE: You should try not call the database in the draw loop, that would not
    // be such a good idea, since then you would be calling the database 60 times a second!
    // instead, use the prepare & getAsObject method combo as shown below or
    // use the prepare & bind & step method when you require a new lookup, again only do this 
    // on a state-change and not continuously, as that would also call the db 60 times a second.
    // if you no longer need the prepare, you then can call stmt.free() to free it from memory.

    // NOTICE: || is a simple string concatenation, we have to do this in order to escape
    // the string and for the $name param to be valid when read by the database connector
    // otherwise would the statement always be looking 
    // for $name and not actual parameter provided (in this case Pike and or Psy)

    var stmt = db.prepare("SELECT * FROM pokemon WHERE Name LIKE '%' || $name || '%'");
    console.log(stmt);
    console.log("Result from searching 'Pika': ", stmt.getAsObject({ $name: "Pika" }));

    // Bind step method
    stmt.bind({$name: "Psy"});
    stmt.step();
    console.log("Result from searching 'Psy': ", stmt.getAsObject());
    stmt.free();

    // Set the selected option to "" (empty).
    pokeSelect.selected('');

    // Setting up font configuration for p5.js
    textAlign(CENTER,CENTER);
    textSize(48);
}

// Draw function, runs 60 frames per second
function draw(){
    let pokemonType = pokeSelect.selected();

    // Determine the color for the background based on the type
    let bgColor = pokeTypeColorMap[pokemonType];
    if(bgColor == null) bgColor = "white";
    background(bgColor);

    // Display the type value of the Pokémon
    text("What type is...?", width / 2, height / 2 - 100);
    if(pokemonType === ""){
      pokemonType = "?";
    }
    text(pokemonType, width / 2, height / 2);
}