const firebaseConfig = {
  apiKey: "AIzaSyBTOgmIQI3-YgpCBAp0IVzU6Vivg1GrTF8",
  authDomain: "extensaolibras-b7cdf.firebaseapp.com",
  projectId: "extensaolibras-b7cdf",
  storageBucket: "extensaolibras-b7cdf.appspot.com",
  messagingSenderId: "977616019195",
  appId: "1:977616019195:web:5a5c82a4fc10bdb1d9da5e"
};

firebase.initializeApp(firebaseConfig);

var fileIten;
var fileName;

function getFile(e){
  fileIten = e.target.files[0];
  fileName = fileIten.name;
}

function uploadImagem(){
  let storageRef = firebase.storage().ref("images/"+fileName);
  let uploadTask = storageRef.put(fileIten);

  uploadTask.on("state_changed", (snapshot)=>{
    console.log(snapshot);
    //porcentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalbytes)*100);
    //console.log(porcentVal);
  }, (error)=>{
    console.log("Error = ", error);
  }, ()=>{
    uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
      console.log("URL : ", url);
      getImage();
    })
  })
}

const storage = firebase.storage();
const listRef = storage.ref('images/');

const list = document.getElementById("content");

function getImage(){
  content.innerHTML = "";
  listRef.listAll()
  .then((res) => {
    res.items.forEach((item) => {
      item.getDownloadURL()
        .then((url) => {
          console.log(item.name);
          console.log("---");
          console.log(url);
          content.innerHTML += `<img src="${url}" id="${item.name}" ondblclick="delet(id)">`;
          content.innerHTML += `<p>${item.name}</p>`;
        })
    });
  })
  .catch((error) => {
    console.error(error);
  });
}


// const imageRef = storage.ref('images/sinal1.gif');

function delet(name) {
  const imageRef = storage.ref('images/'+name);

  imageRef.delete()
  .then(() => {
    console.log("Objeto excluído com sucesso.");
    getImage();
  })
  .catch((error) => {
    console.error("Erro ao excluir o objeto:", error);
  });
}
