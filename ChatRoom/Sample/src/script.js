/*const exeecuteFunction = () => {
    const sendBtn = document.querySelector('#sendbtn');
    const messages = document.querySelector('#messages');
    const messageBox = document.querySelector('#messageBox');
    let ws;

    function showMessage(message) {
        messages.textContent += `\n${message}`;
        messages.scrollTop = messages.scrollHeight;
        messageBox.value = '';
    }

    function init() {
        if (ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
        }

        ws = new WebSocket('ws://localhost:7171');
        ws.onopen = () => {
            console.log('Connention opened!');
        }
        ws.onmessage = ({
            data
        }) => showMessage(data);
        ws.onclose = () => {
            ws = null;
        }
    }

    sendBtn.onclick = function() {
        console.log('Btn click!');
        if (!ws) {
            showMessage("No WebSocket Connention.");
            return;
        }

        ws.send(messageBox.value);
        showMessage(messageBox.value);
    }

    init();
}

export default exeecuteFunction;*/

window.onload = async function() {
    const sendBtn = document.querySelector('#sendbtn');
    const messages = document.querySelector('#messages');
    const messageBox = document.querySelector('#messageBox');
    let ws;

    function showMessage(message) {
        messages.textContent += `\n\n${message}`;
        messages.scrollTop = messages.scrollHeight;
        messageBox.value = '';
    }

    async function init() {
        if (ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
        }
        const config = await getWsSetting();
        ws = new WebSocket(`ws://${config.wsHost}:${config.wsPort}`);
        ws.onopen = () => {
            console.log('Connention opened!');
        }
        ws.onmessage = async({ data }) => {
            if (data instanceof Blob) {
                data = await data.text();
            }
            showMessage(data);
        }
        ws.onclose = () => {
            ws = null;
        }
    }

    async function getWsSetting() {
        var config = null;
        await fetch('http://localhost:8081/apiconfig')
            .then((response) => response.json())
            .then((data) => { config = data })
            .catch((error) => {
                //
            });

        return config;
    }

    sendBtn.onclick = function() {
        if (!messageBox.value || messageBox.value.trim() == '') {
            messageBox.value = '';
            return;
        }
        if (!ws || ws.readyState !== ws.OPEN) {
            showMessage("No WebSocket Connention.");
            return;
        }

        ws.send(messageBox.value.toString());
        showMessage(messageBox.value);
    }

    init();
}