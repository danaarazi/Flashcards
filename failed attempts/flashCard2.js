/**
 * Created by danaarazi on 3/29/17.
 */
function displayList (file){
    var fs = require('fs');
    var array = fs.readFileSync(file).toString().split("\n");
    var randomChoice = Math.floor(Math.random() * (array.length-1));
    console.log(array.length);
    console.log(randomChoice);
    console.log(array[randomChoice]);

}

displayList("./list.txt");
