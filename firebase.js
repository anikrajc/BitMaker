 var config = {
     apiKey: "AIzaSyCxwcjrcltKvY-dKkR_ImgZgLnypqK577s",
     authDomain: "bitmaker-53069.firebaseapp.com",
     databaseURL: "https://bitmaker-53069.firebaseio.com",
     storageBucket: "bitmaker-53069.appspot.com",
     messagingSenderId: "986392121334"
 };
 var provider;
 var database;
 var uid;
 var modal = document.getElementById('myModal');
 var span = document.getElementsByClassName("close")[0];
 var uploadbtn = document.getElementsByClassName("button")[0];

 setTimeout(function() {
     firebase.initializeApp(config);
     provider = new firebase.auth.GoogleAuthProvider();
     database = firebase.database();
     sign_in();

 }, 2000);

 function sign_in() {
     firebase.auth().signInWithPopup(provider).then(function(result) {
         var token = result.credential.accessToken;
         user = result.user;
         var email = user.email;
         var prourl = user.photoURL;
         uid = user.uid;
         document.getElementsByClassName("nonloader")[0].style.display = "block";
         document.getElementsByClassName("loaderparent")[0].style.display = "none";
         loadStyle("/style.css", function() {});
         document.getElementsByClassName("header")[0].style.display = "block";
         document.getElementsByClassName("side-nav")[0].style.display = "block";
         document.getElementsByClassName("side-nav__header")[0].innerHTML = email;
         document.getElementsByClassName("side-nav__header")[0].style.backgroundImage = "url('" + prourl + "')";
         document.getElementsByClassName("cloudsvg")[0].src = "cloudupload.svg";
         firebase.database().ref(uid).once('value', function(snapshot) {
             snapshot.forEach(function(childSnapshot) {
                 var childKey = childSnapshot.key;
                 var childData = childSnapshot.val();
                 console.log(childData);
                 document.getElementById("bits").innerHTML = childData.filename;

             });
         });
     }).catch(function(error) {
         var errorCode = error.code;
         var errorMessage = error.message;
         var email = error.email;
         var credential = error.credential;

     });
 }

 function signout() {
     firebase.auth().signOut().then(function() {
         document.getElementsByClassName("header__menu-toggle")[0].style.display = "none";
         window.location.reload();


     });
 }
 var filename;

 function upload(file) {
     var x = editor.getValue();
     if (!file) {
         filename = document.getElementsByClassName("filename")[0].value + ".pdf";
         console.log(filename);
         console.log(x);
         modal.style.display = "none";

     }
     firebase.database().ref(uid).push().set({
         filename: filename,
         bit: x
     });

     modal.style.display = "none";

     firebase.database().ref(uid).once('value', function(snapshot) {
         snapshot.forEach(function(childSnapshot) {
             var childKey = childSnapshot.key;
             var childData = childSnapshot.val();
             console.log(childData.filename);
             document.getElementById("bits").innerHTML = childData.filename;

         });
     });
 }
 editor.on("change", function() {
     document.getElementsByClassName("cloudsvg")[0].src = "cloudupload.svg";


 });