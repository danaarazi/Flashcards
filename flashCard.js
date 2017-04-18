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
var k = 1;
var noRepeats = new Array (); //create the array for access by two functions
var reviewList = new Array ();
var listOfWordsShown = new Array ();
//var randomPlacement = 2; // deprecated 4/18/2017
//var rememberRandom = new Array (); // deprecated 4/18/2017

/**
 * Created by danaarazi on 4/7/17.  I had to write this because for some reason i could not call the same
 * file multiple times for different functions.  This structure allows me to easily add different functions to the page
 * because I can just add another function call and option to the chooseYourOwnAdventure function
 * added the third option to allow me to call some function to go backwards
 */

function chooseYourOwnAdventure(file,option) {
    if (option === 'noRepeat') {
        noRepeatWords(file);
    } else if (option === 'order') {
        orderedWords(file)
    } else if (option === 'back'){
        goBack();
    } else if (option === 'entireListTable') {
        entireListTable(file)
    } else if (option === 'reviewList') {
        reviewWordsTable()
    } else {
            saveForlater();
    }
}
function goBack(){
    if (k < listOfWordsShown.length){
        console.log("this is the goback function : " + listOfWordsShown[k]);
        document.getElementById("demo").innerHTML = listOfWordsShown[k];
        k++
    } else {
        document.getElementById("demo").innerHTML = "Beginning of the list";
    }

    }

/**
 * created by danaarazi 4/18/2017
 * This function should save words for later recall for extra study.
 * works well
 */

function saveForlater(){
    saveThisWord = document.getElementById("demo").innerHTML;
    if (saveThisWord.length < 16){
        console.log(saveThisWord);
        reviewList.push(saveThisWord);
        document.getElementById("demo").innerHTML = "<font size=\"30px\"> Saved \" " + saveThisWord +"\" for review </font>";
    } else {
        console.log(saveThisWord + " is too long");
        document.getElementById("demo").innerHTML = "<font size=\"30px\"> error \" " + saveThisWord +"\" is too long </font>";
    }


}
/**
 * this creates a table with the words that need to be reviewed
 * works pretty well
 */
function reviewWordsTable(){
    myTable = createTheTable(reviewList);
    document.getElementById("demo").innerHTML = myTable;
}
/**
 * This function populates and creates the HTML table by concatenating the entire string into myTable
 * this variable is then returned to the function called that creates the array from the list of words
 * in the text file.
 */
function createTheTable(myArray){


    var myTable= "<table><tr><td colspan='3'>Entire List of Words</td>"; //creates a heading
//creates a horizontal rule to seperate the heading
    myTable+="<tr><td colspan='3'>-------------</td>";
    //myTable+="<td>-------------</td>";
    //myTable+="<td>-------------</td></tr>";
//loops through the array and creates rows with three columns
    for (var i=0; i<= myArray.length-1; i = i + 3) {
        myTable += "<tr><td>" + myArray[i] + "</td>";
        if (myArray.length > i+1){
            console.log("i is : " + i + "after first If statement");
            console.log("array length is : " + myArray.length);
            myTable += "<td>" + myArray[i+1] + "</td>";
            if (myArray.length > i+2){
                myTable += "<td>" + myArray[i+2] + "</td></tr>";
            } else {
                myTable += "<td> end </td></tr>";
            }
        }else {
            myTable += "<td colspan='2'> end </td></tr>";
        }


    }
    myTable+="</table>"; //completes the table tag

    return myTable; //sends the concatenation to the function that called it
}

/**
 * This function creates an array from the file then passes that array to create a tableHTML element
 * the myTable variable is returned with a concatenated table created and then posts this to the proper place
 * in the html document
 * @param file1
 */
function entireListTable(file1) //this function is called when a button is clicked on the site
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
                console.log("cardlist length is : " + cardList.length);
                myTable = createTheTable(cardList);
                document.getElementById("demo").innerHTML = myTable;
            }
        }
    };
    rawFile.send(null);
}


/**
 * Created by danaarazi on 4/5/17.
 * the goal here is to get this to read through a list in order.
 * remember each time it is called and not to repeat.  One addition would be to call a python script and have it return
 * a randomized list of words.
 * also add a back button to let you decrement by one. or go back one word
 */


function orderedWords(file3) //this function is called when a button is clicked on the site
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
                i = arrayLength(lengthIs); //calls the function to increment the number
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
function arrayLength (listOfWords) // this function is for the ordered words list
{
    if (j < listOfWords)
    {
        j = j + 1;  // this needs to be here because if it goes after the return it does not execute
        console.log("inside the ArrayLength function j = " + j);
        listOfWordsShown.unshift(cardList[j-1]); // adds the words displayed to a list for going back
        k = 1; //resets counter to 1 so the back function works
        return cardList[j-1];
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
    listOfWordsShown.unshift(cardList[choice]); // adds the words displayed to a list for going back
    k = 1; //resets counter to 1 so the back function works
    console.log("just added " + cardList[choice] + " to the array for back lists");
    return cardList[choice]; //send the result to the above function
}

/**
 * Created by danaarazi on 4/5/17.  This is the simplest version.  this just randomly generates a choice.
 * there is no tracking and no memory of what was chosen. t he same word may be chosen multiple times
 * this function has been deprecated 4/18/2017
 */
/*function randomWords(file1) //this function is called when a button is clicked on the site
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
 }*/


/**
 * Created by danaarazi on 4/7/17.
 * This function allows you to go backwards in the random word list with repeats
 * had to add an array rememberRandom. to keep track of the array positions chosen
 * this function has been deprecated 4/18/2017
 */
/*function randomGoBack ()
 {
 if (rememberRandom.length === 0){ // checks to see if any words have been displayed yet
 document.getElementById("demo").innerHTML = "You need to generate a word before you can go back silly";
 } else {
 backOne = rememberRandom.length - randomPlacement;
 randomPlacement += 1;  // increments going back by one more choice. this gets reset then a new random word is generated
 if (backOne < 0) { //check to see if we are at the beginning of the list
 document.getElementById("demo").innerHTML = "Beginning of the list";
 } else { // choose the number at the position "backOne" in array rememberRandom
 document.getElementById("demo").innerHTML = cardList[rememberRandom[backOne]];
 }
 }
 }
 */