//login elementos
const login = document.querySelector(".form-container"); 
const form = document.querySelector(".form"); 

//chat elementos
const chat = document.querySelector(".container-chat");

const handleLogin = (e) => {
  e.preventDefault();

  login.style.display = "none";
  chat.style.display = "flex";
};

form.addEventListener("submit", handleLogin);   