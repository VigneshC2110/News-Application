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

import { getFirestore,query,where,orderBy, getDoc, getDocs, doc, setDoc, updateDoc, addDoc,  collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"




// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(app)
// geting user Output

let uprofile  = document.getElementById('userpro')
let username =  document.getElementById('user_name')
let userbio = document.getElementById('bio')



let usersData=JSON.parse(localStorage.getItem("usersData"))


let user_getref = doc(db,'user',usersData)
let user_getData = await getDoc(user_getref)


let up=  document.getElementById('profile')
up.src=user_getData.data().u_dp




let    mul_user_getref = doc(db,'user',usersData)
let   mu_user_getData  =await  getDoc(mul_user_getref)
   mu_user_getData.data().u_id


   uprofile.src = mu_user_getData.data().u_dp
   username.innerText = mu_user_getData.data().u_name
   if(mu_user_getData.data().u_bio)
{
 userbio.innerText = mu_user_getData.data().u_bio
}else{
  userbio.innerText = " "
}




let post_getref =  collection(db,'post')
let q = query(post_getref,where('u_id','==',usersData))
q=query(q,orderBy('pid','desc'))
let querysap = await getDocs(q)

querysap.forEach(async(rec)=>{

  
let uid =rec.data().u_id

let    mul_user_getref = doc(db,'user',uid)
let   mu_user_getData  =await  getDoc(mul_user_getref)
    mu_user_getData.data().u_id


    uprofile.src = mu_user_getData.data().u_dp
    username.innerText = mu_user_getData.data().u_name
    userbio.innerText = mu_user_getData.data().u_bio

    let p
    if(rec.data().p_desc.length>=100){ 
      let string1 =  rec.data().p_desc.slice(0,100)
      let string2 =  rec.data().p_desc.slice(100)
      p =` <p id="trend_description">${string1}<span id='more'>${string2}</span> <span id="see_more">See More..</span></p> `
    }else{
      p= ` <p id="trend_description">${rec.data().p_desc}</p> `
    }



let card = document.createElement('div')
card.className = 'post_view'

card.innerHTML = 

` <div class='post_head'> <img id='user_dp' src='${ mu_user_getData.data().u_dp}'> <h4 id='mini_uname'>${mu_user_getData.data().u_name}</h4></div>`+
       `<div class='description'><p id='post_desc'>${p}</p> </div>`+
       
      ` <div class='post_div'><img id='post' src='${rec.data().p_link}'></div>`+
      ` <div class='social_section'><div class='like_div'> <i  id='check_like'  class='fa-regular fa-thumbs-up'></i>  <b  id='likes'>${rec.data().p_like}</b> </div> <div class='comment_icon'> <i onclick='showcomment(this)'' class='fa-regular fa-comment'></i>  <b id='comment_counnt'>0</b></div> </div>`
       "<div class=;comment_section'>"
           "<div class='add_comment_section'> <img id='comment_dp' src='' ><input onkeyup='sendshow(this)' id='comment_input' placeholder='add a comment..' type='text'> <i id='sending' class='fa-regular fa-paper-plane'></i> <i   class='fa-regular fa-face-smile'></i></div>"
           " <div class='comments_list'>"
               "<div class='comment_div'> <img  id='cmnt_user_dp' src='' > <div class='cmnt_header'><p id='comment'>Yeah actually that is true,there many trees that have been cutting down we have to grow some trees in free space.</p><div class='replay'><i class='fa-solid fa-reply'></i><span class='replay_s'>replay</span></div></div> </div>"
            "</div>"
       "</div>"
   
var c = document.querySelector('.post_container')
c.append(card)


}
,setTimeout(lets_get,1600)

)




//for see more ...

function lets_get(){
 let see_more = document.querySelectorAll('#see_more')
see_more.forEach((x)=>{

 
   x.addEventListener('click', function(){showmore(this)}) })

}



function showmore(mm){

 console.log( mm.parentElement.firstElementChild.id);


   if(  mm.parentElement.firstElementChild.id!='see_more' &&  mm.parentElement.lastElementChild.innerText=='See More..' ){
       mm.parentElement.firstElementChild.style.display = 'block';
     
       mm.innerText = 'See Less..'
      
   
  
   }else if( mm.parentElement.lastElementChild.innerText=='See Less..'){ 
       mm.parentElement.firstElementChild.style.display = 'none';
       mm.innerText = 'See More..'
    
   }
 
}
