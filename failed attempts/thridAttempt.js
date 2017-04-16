/**
 * Created by danaarazi on 3/29/17.
 */
function register(){
    var ids = new Array['name','lname','email','password','cpassword'];

    for(var i = 0; i < ids.length; i++){
        document.write("<br>"+ids[i]);
    }
}

document.getElementById("demo").innerHTML=register();