/**
 * Created by danaarazi on 4/5/17.
 */
var noRepeats = new Array (); //create the array for access by both functions

function noRepeatWords(file) //this function is called when a button is clicked on the site
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false); //the file name is passed to the function from the website
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4) //checks to see if the data has been received
        {
            if(rawFile.status === 200 || rawFile.status == 0) //checks for status ok from server
            {
                var allText = rawFile.responseText;
                cardList = allText.split("\n");
                if (noRepeats.length < cardList.length){ //make sure the arrays are different lengths.
                    var randomChoice = Math.floor(Math.random() * (cardList.length-1));
                    console.log("random Number generated " + randomChoice);
                    var checkForRepeatsOutputs = checkForRepeats(randomChoice);
                    console.log(checkForRepeatsOutputs);
                    document.getElementById("demo").innerHTML = checkForRepeatsOutputs; //send word to webpage
                } else { //the arrays are equal in length
                    noRepeats = []; //reset the noRepeat array
                    document.getElementById("demo").innerHTML = "End of list starting over"; //tell the user you are restarting
                }



            }
        }
    };
    rawFile.send(null);
}
/**Checks if the number is in the list. If it is in the list then generate a new random number
 * keep doing this until you generate a number that is not in the array noRepeats.
 * Also the list of words and the noRepeat cannot be the same length
 * once a unique number is found return that choice to the above function to then post
 * it to the website
 * then add the number to the noRepeats array
 */
function checkForRepeats(choice)
{

    while (noRepeats.indexOf(choice) !== -1 && noRepeats.length != cardList.length) // checks if the number is in the list
    {
        choice = Math.floor(Math.random() * (cardList.length));
        console.log("random in while loop " + choice);
    }
    noRepeats.push(choice); //add the unique number to the noRepeats array
    console.log("noRepeats array " + noRepeats.length);
    return cardList[choice]; //send the result tot he above function
}