//TODO: Add SDKs for Firebase products that you want to use
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

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore,getDocs,setDoc,addDoc,doc,collection} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();


let usersData=JSON.parse(localStorage.getItem("usersData"))

 if(usersData){
      location.replace("hmpg.html");
    }



const email_id=document.querySelector("#email_id")
const password=document.querySelector("#passowrd");

const btn =document.querySelector("#submit");
let two = false

btn.addEventListener("click",(event)=>{
    event.preventDefault();
    
console.log("hello");
    if(email_id.value.trim()==""){
    
       
        error(email_id,"email id can not empty")
        two = false

    }
    else{
        
        success(email_id);
        email_validate()
        two = true
    }

    if(password.value.trim()==""){
 
        
        error(password,"password can not empty");
        two = false

    }
    else{
       

        success(password);
        two = true
console.log(password.value);
       
    }


  if(two==true){
  email_validate()

  }
  



});

///firebase Email Validation 


// console.log(no);

 let email_Error=document.querySelector("#Email_Error");
 let Email_Error1=document.querySelector("#Email_Error1")

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
    


     for(i in no){
        if((no[i][0])==email_id.value && no[i][1]==password.value){

            localStorage.setItem("usersData",JSON.stringify(no[i][2]));

             location.replace('hmpg.html'); 

        } 
        if((no[i][0])!=email_id.value){
          email_id.style.border='3px red solid';
          password.style.border='3px green solid';
          
          setTimeout(() =>{
            email_Error.style.display="block";
           
         },1000)

        }
       
        if(no[i][1]!=password.value){
          password.style.border='3px red solid';
          email_id.style.border='3px green solid';
          setTimeout(() =>{
            email_Error.style.display="none";
           Email_Error1.style.visibility="visible";
          },1000)

        }
        else{
          email_id.style.border='3px red solid';
          password.style.border='3px red solid';

          setTimeout(() =>{
            email_Error.style.display="block";
            Email_Error1.style.visibility="visible";
          },1000)
       
        }
       
    
     } 


}
//-------Eye icon js----------
var icon=document.getElementById("eye1")
icon.innerHTML=`<i id="eye" class="fa-regular fa-eye"></i>`

icon.addEventListener("click",function() {
if (password.type =='password') {
  password.type='text'
  icon.innerHTML=`<i class="fa-regular fa-eye-slash"></i>` 
}
else if (password.type =='text') {
  password.type='password'
  icon.innerHTML=`<i id="eye" class="fa-regular fa-eye"></i>`
}
})














 let  p=document.querySelector(".Erro_msg");
 let  p2=document.querySelector(".Erro_msg1");

function error(element,msg){
  
    element.style.border='3px red solid';
    const parent=element.parentElement;
   
    console.log(p);
  
        p.style. display="block";
     
      p2.style. display="block";
      setTimeout(() =>{
        p.style. display="none";
        p2.style. display="none";
      },1500)
    
 }
 
 function success(element,msg){
    element.style.border='3px green solid';
    const parent=element.parentElement;
   
    p.style.display = "none";
  
    p2.style.display = "none";
   
  
   
 }
 let otp_random
//  let body=document.getElementsByTagName("body");
 let forgot_paassword=document.getElementById("forgot_paassword");
 let  login_container=document.querySelector(".login_container");
 let forgot_paassword_div=document.querySelector(".forgot_paassword_div")
 forgot_paassword.addEventListener("click",()=>{

  console.log(("hii"));
  login_container.style.display="none";
  forgot_paassword_div.style.display="block";
 


 




 })

 
  let identify_email=document.querySelector("#identify_email");
   let search_button=document.getElementById("search_button");
 let forgot_otp=document.getElementById("forgot_otp")

   let otpdiv1=document.createElement('div');
   otpdiv1.className='otpdiv';
   let label=document.createElement('label');
   label.className='otplabel';
   label.textContent="OTP:";
     let otpinput=document.createElement("input");
       otpinput.type="text";
       otpinput.id="otpinputvalue";
  let otpbutton=document.createElement("button");
 
  
   otpbutton.textContent="Ok";
   otpbutton.className="otpbtn";
  

   let no

   search_button.addEventListener("click",async ()=>{
   
    if(identify_email.value==""){
      alert("enter  your email address")
     }
     else{


      let getRef = collection(db, "user");
        no = []
      
              let getData1 = await getDocs(getRef);
      
              console.log(getData1.size);
             
              getData1.forEach((record)=>{
                 
            let row = [record.data().u_email,record.data().u_password ,record.id]
                 no.push(row)
      
                  
              });
      
  
  
       for(i in no){
          if((no[i][0])==identify_email.value ){
   console.log(no);

              console.log("user exist");
              forgot_otp.style.display="block";
              forgot_otp.append(otpdiv1);
              otpdiv1.append(label);
              otpdiv1.append(otpinput);
              otpdiv1.append(otpbutton);
           
           
                  otp_random=Math.floor(Math.random()*100000);
                  console.log(otp_random);
           
             
               let mail_msg =`Hi welcome to our website please verifiy email id and  enter your otp
                          OTP:<br> ${otp_random} <br>`;
           
           
           
             Email.send({
               SecureToken : "273dd9f4-61d3-456a-b3f9-3b4561e69c48",
               To : identify_email.value,
               From : "dckapnews@gmail.com",
               Subject : "Enter the OTP",
               Body : mail_msg
             }).then(
             message => alert(message)
             
             ).catch(error => alert(error));
            

        var userID = no[i][2];
          i=no.length
         


       
              
  
          } 
          otpbutton.addEventListener("click",async ()=>{
            console.log("otp")
           let otp_value=document.getElementById("otpinputvalue").value;
           console.log(otp_value==otp_random)
           if(otp_value==otp_random){
            console.log(no);
            localStorage.setItem("usersData",JSON.stringify(userID));
            console.log(localStorage.getItem("usersData"));
           
          //  alert("OTP sucessfull")
           location.replace("change_pass.html")
           }
           else{
         alert("invalid OTP")
           }
           
          
            
          })
         
        
     
       } 
  






    

     }


  
   

   })
 
  






//continue width google code



// let usersData=JSON.parse(localStorage.getItem("usersData"))
// console.log(usersData);
 
// let google_btn=document.getElementById("google_btn");
// google_btn.addEventListener("click",()=>{

//     signInWithPopup(auth, provider)
//   .then((result) => {
  
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const user = result.user;
//     console.log(user);
//     location.replace("hmpg.html");
//     // window.location.href="";

  
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
 
//   });
//     console.log("hiii");
// })