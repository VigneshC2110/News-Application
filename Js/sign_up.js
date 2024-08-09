
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore,getDocs,setDoc,addDoc,doc,collection} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoI2BPLeE8V14oDZkCWkCy-IARluJ5KGs",
  authDomain: "dckap-news-904dc.firebaseapp.com",
  projectId: "dckap-news-904dc",
  storageBucket: "dckap-news-904dc.appspot.com",
  messagingSenderId: "845776141467",
  appId: "1:845776141467:web:49a16a51ae3d1673695a3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


let usersData=JSON.parse(localStorage.getItem("usersData"))
console.log(usersData);



//Checking signup users
if(usersData){
  location.replace("hmpg.html");
  
}









var maincontainer=document.querySelector(".maincontainer")
var username = document.getElementById("username");
var email = document.getElementById("email");
var pass1 = document.getElementById("pass1");
var pass2 = document.getElementById("pass2");
let otp_random

document.getElementById("submit").addEventListener("click", function (event) {
  
  event.preventDefault();
 
 checkData();


  otp_random=Math.floor(Math.random()*100000);
  console.log(otp_random);

  
  let mail_msg =`Hi ${username.value} welcome to our website please verifiy email id and  enter your otp
               OTP:<br> ${otp_random} <br>`;



  Email.send({
    SecureToken : "273dd9f4-61d3-456a-b3f9-3b4561e69c48",
    To : email.value,
    From : "dckapnews@gmail.com",
    Subject : "Enter the OTP",
    Body : mail_msg
  }).then(
  message => (message)
  
  )  .catch(error => (error));
 







});

///----------------------------------------------------------------
//Retrive data

















// validation part

function checkData() {
  var usernameValue = username.value.trim();
  var emailValue = email.value.trim();
  var pass1Value = pass1.value.trim();
  var pass2Value = pass2.value.trim();
  var count=0 

  if (usernameValue == "") {
     setError(username, "Username can't be blank");
    setTimeout(() => {
      setError(username, "");
      },1500)
   
  } else {
     setSuccess(username);
  }

  if (emailValue == "") {
    setError(email, "Email can't be blank")
    setTimeout(() => {
      setError(email, "");
      },1500)
   
  } else if (!isEmail(emailValue)) {
    setTimeout(() => {
      setError(email, "Email is not Valid");
      setError(email, "");
      },1500)

  } else {
     setSuccess(email);
     count++
  }


  if (pass1Value == "") {
    setError(pass1, "Password can't be blank");
    setTimeout(() => {
      setError(pass1, "");
      },1500)
    
  } else {
     setSuccess(pass1);
     count++
  }


  if (pass2Value == "") {
    setError(pass2, "Password can't be blank");
    setTimeout(() => {
      setError(pass2, "");
      },1500)
   
  } else if (pass1Value !== pass2Value) {
    setError(pass2, "Password does not match");
    setTimeout(() => {
      setError(pass2, "");
      },1500)
    
  } else {
     setSuccess(pass2);
     count++
  }
  if (count==3) {
    email_validate();
  // otpdiv();

    }
}
// 'u_id'+


 let otpmaincontainer=document.getElementById("otpmaincontainer");

//firebase 
let ref = collection(db,'user')
let getData = await getDocs(ref)
let id = getData.size
console.log(id);

let otpdiv1=document.createElement('div');
 otpdiv1.className='otpdiv';
 let label=document.createElement('label');
 label.className='otplabel';
 label.textContent="OTP:";
   let otpinput=document.createElement("input");
     otpinput.type="text";
     otpinput.id="otpinputvalue";
let otpbutton=document.createElement("button");
let p=document.createElement("p")

 otpbutton.textContent="Ok";
 otpbutton.className="otpbtn";

function otpdiv(){
 
  maincontainer.style.opacity= 0.1;
  otpmaincontainer.style.display="block";


 

 
   otpmaincontainer.append(otpdiv1);
   otpdiv1.append(label);
   otpdiv1.append(otpinput);
   otpdiv1.append(otpbutton);
   
 

let u_id 
   console.log('outide click  event');
   otpbutton.addEventListener("click",()=>{
    console.log("otp")
   let otp_value=document.getElementById("otpinputvalue").value;
   if(otp_value==otp_random){
   

    otpmaincontainer.innerHTML = '<i class="fa-solid fa-thumbs-up"></i><br><h4 style=color:green; >Sussess</h4>'
    otpmaincontainer.style.boxShadow ='none'
    otpmaincontainer.style.backgroundColor='transparent'
  
   setTimeout(category_listing,2000)
   
   }
   else{
    console.log("invalid otp")
 alert("invalid OTP")


   }
   
  
    
  })

}

function category_listing(){
   otpmaincontainer.remove()
    container1.style.display="flex";
    maincontainer.style.display="none";

    setDoc(doc(db,"user",`u_id-${++id}`), {
      u_name: username.value,
      u_email:email.value,
      u_password:pass1.value,   
      // u_favcategory:arr2
    })
    localStorage.setItem("usersData",JSON.stringify(`u_id-${id}`))
    
}
 


var container1=document.querySelector(".container1");
function selectcat(){

  container1.style.display="flex";
  maincontainer.style.display="none"; 
}


function setError(u, msg) {
  var parentBox = u.parentElement;
  parentBox.className = "input-field error";
  var span = parentBox.querySelector("span");
  var fa = parentBox.querySelector(".fa");
  span.innerText = msg;
  fa.className = "fa fa-exclamation-circle";
}

function setSuccess(u) {
  var parentBox = u.parentElement;
  parentBox.className = "input-field success";
  var fa = parentBox.querySelector(".fa");
  fa.className = "fa fa-check-circle";
}

function isEmail(e) {
  var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(e);
}   
   







   
   
   
   
   
   
   
   
   
   
   
   


pass1.onfocus = function() {
    document.getElementById("message").style.display = "block";
 
  }
  
  
  pass1.onblur = function() {
    document.getElementById("message").style.display = "none";
  }
  
  document.getElementById('pass1').addEventListener('keyup',validatefunc)
  
  
  function validatefunc(){

   
var length=document.getElementById("length")

      var lowerCaseLetters = /[a-z]/g;
      if( pass1.value.match(lowerCaseLetters)) {  
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }
    
      var upperCaseLetters = /[A-Z]/g;
      if( pass1.value.match(upperCaseLetters)) {  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
   
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }
    
      var numbers = /[0-9]/g;
      if( pass1.value.match(numbers)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
     
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }
            
      if( pass1.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
     
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }

    } 
  
//-------Eye icon js----------
var icon=document.getElementById("eye1")
var icon2=document.getElementById("eye2")
icon.innerHTML=`<i id="eye" class="fa-regular fa-eye"></i>`
icon2.innerHTML=`<i id="eye" class="fa-regular fa-eye"></i>`

icon.addEventListener("click",function() {
if (pass1.type =='password') {
  pass1.type='text'
  icon.innerHTML=`<i class="fa-regular fa-eye-slash"></i>` 
}
else if (pass1.type =='text') {
  pass1.type='password'
  icon.innerHTML=`<i id="eye" class="fa-regular fa-eye"></i>`
}
})
icon2.addEventListener("click",function() {
  if (pass2.type =='password') {
    pass2.type='text'
    icon2.innerHTML=`<i class="fa-regular fa-eye-slash"></i>` 
  }
  else if (pass2.type =='text') {
    pass2.type='password'
    icon2.innerHTML=`<i id="eye" class="fa-regular fa-eye"></i>`
  }
  })






//------------------------------------------select catgeorypages js -----------------------------------------------------------
let category=document.querySelectorAll(".category1")
let button=document.getElementById("next_page")
let button2=document.querySelector(".btn")
let span=document.getElementById("span")
let count=0
let arr=[]
let arr2=[]
// console.log(category);
span.classList.add("none")
button2.classList.add("col1")

function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }
category.forEach((x,category)=>{
    x.classList.add("cat")
    x.addEventListener("click",()=>{
        if(arr.includes(x)) {
            x.classList.remove("box")
            x.classList.add("cat")
            count=count-1
            removeItemAll(arr,x)
            removeItemAll(arr2,x.innerText)
            // console.log(arr);  
            console.log(arr2);
            if (count<3) {
                button2.classList.remove("col2")
                button2.classList.add("col1")
                button2.addEventListener("mouseover",()=>{
                    button2.classList.remove("col3")
                })
            }
        }
       else if(!(arr.includes(x))) {
        x.classList.remove("cat")
        x.classList.add("box")
        count=count+1
        arr.push(x)
        arr2.push(x.innerText)
        // console.log(arr);
        console.log(arr2);
        // console.log(count); 
        if (count>=3) {
            button2.classList.remove("col1")
            button2.classList.add("col2")
            button2.addEventListener("mouseover",()=>{
                button2.classList.add("col3")
            })
        }     
       }

    })
})
button.addEventListener("click",(event)=>{
    if (count<3) {
        event.preventDefault()  
        span.classList.remove("none")
        span.classList.add("flex")
        setTimeout(() => {
          span.classList.remove("flex")
          span.classList.add("none")
          },1500)
    }
    else{
        button2.classList.remove("col2")
        button2.classList.add("col4")

//SET Fav Ctegory...

setDoc(doc(db,"user",`u_id-${id}`), {
  u_name: username.value,
  u_email:email.value,
  u_password:pass1.value,   
  u_favcategory:arr2,

  u_dp:"https://firebasestorage.googleapis.com/v0/b/dckap-news-904dc.appspot.com/o/dp.png?alt=media&token=c62830cb-cb05-429e-8390-8485c2dac6c4" 

})
localStorage.setItem("usersData",JSON.stringify(`u_id-${id}`))
alert('UserAdded')



 button.setAttribute("href","hmpg.html")

    }})

    
     
    
let i= 0
async function   email_validate(){

    let getRef = collection(db, "user");
    let no = []
    
            let getData1 = await getDocs(getRef);
    
            console.log(getData1.size);
           
            getData1.forEach((record)=>{
               
          let row = [record.data().u_email,record.data().u_password ,record.id]
               no.push(row)
    
                
            });
    

            let validotp = true;
     for(i in no){
        if((no[i][0])==email.value ){
          alert("sorry this email already  login")

          validotp=false

     break
            // localStorage.setItem("usersData",JSON.stringify(no[i][2]));

            //  location.replace('HomePage.html') 

        } 
        // else{
        //   validotp=true

        // }
     } 

     if(validotp){
      otpdiv()
    }
}

