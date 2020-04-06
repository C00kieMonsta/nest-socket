var app = new Vue({
    el: '#v-app',
    data: {
        title: 'Testing Sockets',
        text: '',
        messages: [`Session opened at ${new Date().toLocaleDateString()}`],
        socket: null
    },
    methods: {
        sendMessage() {
            if (this.text === '' ) return;
            console.log(`sent: ${this.text}`);
            this.socket.emit('messageToServer', this.text);
            this.text = '';
        },
        receiveMessage(msg) {
            console.log(`received: ${msg}`);
            this.messages.push(msg);
        }
    },
    created() { // Vue JS Hook
        this.socket = io('http://localhost:3001'); // create socket io client

        // listener on messageToClient event
        this.socket.on('messageToClient', (msg) => {
            this.receiveMessage(msg);
        });
    }
});