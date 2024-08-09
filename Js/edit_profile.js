// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore,getDocs,getDoc,updateDoc,setDoc,addDoc,doc,collection} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{getStorage,ref as sref,uploadBytesResumable,getDownloadURL} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoI2BPLeE8V14oDZkCWkCy-IARluJ5KGs",
  authDomain: "dckap-news-904dc.firebaseapp.com",
  projectId: "dckap-news-904dc",
  storageBucket: "dckap-news-904dc.appspot.com",
  messagingSenderId: "845776141467",
  appId: "1:845776141467:web:49a16a51ae3d1673695a3e"
};


let usersData=JSON.parse(localStorage.getItem("usersData"))
console.log(usersData);


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
  
let ref = collection(db,'user')
let getData = await getDocs(ref)
let id = getData.size;


var inputname=document.getElementById("text2")
var button=document.getElementById("btn")
var button2=document.getElementById("btn2")
var bio1=document.getElementById("bio")
var trash=document.querySelector("#icon")
let loader=document.getElementById('loader')

//profile dp change

//profile dp change

let ProfileImg = document.querySelector("#change");
    let inputfile= document.querySelector("#drop_zone");

inputfile.onchange = function(){
    ProfileImg.src = URL.createObjectURL(inputfile.files[0]) 
}

//profile dp remove

trash.addEventListener("click",()=>{
  if (confirm("Are you sure want to delete the image") && !(ProfileImg.src="https://firebasestorage.googleapis.com/v0/b/dckap-news-904dc.appspot.com/o/dp.png?alt=media&token=c62830cb-cb05-429e-8390-8485c2dac6c4") ) {
    ProfileImg.src="https://firebasestorage.googleapis.com/v0/b/dckap-news-904dc.appspot.com/o/dp.png?alt=media&token=c62830cb-cb05-429e-8390-8485c2dac6c4" 
  }
 
})

//Getting data from firebase

let getRef1 = doc(db, "user", usersData);

let getData1 = await getDoc(getRef1);
// console.log(getData1.data().u_email); 

let uid =usersData

 let    mul_user_getref = doc(db,'user',uid)
 let   mu_user_getData  =await  getDoc(mul_user_getref)
   var user_id_pro=  mu_user_getData.data().u_id


     ProfileImg.src = mu_user_getData.data().u_dp
     inputname.value = mu_user_getData.data().u_name
     bio1.innerText = mu_user_getData.data().u_bio
     if (bio1.value=="undefined") {
      bio1.value= ""
      // console.log("hi");
    }
    if ((inputname.value.trim()=="")||(inputname.value=="undefined")) {
      inputname.value= "User"
    }



let bio 
let dp
let email
let faver
let pass



button.addEventListener("click",(event)=>{


event.preventDefault()
    if (inputname.value.trim()=="") {
      inputname.value="User"
      loader.style.display='block';
      document.body.querySelector('.container').style.opacity='0.5'
      updateDoc(doc(db,"user",usersData), {
        u_name: inputname.value,
        u_bio:bio1.value,
        u_dp:ProfileImg.src 
        // u_dp:"https://firebasestorage.googleapis.com/v0/b/dckap-news-904dc.appspot.com/o/dp.png?alt=media&token=c62830cb-cb05-429e-8390-8485c2dac6c4" 
      }).then(()=>{
        setTimeout(loader.style.display='none',3000)
        setTimeout(document.body.querySelector('.container').style.opacity='1',3000)
        location.replace("spr.html")
      }
      )
    }
 if (inputfile.value==false) {
  loader.style.display='block';
  document.body.querySelector('.container').style.opacity='0.5'
updateDoc(doc(db,"user",usersData), {
    u_name: inputname.value,
    u_bio:bio1.value,
    u_dp:ProfileImg.src

    // u_dp:"https://firebasestorage.googleapis.com/v0/b/dckap-news-904dc.appspot.com/o/dp.png?alt=media&token=c62830cb-cb05-429e-8390-8485c2dac6c4" 
  }).then(()=>{
    setTimeout(document.body.querySelector('.container').style.opacity='1',3000)
    setTimeout(loader.style.display='none',3000)
    location.replace("spr.html")
  }
  )
 
   
 }else{
  loader.style.display='block';
  document.body.querySelector('.container').style.opacity='0.5'
  let pimage = document.getElementById('drop_zone').files[0]

  let meta_data = {contentype:pimage.type}
  let task = sref(getStorage(),'images'+pimage.name)
  let usersData=JSON.parse(localStorage.getItem("usersData"))
  let store = uploadBytesResumable(task,pimage,meta_data)
  store.then(getDownloadURL(store.snapshot.ref).then((downloadURL)=>{
      
    updateDoc(doc(db,"user",usersData), {
       
        u_dp:downloadURL,
     
  
        u_name: inputname.value,
        u_bio:bio1.value,
        
      }).then(()=>{
        setTimeout(document.body.querySelector('.container').style.opacity='1',3000)
        setTimeout(loader.style.display='none',3000)
        location.replace("spr.html")
      }
      )
     
  }))
    
       bio= getData1.data().u_bio
       dp = dp
       email = getData1.data().u_email
       faver = getData1.data().u_favcategory
       pass = getData1.data().u_password
    




 }



})
button2.addEventListener("click",(event)=>{
  event.preventDefault()
  location.replace("spr.html")
})
