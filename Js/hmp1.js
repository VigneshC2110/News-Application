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



///-------------------------------------------------------------  Theme finding
//  let theme1 = JSON.parse(localStorage.getItem("theme"))









//-------------------------------------------------------------------------





// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(app)
let usersData=JSON.parse(localStorage.getItem("usersData"))


let user_getref = doc(db,'user',usersData)
let user_getData = await getDoc(user_getref)
let fav_arry= user_getData.data().u_favcategory 

let up=  document.getElementById('profile')
up.src=user_getData.data().u_dp
let first = fav_arry[0]


let ul = document.querySelector('.ca_popup')
   

   let i=0
for(i in fav_arry){
 
  let li= document.createElement('li')
  li.className = 'navlink'
  li.innerText = fav_arry[i]
  ul.append(li)
}

let li1 = document.querySelectorAll('.navlink')

//cahnge Theme
// let theme =document.getElementById('theme')
//     theme.addEventListener('click',changetheme)

function changetheme(){


 
   let img =document.getElementById('logo')
   let b=img.src.slice(22)
   
    
     

   

       if(b=='Assests/logo.png' ){

           img.src='Assests/darklogo.png'
   document.querySelector('.logo_div').style.color='white'
   document.querySelector('.logo_div').style.backgroundColor='black'
   document.querySelector('.img_nav').style.backgroundColor='black'
   document.querySelector('.img_nav').style.color='white'
   document.body.classList.toggle('blacktheme')
   document.querySelector('header').classList.toggle('blacktheme')
   document.querySelector('.search').classList.toggle('darkinput')
  document.getElementById('theme').classList.toggle('blacktheme')
  let a = document.querySelector('.img_nav').querySelectorAll('a')
  a.forEach((e)=>{
e.classList.toggle('blacktheme')


 })
 localStorage.setItem("theme",JSON.stringify('dark'));

           // theme.innerText = "Dark Theme"
        }else{
           img.src='Assests/logo.png'
   document.querySelector('.logo_div').style.color='black'
   document.querySelector('.logo_div').style.backgroundColor='white'
   document.querySelector('.img_nav').style.backgroundColor='white'
   // document.querySelector('.img_nav').style.color='black'
   document.body.classList.toggle('blacktheme')
   document.querySelector('header').classList.toggle('blacktheme')
   document.querySelector('.search').classList.toggle('darkinput')
  document.getElementById('theme').classList.toggle('blacktheme')
  let a = document.querySelector('.img_nav').querySelectorAll('a')
  a.forEach((e)=>{
e.classList.toggle('blacktheme')


 })
   localStorage.setItem("theme",JSON.stringify('light'));
           
          
           // theme.innerText = "Ligth Theme"

       }
}






/////////
let a = document.querySelector('.ca_popup').querySelectorAll('li')
     a.forEach((e)=>{
   // e.querySelector('a').classList.toggle('blacktheme')
   e.addEventListener('click',function(){category_selected(this)},{once : true})
    })

   

//for scrolling .......

let category_scroll=document.querySelector('.categories_nav')
let category_scroll_child=document.querySelector('.ca_popup').childElementCount
let main_view = document.querySelector('.main_view')

let trending_views = document.querySelector('.trending_views')
   trending_views.addEventListener('wheel',trending_views_scroll)
   
category_scroll.addEventListener('wheel',category_views_scroll)

function category_views_scroll() {
 if (category_scroll_child>=12) {
 trending_views.style.position='fixed'
 trending_views.style.top = '100px'
 main_view.style.position = 'fixed'
 main_view.style.top = '100px'
category_scroll.style.position = 'absolute'
 }
}    
   function trending_views_scroll(){
     category_scroll.style.position='fixed'
     category_scroll.style.top = '70px'
     main_view.style.position = 'fixed'
     main_view.style.top = '100px'
    trending_views.style.position = 'absolute'
   }

   main_view.addEventListener('wheel' ,mainscroll)

   function mainscroll(){
   category_scroll.style.position='fixed'
   category_scroll.style.top = '70px'
    trending_views.style.position = 'fixed'
    trending_views.style.top = '100px'
    main_view.style.position = 'absolute'
}



let old 
category_selected(li1[0])



async function category_selected(element){

if(old){old.classList.remove('active');console.log(old);}


 
   element.classList.toggle('active')
 
let post_getref =  collection(db,'post')
let q
try{q = query(post_getref,where('c_name','==',element.innerText))}catch{ q = query(post_getref,where('c_name','==',element)  ) }
q = query(q,orderBy('pid','desc'))


let querysap = await getDocs(q)
   
if(querysap.size==0){ 
 main_view.innerHTML = ''


   let emptyshow = document.createElement('div')
   emptyshow.id='empty_div'
      emptyshow.innerHTML = '<h1>No Post Yet !</h1>'

   main_view.append(emptyshow)
}else{

 main_view.innerHTML = ''


   querysap.forEach(async(rec)=>{
      
     
    let uid =rec.data().u_id

   

    let    mul_user_getref = doc(db,'user',uid)
    let   mu_user_getData  =await  getDoc(mul_user_getref)
   
       //  mu_user_getData.data().u_id

let card = document.createElement('div')
    card.className = 'post_view'
    card.id=rec.id

    let ref = doc(db,"post",rec.id);
       let postData= await  getDoc(ref)
       let numlike=postData.data().p_like
        let checklike = postData.data().liked_person
    let checked = checklike.includes(usersData)
  
    let findlike 


    if(checked==true){
       findlike=  "<i id='check_like' class='fa-solid fa-thumbs-up' style='color: #7E75FC;'></i> "

   }else{
       findlike=  " <i id='check_like'   class='fa-regular fa-thumbs-up'></i> "
  
   }


   let p
     if(rec.data().p_desc.length>=100){ 
       let string1 =  rec.data().p_desc.slice(0,100)
       let string2 =  rec.data().p_desc.slice(100)
       p =`<p id="post_desc">${string1}  <span  id='more'>${string2}</span> <span id="see_more">See More..</span></p> `
     }else{
       p= `<p id="post_desc">${rec.data().p_desc}</p> `
     }






    card.innerHTML = 
   ` <div class='post_head' > <img id='user_dp' src='${ mu_user_getData.data().u_dp}'> <h3>${mu_user_getData.data().u_name}</h3></div>`+
    `<div class='description'><h5>${rec.data().p_title}</h5>${p}</div>`+
    
   ` <div class='post_div'><img id='post' src='${rec.data().p_link}'></div>`+
   ` <div class='social_section'> <div class='like_div'> ${findlike} <b  id='likes'>${rec.data().p_like}</b> </div> <div class='comment_icon'> <i onclick='showcomment(this)'' class='fa-regular fa-comment'></i>  <b id='comment_counnt'>0</b></div> </div>`
    "<div class=;comment_section'>"
        "<div class='add_comment_section'> <img id='comment_dp' src='' ><input id='comment_input' placeholder='add a comment..' type='text'> <i id='sending' class='fa-regular fa-paper-plane'></i> <i   class='fa-regular fa-face-smile'></i></div>"
        " <div class='comments_list'>"
            "<div class='comment_div'> <img  id='cmnt_user_dp' src='' > <div class='cmnt_header'><p id='comment'>Yeah actually that is true,there many trees that have been cutting down we have to grow some trees in free space.</p><div class='replay'><i class='fa-solid fa-reply'></i><span class='replay_s'>replay</span></div></div> </div>"
         "</div>"
    "</div>"


main_view.append(card)



setTimeout(1600,lets_get())
setTimeout(1600,letsget())
setTimeout(1600,getdesc())

}    
)
}

 old = element

}




//-----------------------------------Storing elemenent












function lets_get(){
 let hiden_des = document.querySelectorAll('#see_more')
 hiden_des.forEach((x)=>{


x.addEventListener('click', handleShowMore) }


)}


function handleShowMore(event) {
 showmore(event.target);
}
function letsget(){



   let like=document.querySelectorAll("#check_like")
like.forEach((x)=>{


   x.addEventListener("click", function(){updatelike(this)})})
}




//for see more ...

function showmore(mm){

 


   if(  mm.parentElement.firstElementChild.id!='see_more' &&  mm.parentElement.lastElementChild.innerText=='See More..' ){
       mm.parentElement.firstElementChild.style.display = 'contents';
     
       mm.innerText = 'See Less..'
       console.log("True");
   
  
   }else if( mm.parentElement.lastElementChild.innerText=='See Less..'){ 
       mm.parentElement.firstElementChild.style.display = 'none';
       mm.innerText = 'See More..'
       console.log("False");
   }


  
 
}





/////-------------likes ----------------------------------------------------------------------------


async function updatelike(x){





   let p_id =x.parentElement.parentElement.parentElement.id
   
   // console.log(p_id);
   let ref = doc(db,"post",p_id);

  let postData= await  getDoc(ref)
     let numlike=postData.data().p_like
      let checklike = postData.data().liked_person
// console.log(typeof(checklike));
  let checked = checklike.includes(usersData)

  
   

   
   if(x.style.color!= 'blue' && !checked){
     // console.log("pass");
       x.className='fa-solid fa-thumbs-up';
       x.style.color= '#7E75FC'
       let checklike = postData.data().liked_person
       let pushing = checklike.push(usersData)
       
       let new_liked_person = checklike
       updateDoc(
           ref, {
            p_like:++numlike,
            liked_person:new_liked_person

           }
         ).then(async ()=>{
           let newlike = await  getDoc(ref)
           x.parentElement.lastElementChild.innerText = newlike.data().p_like
       })
   
       
       }

       
   else{
     // console.log("fail");
   x.className='fa-regular fa-thumbs-up'
   x.style.color= 'black'
   let checklike = postData.data().liked_person
   let index = checklike.indexOf(usersData)
        checklike.splice(index,1)
        let new_liked_person = checklike

        

   updateDoc(

       ref, {
        p_like:--numlike,
        liked_person:new_liked_person
       }
     ).then(async ()=>{
       let newlike = await getDoc(ref)
       x.parentElement.lastElementChild.innerText = newlike.data().p_like
 

   }
)

      
}

}  
     
///.............................................. Trending Views.........................

let trend_post_ref = collection(db,'post')
let most_like = query(trend_post_ref, orderBy("p_like",'desc'), limit(5));
let res = await getDocs(most_like)
let trend_div = document.querySelector('.trending_views')

res.forEach((rec)=>{
  

  let card = document.createElement('div')
     card.className = 'trend_post_view'
let p
     if(rec.data().p_desc.length>=100){ 
       let string1 =  rec.data().p_desc.slice(0,100)
       let string2 =  rec.data().p_desc.slice(100)
       p =` <p id="trend_description">${string1}<span id='more'>${string2}</span> <span id="see_more">See More..</span></p> `
     }else{
       p= ` <p id="trend_description">${rec.data().p_desc}</p> `
     }

   card.innerHTML =` <h6 id='trnd_title'>${rec.data().p_title}</h6><img id="trend_post" src=${rec.data().p_link} alt=""> ${p}`
   
   
trend_div.append(card)

})  

   

//-------------------------------------------search-------------------------------------------------



function getdesc(){


 let search_input = document.getElementById('searchinput')

 search_input.addEventListener('keyup',function(){searching(search_input.value)})

}

function searching(str){

let  desc_value = document.querySelectorAll('#post_desc')

let end = desc_value.length

 for(i in desc_value){

     let  a = desc_value[i].innerText.toLowerCase()
             // console.log(typeof(a));

     if(a.indexOf(str.toLowerCase())!=-1){
       desc_value[i].parentElement.parentElement.style.display = ''
     }else{
       desc_value[i].parentElement.parentElement.style.display = 'none'

     }

     if(i==8) break
 }
 


 
  
 
}




















//------------------------------------------------------Edit Category-------------------------------------------

let category=document.querySelectorAll(".category1")
let button=document.getElementById("next_page")
let button2=document.querySelector(".btn")
let span=document.getElementById("span")
let count=0
// console.log(category);
span.classList.add("none")
button2.classList.add("col4")

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
   button2.classList.remove("col2")
   button2.classList.add("col4")
   x.addEventListener("click",()=>{
       if(fav_arry.includes(x.innerText)) {
           // x.classList.remove("box")
           // x.classList.add("cat")
           x.style.boxShadow = "none";
           // removeItemAll(arr,x)
           removeItemAll(fav_arry,x.innerText);

        /////update array/////////////////////////////
        let ref = doc(db,"user",usersData);

        updateDoc(
          ref, {
        
            u_favcategory:fav_arry
        
          })
          if (fav_arry.length==0) {
         
           x.style.boxShadow = "0px 0px 2px 2px #6452D0";
           fav_arry.push(x.innerText);
           alert("Atlest one category has to be selected")
       }
     
       }
      else if(!(fav_arry.includes(x.innerText))) {
    
       x.style.boxShadow = "0px 0px 2px 2px #6452D0";
       count=count+1
      
       fav_arry.push(x.innerText);
       let ref = doc(db,"user",usersData);

       updateDoc(
         ref, {
       
           u_favcategory:fav_arry
       
         })
       // console.log(fav_arry);
   }

   })
})
button.addEventListener("click",(event)=>{
 event.preventDefault()
   let fav_arry_length=fav_arry.length
   console.log(fav_arry_length);
   if (fav_arry.length!=0) {
      

//------------------------Update--------------------        
let ref = doc(db,"user",usersData);

updateDoc(
 ref, {

   u_favcategory:fav_arry

 }
).then(()=>{
   location.replace("hmpg.html");
 
}).catch((e)=>{console.log(e);})




   }
   else{
    
  
     alert("select the category")
      
   }
   })



/*//////////////////// Editi  Catgeory page /////////////////////////////////*/

let container1= document.querySelector(".container1")

let navbar_div=document.getElementById("navbar_div");

let Category_div=document.querySelector(".Category_div");


let editi_catgeory=document.querySelector("#editi_catgeory");
editi_catgeory.addEventListener("click",()=>{
  

   trending_views.style.display="none";
   main_view.style.display="none";
//    navbar_div.classList.add("navbar_div");
  container1.classList.add("block");
document.querySelector(".categories_nav").style.opacity = "0.2";

document.querySelector("header").style.opacity = "0.2";



  let editCategory = document.querySelectorAll("#text");
  let j= 0
  let k= 0
  


     for(k in fav_arry){
       for(j in  editCategory){
           if( editCategory[j].innerText == fav_arry[k]){
             

               editCategory[j].parentElement.style.boxShadow = "0px 0px 2px 2px #6452D0";

           
             }
       }
     }


})


/*Logout  pagess*/

let logout=document.querySelector("#logout");

 
logout.addEventListener("click",()=>{

 localStorage.removeItem("usersData");
 location.replace("Login.html");


})





//------------------------------------------------------------------------ CREATE JS------------------------------------------


// ----------------------------------------------------------Select The Category--------------------------------------------------------------------------------

let category_name
let category_id
let select
// document.addEventListener("DOMContentLoaded", function() {
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
// });



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
   window.location.href = "hmpg.html";
});

//----------------------------------------------------------------Publish Button-----------------------------------------------------------------------------

let publishButton = document.querySelector('.btn');
publishButton.addEventListener('click', function()
{
   window.location.href = "hmpg.html";
});
// --------------------------------------------------------------Adding Image---------------------------------------------------------------------

// let div = document.querySelector(".create")
// let imageUpload = document.getElementById("img") 

// imageUpload.addEventListener('change', function() {
//     let img = document.createElement("img")
//     let input = this.files[0];
//     let text;
//     if (input) {
//         text = URL.createObjectURL(input);
//         // text  = img.src
//         console.log(text);
//         // console.log(text);
//     }
//     // img.accept =".jpg,.png,.jpeg,.webp"
//     img.src = text; 
//     // img.id = 'p_image'
//     div.prepend(img)
   
// });
let imageUpload = document.getElementById("img");

imageUpload.addEventListener('change', function() {
   let input = this.files[0];
   let text;
   if (input) {
       text = URL.createObjectURL(input);
       let existingImg = document.getElementById("img-src");
       if(existingImg) {
           existingImg.src = text;
           deleteImgBtn.style.display = "block";
       } else {
           console.error("Image element with id 'img-src' not found.");
       }
   }
});
let deleteImgBtn = document.getElementById("delete-img");
deleteImgBtn.addEventListener('click', function() {
   let existingImg = document.getElementById("img-src");
   if (existingImg) {
       existingImg.src = ""; 
       imageUpload.value = null;
       deleteImgBtn.style.display = "none";
   } else {
       console.error("Image element with id 'img-src' not found.");
   }
});

//-------------------------------------------------------------------Adding data in firebase----------------------------------------------------------


let publish =document.getElementById('submit')
publish.addEventListener('click',validate)
let title = document.getElementById('lines')

let desc = document.getElementById('create')
let loader=document.getElementById('loader')
desc.addEventListener('keyup',
 () => {
   if (desc.innerText.trim().length > 250) { document.getElementById('error').style.visibility = 'hidden' }
   else {
     document.getElementById('error').style.visibility = 'visible'
   }
 }
)



function validate(){
 console.log( desc.innerText.trim().length);
 if( desc.innerText.trim().length>250){ 
  document.getElementById('error').style.visibility ='hidden'
   create_post()
 }else{
  document.getElementById('error').style.visibility ='visible'
 console.log(newDscription);

 }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------


 // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
 import{getStorage,ref as sref,uploadBytesResumable,getDownloadURL} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration


// Initialize Firebase




let post_ref =collection(db,'post')


// let user_getRef = doc(db, "category", usersData);
// let user_getData1 =  await  getDoc(getRef);



async function create_post(){
   
 // document.getElementById('loadingOverlay').style.visibility = 'visible'



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
   pid:++id,
   p_comment:[],
   liked_person:[]
 }



let ca_data =
{
   ca_id:`ca_id-${category_id}`,
   ca_name:category_name,
   post_id:p_array,
 }


 document.getElementById('submit').disabled = true,
console.log(ca_data);
loader.style.display='block';
document.body.querySelector('.container').style.opacity='0.5'


setDoc(doc(db,'post',`p_id-${++id}`),post_data).then(

 

 setDoc(doc(db,'category',`ca_id-${category_id}`),ca_data).then(()=>{ document.getElementById('submit').disabled = false; document.getElementById('loadingOverlay').style.visibility = 'hidden';
 setTimeout(document.body.querySelector('.container').style.opacity='1',3000)
 setTimeout(loader.style.display='none',3000)
 setTimeout(location.replace('hmpg.html'), 3000)}).catch((error)=>{console.log(error)})


).catch(()=>{
 // setDoc(doc(db,'category',`ca_id-${category_id}`),ca_data).then(()=>{ document.getElementById('submit').disabled = false; document.getElementById('loadingOverlay').style.visibility = 'hidden'; location.replace('hmpg.html')}).catch((error)=>{console.log(error)})
   create_post()
})
       
}))
 
}

// }
// ----------------------------------------------------------------blurr and popup-----------------------------------------------------------------------

// var openButton = document.getElementById("open");
// console.log(openButton); 

// openButton.addEventListener('click', function() {
//   console.log("Button clicked"); 
//   container.style.display =  'block';
//   mainDiv.classList.toggle('blur');
// });








///////////////////////////////
let create_btn = document.getElementById("create_btn");
 let create_main_div = document.getElementById("create_main");
 let container = document.getElementsByClassName("container");
 let main_div = document.querySelector(".main_div");

create_btn.addEventListener("click",()=>{

 
 trending_views.style.visibility= "hidden";
 // create_main_div.classList.add("create_main_div");
 document.querySelector(".categories_nav").style.opacity = "0.10";
 document.querySelector("header").style.opacity = "0.10";

 main_div.classList.remove("main_div");
 main_view.style.display="none";
 main_div.classList.add("dispaly_block");


})