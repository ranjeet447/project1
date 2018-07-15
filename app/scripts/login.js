
var modal = document.getElementById('forgetPassModal');
var forgetPass = document.getElementById("forgetPass");
var span = document.getElementsByClassName("closeBtn")[0];

forgetPass.onclick = function() {
    modal.style.display = "block";
}
// n <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    // console.log("close clicked");
}
//clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        // console.log("clicked outside modal");
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

if(getCookie('x-auth')!=null){
    window.location.href = '/profile';
}

function logIn(){

    var formData =JSON.stringify({
        "email":document.getElementById('email').value.toString(),
        "password":document.getElementById('password').value.toString()
    });

    console.log(formData);
    

    $.ajax({
        type: "POST",
        url: "api/login",
        data: formData,
        dataType: "json",
        async:false,
        contentType : "application/json",
        statusCode:{
            401:function(){
                alert('incorrect email or password');
            }, 
        },
        success: function(result, status, xhr){
           window.location.href = '/profile';
           var c= xhr.getResponseHeader("x-auth");
           setCookie("x-auth",c,1);
        }
    });

};
