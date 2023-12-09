//login elementos
const login = document.querySelector(".form-container");
const form = document.querySelector(".form");
const nome = document.querySelector("#nome");

//chat elementos
const chat = document.querySelector(".container-chat");
const chatForm = document.querySelector(".form-chat");
const mensagem = document.querySelector("#mensagem");
const containerMensagens = document.querySelector(".container-mensagens");
const comunidade = document.querySelector(".comunidade");

const colors = [
  "cadetblue",
  "darkgoldenrod",
  "cornflowerblue",
  "darkkhaki",
  "hotpink",
  "gold",
];

const user = {
  id: "",
  name: "",
  color: "",
};

let websocket;

const createMessageSelfElement = (content) => {
  const divVoce = document.createElement("div");
  divVoce.classList.add("voce");

  const divMensagem = document.createElement("div");
  divMensagem.classList.add("mensagem-voce");

  const p = document.createElement("p");
  p.textContent = content;

  divMensagem.appendChild(p);
  divVoce.appendChild(divMensagem);

  return divVoce;
};

const createMessageOtherElement = (content, sender, senderColor) => {
  const divOutro = document.createElement("div");
  divOutro.classList.add("outro");

  const divMensagem = document.createElement("div");
  divMensagem.classList.add("mensagem-outro");

  const span = document.createElement("span");
  span.classList.add("username");
  span.textContent = sender;
  span.style.color = senderColor;

  const p = document.createElement("p");
  p.textContent = content;

  divMensagem.appendChild(span);
  divMensagem.appendChild(p);

  divOutro.appendChild(divMensagem);
  return divOutro;
};

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const scrollScreen = () => {
  containerMensagens.scrollTo({
    top: containerMensagens.scrollHeight,
    behavior: "smooth",
  });
};

const processMessage = ({ data }) => {
  const { userId, userName, userColor, content } = JSON.parse(data);

  if (user.id === userId) {
    const element = createMessageSelfElement(content);
    containerMensagens.appendChild(element);
  } else {
    const element = createMessageOtherElement(content, userName, userColor);
    containerMensagens.appendChild(element);
  }
  scrollScreen();
};

const handleLogin = (e) => {
  e.preventDefault();

  user.id = crypto.randomUUID();
  user.name = nome.value;
  user.color = getRandomColor();

  login.style.display = "none";
  chat.style.display = "flex";

  websocket = new WebSocket("ws://localhost:8080")
  websocket.onmessage = processMessage;
};

const sendMessage = (e) => {
  e.preventDefault();

  const message = {
    userId: user.id,
    userName: user.name,
    userColor: user.color,
    content: mensagem.value,
  };

  if (!message.content.trim()) {
    return
  }

  websocket.send(JSON.stringify(message));
  mensagem.value = "";
};

form.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);