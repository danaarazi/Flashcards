/**
 * Created by danaarazi on 3/29/17.
 */
function displayList (file){
    var fs = require('fs');
    var array = fs.readFileSync(file).toString().split("\n");
    for(i in array) {
        console.log(array[i]);
        var thisOne = Math.floor(Math.random() * array.length);
        console.log(thisOne);
    }

}

displayList("./list.txt");
