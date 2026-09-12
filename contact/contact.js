let inputName =document.getElementById("name");
let inputEmail =document.getElementById("email");
let inputMessage =document.getElementById("message");
 let btn = document.getElementById("btn");

 btn.addEventListener("click" , function(){
     alert("Your information has been saved");
    let contactData ={
        name: inputName.value ,
        email: inputEmail.value ,
        message: inputMessage.value
    };
    localStorage.setItem("contactData" , JSON.stringify(contactData));
   
    inputName.value = "";
    inputEmail.value = "";
    inputMessage.value = "";

    
 })