"use strict"

// ----------------------------------------------------------Select The Category--------------------------------------------------------------------------------

let category_name
let category_id

document.addEventListener("DOMContentLoaded", function() {
    let selectButton = document.querySelector('.select');
    let dropCategory = document.querySelector('.drop-category');
    let categoryItems = dropCategory.querySelectorAll('li');

    selectButton.addEventListener('click', function() {
        dropCategory.style.display = (dropCategory.style.display === 'block') ? 'none' : 'block';
    });

    categoryItems.forEach(function(item) {
        
        item.addEventListener('click', function() {
            selectButton.textContent = this.textContent;
            dropCategory.style.display = 'none';
            category_name= this.innerText
            category_id = this.id
            // console.log(category);
        });
    });
});

// ----------------------------------------------------------Style(Bold,Italic...)-------------------------------------------------------------------------------------

let area = document.getElementById('create');
area.addEventListener('click' ,function(){
    area.focus();
});

let bold = document.getElementById('bold');
let underline = document.getElementById('underline');
let italic = document.getElementById('italic');

bold.addEventListener('click', function() {
  document.execCommand('bold');
});

underline.addEventListener('click', function() {
  document.execCommand('underline');
});

italic.addEventListener('click', function() {
  document.execCommand('italic');
});

// --------------------------------------------------------------Cancel Button-----------------------------------------------------------------------------------

let cancelButton = document.querySelector('.can');
cancelButton.addEventListener('click', function()
 {
    window.location.href = "HomePage.html";
});

// --------------------------------------------------------------Adding Image---------------------------------------------------------------------

let div = document.querySelector(".create")
let imageUpload = document.getElementById("img") 

imageUpload.addEventListener('change', function() {
    let img = document.createElement("img")
    let input = this.files[0];
    let text;
    if (input) {
        text = URL.createObjectURL(input);
        // text  = img.src
        console.log(text);
        // console.log(text);
    }
    // img.accept =".jpg,.png,.jpeg,.webp"
    img.src = text; 
    // img.id = 'p_image'
    div.prepend(img)
    
});

//-------------------------------------------------------------------Adding data in firebase----------------------------------------------------------


let publish =document.getElementById('submit')
    publish.addEventListener('click',create_post)
let title = document.getElementById('lines')
let desc = document.getElementById('create')

//-----------------------------------------------------------------------------------------------------------------------------------------------


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import{getStorage,ref as sref,uploadBytesResumable,getDownloadURL} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js"
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

  import{getFirestore,getDocs,getDoc,setDoc,doc,updateDoc,collection} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"



// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(app)
let post_ref =collection(db,'post')


// let user_getRef = doc(db, "category", usersData);
// let user_getData1 =  await  getDoc(getRef);




async function create_post(){
    

  let getData = await getDocs(post_ref)
let id = getData.size
console.log(id);
console.log(category_id);

let getRef = doc(db, "category", `ca_id-${category_id}`);
let getData1 =  await  getDoc(getRef);
let p_array = getData1.data().post_id


p_array.push(`p_id-${++id}`)



let usersData=JSON.parse(localStorage.getItem("usersData"))




let pimage = document.getElementById('img').files[0]

let meta_data = {contentype:img.type}
let task = sref(getStorage(),'images'+pimage.name)
let store = uploadBytesResumable(task,pimage,meta_data)
store.then(getDownloadURL(store.snapshot.ref).then((downloadURL)=>{
 
  let post_data = 
  {
    c_name:category_name,
    p_desc:desc.innerText,
    p_title:title.value,
    p_link:downloadURL,
    u_id:usersData,
    p_like:0,
    p_comment:[],
    liked_person:[]
    
  }

console.log(post_data);

let ca_data =
 {
    ca_id:`ca_id-${category_id}`,
    ca_name:category_name,
    post_id:p_array,
  }

console.log(ca_data);

setDoc(doc(db,'post',`p_id-${++id}`),post_data).then(()=>{}).catch((error)=>{console.log(error)})
setDoc(doc(db,'category',`ca_id-${category_id}`),ca_data).then(()=>{location.replace('hmpg.html')}).catch((error)=>{console.log(error)})
     


 }))
  
}






 
