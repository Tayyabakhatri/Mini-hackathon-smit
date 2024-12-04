import {
    GoogleAuthProvider,
    getAuth, signInWithPopup,
    provider,
    signInWithEmailAndPassword,
} from "../firebase.js"

const auth = getAuth();



let password = document.getElementById('passward');
let email = document.getElementById('email');
let LogInBtn = document.getElementById('LogInBtn');
//signin with email.and password start
LogInBtn.addEventListener('click', () => {

    if (email.value && password.value) {
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                Swal.fire({
                    title: "Sweet!",
                    imageUrl: "images.png",
                    imageWidth: 400,
                    imageHeight: 300,
                });
                setTimeout(() => {
                    window.location.href = "../profile/profile.html"
                }, 3000)


            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);

            });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Both email and password are required!",
        });
    }

})

//signin with email.and password finish



// sign in with google start 
let googleBtn = document.getElementById('googleBtn')
googleBtn.addEventListener('click', () => {

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
})
// sign in with google finish