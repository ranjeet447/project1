function signUp(){

    var formData =JSON.stringify({
        "name":document.getElementById('name').value.toString(),
        "email":document.getElementById('email').value.toString(),
        "password":document.getElementById('password').value.toString()
    });

    console.log(formData);

    $.ajax({
        type: "POST",
        url: "/api/signUp",
        data: formData,
        dataType: "json",
        contentType : "application/json",
        statusCode:{
            400:function(){
                alert('SignUp failed!!!');
            }, 
        },
        success: function(user) {
            window.location.href="/";          
            self.undelegateEvents();
            delete self;
        }
    });

};
