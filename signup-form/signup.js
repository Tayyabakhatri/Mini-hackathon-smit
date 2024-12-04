import {
    auth,
    getAuth,
    serverTimestamp,
    createUserWithEmailAndPassword,
    addDoc,
    collection,
    db, updateDoc,
    doc, updateProfile

} from "../firebase.js"




let profile_img = document.getElementById('profile-img');
let passward = document.getElementById('passward');
let email = document.getElementById('email');
let age = document.getElementById('age');
let name = document.getElementById('name');
let sign_UpBtn = document.getElementById('sign-UpBtn');

// const auth = getAuth(app);
sign_UpBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (email.value == "" || passward.value == "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "All credentials are required",
        });
    }

    else if (email.value && passward.value) {
        //creating user with email.and password
        createUserWithEmailAndPassword(auth, email.value, passward.value)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user)




                await updateProfile(user, {
                    displayName: name.value // New name

                });
                console.log("User profile updated:", user.displayName);





                //sweet alert start
                let timerInterval;
                Swal.fire({
                    title: "loading..",
                    
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                    }
                });
                // sweet alert finish

                //setting docs
                const docRef = await addDoc(collection(db, "users"), {
                    user_age: age.value,
                    createdAt: serverTimestamp(),
                    id: user.uid,
                    name: name.value,
                    email:user.email

                });
                console.log("Document written with ID: ", docRef.id);


                // now it will redirect
                setTimeout(() => {
                    window.location.href = "../login-form/login.html"
                }, 2000)

            })


            .catch((error) => {
                const errorMessage = error.message
                const errorCode = error.code
                console.log(errorMessage);
                console.log(errorCode);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });

            })
    }

})

//icons

let icon = document.getElementById('icon');
icon.addEventListener('click', () => {
    const inputType = passward.getAttribute('type')
    const type = inputType === "password" ? "text" : "password";
    passward.setAttribute('type', type)
    icon.classList.toggle('fa-eye-slash')
    icon.classList.toggle('fa-eye')
})





