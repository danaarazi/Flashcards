/**
 * Created by danaarazi on 3/29/17.
 */
function displayList (file){
    var txtFile = new XMLHttpRequest();
    var allTextLines = [];
    txtFile.open("GET", file, true);
    txtFile.onreadystatechange = function() {
        if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
            if (txtFile.status === 200) {  // Makes sure it's found the file.
                allText = txtFile.responseText;

                allTextLines = allText.split("\n"); // Will separate each line into an array
                for (i in allTextLines){
                    document.write(allTextLines[i]);
                    //console.log(allTextLines[i]);
                }
            }
        }
    }

}

displayList("./list.txt");
