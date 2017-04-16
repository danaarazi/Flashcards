/**
 * Created by danaarazi on 3/29/17.
 */
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                allTextLines = allText.split("\n");
                for (i in allTextLines){
                    document.write("<p>" + allTextLines[i] + "</p>");
                }

            }
        }
    }
    rawFile.send(null);
}
readTextFile("./list.txt");
