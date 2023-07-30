const socket = io('http://localhost:8000');


 const form = document.getElementById('send-container');
 const messageInput = document.getElementById('messageInp');
 const messageContainer = document.querySelector(".Container");

 var audio = new Audio('ting.mp3')

 const append = (message, position) =>{
     const mesaageElement = document.createElement('div');
     mesaageElement.innerText =message;
     mesaageElement.classList.add('message');
     mesaageElement.classList.add(position);
     messageContainer.append(mesaageElement);
     if(position == 'left'){
        audio.play();
     }
    
 }

 form.addEventListener('submit',(e) => {
    e.preventDefault();
    const message =messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send' , message);
    messageInput.value = ''

 })

const name = prompt("Enter your name to join");
socket.emit('new-user-joined' ,name);

socket.on('user-joined' , name =>{
    append(`${name} joined the chat`,'right')
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}` ,'left')
})
socket.on('left', name => {
    append(`${name} left the chat` ,'left')
})