import { collection, query, where, getDocs, getAuth, onAuthStateChanged, db } from '../firebase.js'


const auth = getAuth()
let user_email = document.getElementById('user-email')
let user_name = document.getElementById('profile-name')




let goBack = document.getElementById('goBack')
goBack.addEventListener('click', () => {
    window.location.href = './profile.html'
})


// let uid = null

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        let name = user.displayName;
        let email = user.email
        user_email.innerHTML = email
        user_name.innerHTML = name
        console.log(user);






        //showing allposts from current user start
        async function currentUserAllPosts(id) {
            try {
                const docRef = collection(db, "post");
                const q = query(docRef, where("id", "==", id));
                const querySnapshot = await getDocs(q);


                const postsArray = [];
                querySnapshot.forEach((doc) => {
                    postsArray.push({ id: doc.id, ...doc.data() });
                });
                return postsArray;


            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }
           
        }






        const allPosts = await currentUserAllPosts(uid);
        if (allPosts.length == 0) {
            const previousPosts = document.getElementById('previousPosts');
            previousPosts.innerHTML = // Clear previous content
                ` <h1  class="card text-center border w-100">No post to show</h1>`
            console.log("no post");

        } else {
            const previousPosts = document.getElementById('previousPosts');
            let heading = document.getElementById('heading')
            previousPosts.innerHTML = ""; // Clear previous content
            allPosts.forEach((post) => {
                const createdAt = post.createdAt.toDate().toLocaleString();
                heading.innerHTML = `
                <div class="container my-4">
                        <div class="card pt-4 border w-100" id="postCard">
                        <p>General posts</p>
                        </div>
                    </div>`
                previousPosts.innerHTML += `
                    <div class="container my-4">
                        <div class="card pt-4 border w-100" id="postCard">
                        <h3 class="fw-bold">${user.displayName}</h3>
                            <p>${user.email}</p>
                            <p>${createdAt}</p>
                            <input type="text" id="title" value="${post.Title}" readonly>
                            <textarea name="textarea" id="textarea" readonly>${post.description}</textarea>
                        </div>
                    </div>`;
            });
        }




        //showing allposts from current user finish
    }
})



