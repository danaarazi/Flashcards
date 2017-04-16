/**
 * Created by danaarazi on 4/5/17.  This is the simplest version.  this just randomly generates a choice.
 * there is no tracking and no memory of what was chosen. t he same word may be chosen multiple times
 */
function randomWords(file) //this function is called when a button is clicked on the site
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false); //the file name is passed to the function from the website
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4) //checks to see if the data has been recieved
        {
            if(rawFile.status === 200 || rawFile.status == 0) //checks for status ok from server
            {
                var allText = rawFile.responseText;
                cardList = allText.split("\n");
                var randomChoice = Math.floor(Math.random() * (cardList.length-1));
                console.log(cardList.length);
                console.log(randomChoice);
                console.log(cardList[randomChoice]);
                //document.write("<p>" + cardList[randomChoice] + "</p>" + nextWord);
                document.getElementById("demo").innerHTML = cardList[randomChoice];

            }
        }
    }
    rawFile.send(null);
}
