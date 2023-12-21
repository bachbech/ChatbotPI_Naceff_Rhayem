const button = document.querySelector("button");
const textarea = document.querySelector("textarea");
const responseDiv = document.querySelector("#reponse_msg");
const buttonMic = document.querySelector("#your_button_MIC_id"); // Add the correct ID for your microphone button

const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Event Listeners
button.addEventListener("click", chatBot);
buttonMic.addEventListener("click", speechToText);

// Main Function
function chatBot() {
    const text = textarea.value;

    // Communicate with the backend
    const backendUrl = "http://127.0.0.1:8000/analyse";
    
    fetch(backendUrl, {
        method: "POST",
        body: JSON.stringify({ "texte": text }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.warn(error);
    });
}

function speechToText() {
    alert("I am speech to text");

    // Trigger the Speech To Text API
    recognition.start();
}

recognition.onresult = function(event) {
    // Get the text
    const message = event.results[0][0].transcript;
    console.log('Result received: ' + message + '.');
    console.log('Confidence: ' + event.results[0][0].confidence);

    // Fill the textarea using this text
    textarea.value = message;
};
