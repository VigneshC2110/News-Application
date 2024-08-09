// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
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

import { getFirestore,query,where, getDoc, getDocs, orderBy,limit,doc, setDoc, updateDoc, addDoc,  collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(app);
///localstorage....

let usersData=JSON.parse(localStorage.getItem("usersData"))
console.log(usersData);



let submit_btn=document.querySelector(".submit_btn");
let New_password=document.querySelector("#new_password");
let confirm_Passwors=document.querySelector("#confirm_pasword");
let change_conformpass_error=document.getElementById("change_conformpass_error");

let ref = collection(db,'user')
let getData = await getDocs(ref)
let id = getData.size
console.log(id);


submit_btn.addEventListener("click",async(e)=>{
 e.preventDefault();
 if(confirm_Passwors.value != New_password.value){

   change_conformpass_error.innerText="Passwors doesn't matched"  
   setTimeout(()=>{
     change_conformpass_error.innerText=" "
   },1500)

 }
 else{
     let userref = doc(db,"user",usersData);
     console.log("else")
     await updateDoc(
       userref, {
         u_password:New_password.value
       }
     ).then(()=>{
       // alert("Updated Successfully");
     
     }).catch((error)=>{
       alert(error)
     })
    
     localStorage.removeItem("usersData");
     // setTimeout(()=>{
     //   location.replace("Login.html");
     // },2000)

     location.replace("Login.html");
 }



 
}
);