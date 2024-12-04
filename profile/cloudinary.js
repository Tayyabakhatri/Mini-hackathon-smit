// let cloudName = "dj6sjdar5"
// let unSignedUploadPreset= "evqkzaka";
// let profile_img =document.getElementById("profile-img");
// let change_photo = document.getElementById('file');
// change_photo.addEventListener('change',()=>{
//     let file = change_photo.files[0]
//     let url= `https://api.cloudinary.com/v1_1/${cloudName}/upload`
//     let fd = new FormData()
//     fd.append('upload_preset',unSignedUploadPreset)
//     fd.append('file',file)

//     fetch(url,{
//         method:"POST",
//         body:fd,
//     })
//     .then((response)=> response.json())
//     .then((data)=>{
//         let resourceUrl =data.secure_url;
//         console.log("success",resourceUrl);
//         profile_img.src=resourceUrl
    
//         return profile_img
//     })
//     .catch((e)=>{
//         console.log("ERROR:",e);
        
//     })
// })
// export{profile_img}
