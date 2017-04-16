/**
 * Created by danaarazi on 4/5/17.
 * the goal here is to get this to read through a list in order.
 * remember each time it is called and not to repeat.  One addition would be to call a python script and have it return
 * a randomized list of words.
 * also add a back button to let you decrement by one. or go back one word
 */
var j = 0;
function orderedWords(file) //this function is called when a button is clicked on the site
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false); //the file name is passed to the function from the website. this will change when calling the python script
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4) //checks to see if the data has been received
        {
            if(rawFile.status === 200 || rawFile.status == 0) //checks for status ok from server
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
function arrayLength (listOfWords)
{
    if (j < listOfWords)
    {
        j = j + 1;  // this needs to be here because if it goes after the return it does not execute
        console.log("inside the ArrayLength function j = " + j);
        return cardList[j-1];

    } else
    {
        j = 0;  // it is equal to 1 because the number being sent to listOfWords is length -1
        console.log("this is the else in the second function. And this is what j = " + j);
        return "End of list starting over";
    }


}
