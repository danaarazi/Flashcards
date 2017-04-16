/**
 * Adding a change to commit to git will delete in a second
 * Created by danaarazi on 3/31/17.  This has three separate functions designed to take a list of words and present
 * them to the user in three different formats.
 * 1: In the order the list is created
 * 2: In random order with repeating words from the list
 * 3: In random order without repeats
 * one addition will be to add the ability to go back wards and forwards in the list **done 4/7**
 * still need a go back function with the random no repeat list
 **/

var j = 0;
var randomPlacement = 2;
var noRepeats = new Array (); //create the array for access by both functions
var rememberRandom = new Array ();
/**
 * Created by danaarazi on 4/7/17.  I had to write this because for some reason i could not call the same
 * file multiple times for different functions.  This structure allows me to easily add different functions to the page
 * because I can just add another function call and option to the chooseYourOwnAdventure function
 * added the third option to allow me to call some function to go backwards
 */

function chooseYourOwnAdventure(file,option,goBack) {
    if (option === 'random' && goBack !== 'back') {
        randomWords(file);
    } else if (option === 'order') {
        orderedWords(file, goBack)
    } else if (goBack === 'back' && option === 'random'){
        randomGoBack();
    } else {
        noRepeatWords(file);
    }
}

/**
 * Created by danaarazi on 4/5/17.  This is the simplest version.  this just randomly generates a choice.
 * there is no tracking and no memory of what was chosen. t he same word may be chosen multiple times
 */
function randomWords(file1) //this function is called when a button is clicked on the site
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file1, false); //the file name is passed to the function from the website
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4) //checks to see if the data has been received
        {
            if(rawFile.status === 200 || rawFile.status === 0) //checks for status ok from server
            {
                var allText = rawFile.responseText;
                cardList = allText.split("\n");
                var randomChoice = Math.floor(Math.random() * (cardList.length-1));
                console.log("length of card list " + cardList.length);
                console.log("random number chosen " + randomChoice);
                console.log("the word chosen " + cardList[randomChoice]);
                rememberRandom.push(randomChoice); // this keeps track of the random number generated
                randomPlacement = 2; // this resets the go bck function to start at the end of the list again
                document.getElementById("demo").innerHTML = cardList[randomChoice];
            }
        }
    };
    rawFile.send(null);
}
/**
 * Created by danaarazi on 4/7/17.
 * This function allows you to go backwards in the random word list with repeats
 * had to add an array rememberRandom. to keep track of the array positions chosen
 */
function randomGoBack ()
{
    if (rememberRandom.length === 0){ // checks to see if any words have been displayed yet
        document.getElementById("demo").innerHTML = "You need to generate a word before you can go back silly";
    } else {
        backOne = rememberRandom.length - randomPlacement;
        randomPlacement += 1;  // increments going back by one more choice. this gets reset then a new random word is generated
        if (backOne < 0) { //check to see if we are at the beginning of the list
            document.getElementById("demo").innerHTML = "This is the beginning of the list";
        } else { // choose the number at the position "backOne" in array rememberRandom
            document.getElementById("demo").innerHTML = cardList[rememberRandom[backOne]];
        }
    }
}

/**
 * Created by danaarazi on 4/5/17.
 * the goal here is to get this to read through a list in order.
 * remember each time it is called and not to repeat.  One addition would be to call a python script and have it return
 * a randomized list of words.
 * also add a back button to let you decrement by one. or go back one word
 */


function orderedWords(file3,back3) //this function is called when a button is clicked on the site
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file3, false); //the file name is passed to the function from the website. this will change when calling the python script
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4) //checks to see if the data has been received
        {
            if(rawFile.status === 200 || rawFile.status === 0) //checks for status ok from server
            {
                var allText = rawFile.responseText;
                cardList = allText.split("\n");
                lengthIs = cardList.length;
                console.log("this is the length", lengthIs);
                i = arrayLength(lengthIs, back3); //calls the function to increment the number
                console.log("this is i", i);
                console.log(i);
                document.getElementById("demo").innerHTML = i;
            }
        }
    };
    rawFile.send(null);
}
/**
 * This function loops through a number that is set by the length of the array called cardList
 * this lets you go through the list in order
 * the next step is to have the list that is sent be randomized by a python script
 * or you can just take the list in order
 * @param listOfWords
 * @returns {number}
 */
function arrayLength (listOfWords,back3) // this function is for the ordered words list
{
    if (j < listOfWords)
    {
        if (back3 === 'back'){
            j -= 1;
            if (j < 1){
                return "This is the beginning of the list";
            } else {
                return cardList[j-1];
            }
        } else {
            j = j + 1;  // this needs to be here because if it goes after the return it does not execute
            console.log("inside the ArrayLength function j = " + j);
            return cardList[j-1];
        }
    } else
    {
        j = 0;  // it is equal to 1 because the number being sent to listOfWords is length -1
        console.log("this is the else in the second function. And this is what j = " + j);
        return "End of list starting over";
    }
}

/** This function generates the words in random order
 * There should be no repeated words as long as the list in comprised of unique words.
 * Check to make sure local and global variables do not interfere.
 * In particular cadList may be an issue
 */

function noRepeatWords(file2) //this function is called when a button is clicked on the site
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file2, false); //the file name is passed to the function from the website
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4) //checks to see if the data has been received
        {
            if(rawFile.status === 200 || rawFile.status ===0) //checks for status ok from server
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
function checkForRepeats(choice) //This function is for the random noRepeatWords function
{
    while (noRepeats.indexOf(choice) !== -1 && noRepeats.length !== cardList.length) // checks if the number is in the list
    {
        choice = Math.floor(Math.random() * (cardList.length));
        console.log("random in while loop " + choice);
    }
    noRepeats.push(choice); //add the unique number to the noRepeats array
    console.log("noRepeats array " + noRepeats.length);
    return cardList[choice]; //send the result tot he above function
}