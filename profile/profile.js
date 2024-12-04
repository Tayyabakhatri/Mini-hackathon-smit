import {
    query, getDocs,
    where,
    collection,
    getAuth,
    db,
    serverTimestamp,
    addDoc,
    onAuthStateChanged,
    signOut,
    doc,
    updateProfile,
    updateDoc,
    deleteDoc

} from "../firebase.js"


const auth = getAuth()



const postTitle = document.getElementById('title');
const postDescription = document.getElementById('textarea');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('user-email');
const profileImage = document.getElementById('profile-img');
const logOut = document.getElementById('logout');
const pictureBtn = document.getElementById('pictureBtn');
const sendBtn = document.getElementById('sendBtn');
let travel = document.getElementById('travel');
let art = document.getElementById('art')
let general = document.getElementById('general')
let select = document.getElementById('drop-down')
select.addEventListener('change', () => {

    // Get the selected value
    let selectedValue = select.value;
    switch (selectedValue) {
        case "General":
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    profileEmail.innerHTML = user.email;
                    profileName.innerHTML = user.displayName;
                    console.log(user);

                    sendBtn.addEventListener('click', async (event) => {
                        event.preventDefault();

                        if (postTitle.value === "" || postDescription.value === "") {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "No post content",
                            });
                            return;
                        }

                        try {
                            const docRef = await addDoc(collection(db, "post"), {
                                Title: postTitle.value,
                                description: postDescription.value,
                                id: uid,
                                createdAt: serverTimestamp(),
                                email: user.email,
                            });
                            console.log("Document written with ID:", docRef.id);

                            // Display Current Post
                            const showCurrentPost = document.getElementById("showCurrentPost");
                            showCurrentPost.innerHTML = `
              <div class="container my-4">
                <div class="card pt-4 border w-100" id="postCard">
                  <p class="px-2" id="postHeading">Current Post</p>
                  <span id="profile-name" class="name mt-3">${user.displayName || "Anonymous"}</span>
                  <span class="idd" id="user-email">${user.email}</span>
                  <input type="text" id="title" value='${postTitle.value}' readonly>
                  <textarea name="textarea" id="textarea" readonly>${postDescription.value}</textarea>
                  <div>
                    <button id='edit' class='btn1'>Edit</button>
                    <button id='del' class='btn1'>Delete</button>
                  </div>
                </div>
              </div>`;

                            postTitle.value = "";
                            postDescription.value = "";

                            // Delete Functionality
                            const delButton = document.getElementById("del");
                            delButton.addEventListener("click", async (event) => {
                                const postId = docRef.id;
                                const result = await Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!",
                                });

                                if (result.isConfirmed) {
                                    await deleteDoc(doc(db, "Art", postId));
                                    Swal.fire("Deleted!", "Your post has been deleted.", "success");

                                    const postCard = event.target.closest(".container");
                                    if (postCard) postCard.remove();
                                }
                            });

                            // Edit Functionality
                            const editButton = document.getElementById("edit");
                            editButton.addEventListener("click", () => {
                                const newTitle = prompt("Edit Title?", postTitle.value);
                                const newDescription = prompt("Edit Description?", postDescription.value);

                                if (newTitle && newDescription) {
                                    postTitle.value = newTitle;
                                    postDescription.value = newDescription;
                                    console.log("Post updated!");
                                }
                            });
                        } catch (error) {
                            console.error("Error writing document: ", error);
                            Swal.fire("Error", "Unable to save your post.", "error");
                        }
                    });
                }
            });
            break;
        case "Art":
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    profileEmail.innerHTML = user.email;
                    profileName.innerHTML = user.displayName;
                    console.log(user);

                    sendBtn.addEventListener('click', async (event) => {
                        event.preventDefault();

                        if (postTitle.value === "" || postDescription.value === "") {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "No post content",
                            });
                            return;
                        }

                        try {
                            const docRef = await addDoc(collection(db, "Art"), {
                                Title: postTitle.value,
                                description: postDescription.value,
                                id: uid,
                                createdAt: serverTimestamp(),
                                email: user.email,
                            });
                            console.log("Document written with ID:", docRef.id);

                            // Display Current Post
                            const showCurrentPost = document.getElementById("showCurrentPost");
                            showCurrentPost.innerHTML = `
              <div class="container my-4">
                <div class="card pt-4 border w-100" id="postCard">
                  <p class="px-2" id="postHeading">Current Post</p>
                  <span id="profile-name" class="name mt-3">${user.displayName || "Anonymous"}</span>
                  <span class="idd" id="user-email">${user.email}</span>
                  <input type="text" id="title" value='${postTitle.value}' readonly>
                  <textarea name="textarea" id="textarea" readonly>${postDescription.value}</textarea>
                  <div>
                    <button id='edit' class='btn1'>Edit</button>
                    <button id='del' class='btn1'>Delete</button>
                  </div>
                </div>
              </div>`;

                            postTitle.value = "";
                            postDescription.value = "";

                            // Delete Functionality
                            const delButton = document.getElementById("del");
                            delButton.addEventListener("click", async (event) => {
                                const postId = docRef.id;
                                const result = await Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!",
                                });

                                if (result.isConfirmed) {
                                    await deleteDoc(doc(db, "Art", postId));
                                    Swal.fire("Deleted!", "Your post has been deleted.", "success");

                                    const postCard = event.target.closest(".container");
                                    if (postCard) postCard.remove();
                                }
                            });

                            // Edit Functionality
                            const editButton = document.getElementById("edit");
                            editButton.addEventListener("click", () => {
                                const newTitle = prompt("Edit Title?", postTitle.value);
                                const newDescription = prompt("Edit Description?", postDescription.value);

                                if (newTitle && newDescription) {
                                    postTitle.value = newTitle;
                                    postDescription.value = newDescription;
                                    console.log("Post updated!");
                                }
                            });
                        } catch (error) {
                            console.error("Error writing document: ", error);
                            Swal.fire("Error", "Unable to save your post.", "error");
                        }
                    });
                }
            });
            break;
        case "Traveling":
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    profileEmail.innerHTML = user.email;
                    profileName.innerHTML = user.displayName;
                    console.log(user);

                    sendBtn.addEventListener('click', async (event) => {
                        event.preventDefault();

                        if (postTitle.value === "" || postDescription.value === "") {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "No post content",
                            });
                            return;
                        }

                        try {
                            const docRef = await addDoc(collection(db, "Traveling"), {
                                Title: postTitle.value,
                                description: postDescription.value,
                                id: uid,
                                createdAt: serverTimestamp(),
                                email: user.email,
                            });
                            console.log("Document written with ID:", docRef.id);

                            // Display Current Post
                            const showCurrentPost = document.getElementById("showCurrentPost");
                            showCurrentPost.innerHTML = `
              <div class="container my-4">
                <div class="card pt-4 border w-100" id="postCard">
                  <p class="px-2" id="postHeading">Current Post</p>
                  <span id="profile-name" class="name mt-3">${user.displayName || "Anonymous"}</span>
                  <span class="idd" id="user-email">${user.email}</span>
                  <input type="text" id="title" value='${postTitle.value}' readonly>
                  <textarea name="textarea" id="textarea" readonly>${postDescription.value}</textarea>
                  <div>
                    <button id='edit' class='btn1'>Edit</button>
                    <button id='del' class='btn1'>Delete</button>
                  </div>
                </div>
              </div>`;

                            postTitle.value = "";
                            postDescription.value = "";

                            // Delete Functionality
                            const delButton = document.getElementById("del");
                            delButton.addEventListener("click", async (event) => {
                                const postId = docRef.id;
                                const result = await Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!",
                                });

                                if (result.isConfirmed) {
                                    await deleteDoc(doc(db, "Art", postId));
                                    Swal.fire("Deleted!", "Your post has been deleted.", "success");

                                    const postCard = event.target.closest(".container");
                                    if (postCard) postCard.remove();
                                }
                            });

                            // Edit Functionality
                            const editButton = document.getElementById("edit");
                            editButton.addEventListener("click", () => {
                                const newTitle = prompt("Edit Title?", postTitle.value);
                                const newDescription = prompt("Edit Description?", postDescription.value);

                                if (newTitle && newDescription) {
                                    postTitle.value = newTitle;
                                    postDescription.value = newDescription;
                                    console.log("Post updated!");
                                }
                            });
                        } catch (error) {
                            console.error("Error writing document: ", error);
                            Swal.fire("Error", "Unable to save your post.", "error");
                        }
                    });
                }
            });
            break;

        default:
            console.log("Category not recognized");
    }

})

//category c finish



// getting data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        // profileEmail.innerHTML = user.email;
        // profileName.innerHTML = user.displayName;
        console.log(user);
        travel.addEventListener('click', async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Traveling"));

                // Check if there are no posts
                if (querySnapshot.empty) {
                    alert("No posts available.");
                    return;
                } else {

                    // Get the container to display posts
                    let showCurrentPost = document.getElementById('tra');
                    showCurrentPost.innerHTML = ""; // Clear previous posts

                    // Loop through all documents in the query snapshot
                    querySnapshot.forEach((doc) => {
                        const data = doc.data(); // Get the document data
                        console.log(doc.id, " => ", data);
                        let title = data.Title
                        let description = data.description
                        let name = data.displayName

                        // Append each post to the container
                        showCurrentPost.innerHTML += `
                      <div class="container my-4">
                        <div class="card pt-4 border w-100" id="postCard">
                          <span id="profile-name" class="name mt-3">${name || "Anonymous"}</span>
                          <span class="idd" id="user-email">${data.email}</span>
                          <input type="text" id="title" value='${title}' readonly>
                          <textarea name="textarea" id="textarea" readonly>${description}</textarea>
                        </div>
                      </div>`;
                    });
                }
            } catch (error) {
                console.error("Error fetching posts: ", error.message);
                alert("Something went wrong while fetching posts.");
            }
        });

    }
})


//getting data
art.addEventListener('click', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Art"));

        // Check if there are no posts
        if (querySnapshot.empty) {
            alert("No posts available.");
            return;
        }

        // Get the container to display posts
        let showCurrentPost = document.getElementById('allUsersPost');
        showCurrentPost.innerHTML = ""; // Clear previous posts

        // Loop through all documents in the query snapshot
        querySnapshot.forEach((doc) => {
            const data = doc.data(); // Get the document data
            console.log(doc.id, " => ", data);

            // Append each post to the container
            showCurrentPost.innerHTML += `
            <div class="container my-4">
              <div class="card pt-4 border w-100" id="postCard">
                <p class="px-2" id="postHeading">Current Post</p>
                <span id="profile-name" class="name mt-3">${data.displayName || "Anonymous"}</span>
                <span class="idd" id="user-email">${data.email}</span>
                <input type="text" id="title" value='${data.Title}' readonly>
                <textarea name="textarea" id="textarea" readonly>${data.description}</textarea>
              </div>
            </div>`;
        });
    } catch (error) {
        console.error("Error fetching posts: ", error.message);
        console.log("ERROR:", error.code);

        alert("Something went wrong while fetching posts.");
    }
})
//getting data
general.addEventListener('click', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "post"));

        // Check if there are no posts
        if (querySnapshot.empty) {
            alert("No posts available.");
            return;
        }

        // Get the container to display posts
        let showCurrentPost = document.getElementById('allUsersPost');
        showCurrentPost.innerHTML = ""; // Clear previous posts

        // Loop through all documents in the query snapshot
        querySnapshot.forEach((doc) => {
            const data = doc.data(); // Get the document data
            console.log(doc.id, " => ", data);

            // Append each post to the container
            showCurrentPost.innerHTML += `
                <div class="container my-4">
                  <div class="card pt-4 border w-100" id="postCard">
                    <p class="px-2" id="postHeading">Current Post</p>
                    <span id="profile-name" class="name mt-3">${data.displayName || "Anonymous"}</span>
                    <span class="idd" id="user-email">${data.email}</span>
                    <input type="text" id="title" value='${data.Title}' readonly>
                    <textarea name="textarea" id="textarea" readonly>${data.description}</textarea>
                  </div>
                </div>`;
        });
    } catch (error) {
        console.error("Error fetching posts: ", error.message);
        alert("Something went wrong while fetching posts.");
    }
})



let cloudName = "dj6sjdar5"
let unSignedUploadPreset = "evqkzaka";
let resourceUrl = "";


pictureBtn.addEventListener('click', () => {
    let inputElement = document.createElement('input');
    inputElement.type = "file";
    inputElement.id = "file";

    inputElement.addEventListener('change', async (event) => {
        let file = event.target.files[0];
        if (!file) return;

        let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        let fd = new FormData();
        fd.append('upload_preset', unSignedUploadPreset);
        fd.append('file', file);

        try {
            let response = await fetch(url, {
                method: "POST",
                body: fd,
            });

            let data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || 'Upload failed');
            }

            let resourceUrl = data.secure_url;
            console.log("success", resourceUrl);

            let profile_img = document.getElementById("profile-img");
            if (data.format === "pdf" || data.format === "mp4") {
                let iframe = document.createElement('iframe');
                iframe.src = resourceUrl;
                console.log(iframe);
                // Append iframe to DOM if needed
            } else {
                profile_img.src = resourceUrl;
            }
        } catch (e) {
            console.log("ERROR:", e.message);
        }
    });

    document.body.appendChild(inputElement); // Temporarily add input to DOM
    inputElement.click();
    document.body.removeChild(inputElement); // Remove after click
});



const previous_Posts = document.getElementById('previous-Posts')
previous_Posts.addEventListener('click', () => {
    window.location.href = './previous.html'
})







logOut.addEventListener('click', () => {

    signOut(auth).then(() => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "logged out successfully",
            showConfirmButton: false,
            timer: 1500
        });
        window.location.href = "../signup-form/signup.html"
    }).catch((error) => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: error,
            showConfirmButton: false,
            timer: 1500
        });
    });
})














async function users() {
    try {
        // Getting all users once
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map(doc => ({
            ...doc.data()
        }));

        // Getting all posts once
        const postSnapshot = await getDocs(collection(db, "posts"));
        const posts = postSnapshot.docs.map(post => ({
            ...post.data()
        }));

        let postsHTML = "";

        // Loop through users and getting email from it
        users.forEach((user) => {
            let email = user.email;
            let name = user.name;

            // Now filtering through emails
            const userPost = posts.filter(post => post.email === email);
            userPost.forEach(post => {

                let title = post.Title;
                let description = post.description;
                let time = post.createdAt.toDate().toLocaleString();

                // Proper template literal usage
                postsHTML += `
                <div class="container my-4">
                    <div class="card pt-4 border w-100" id="postCard">
                        <h2>${name}</h2>
                        <p>${time}</p>
                        <input type="text" id="title" value="${title}" readonly>
                        <textarea name="textarea" id="textarea" readonly>${description}</textarea>
                    </div>
                </div>`;
            });
        });

        // Updating the DOM
        const allUsersPosts = document.getElementById('allUsersPosts');
        allUsersPosts.innerHTML = postsHTML;

    } catch (error) {
        console.log("Error:", error.message);
    }
}

users();



//background functionality start

let input = document.getElementById('input')
input.style.width = '25px'
input.addEventListener('input', () => {
    document.body.style.background = input.value
})
//background functionality finish
