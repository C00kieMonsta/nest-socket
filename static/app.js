var app = new Vue({
    el: '#v-app',
    data: {
        title: 'Testing Sockets',
        text: '',
        messages: [`Session opened at ${new Date().toLocaleDateString()}`]
    },
    methods: {}
});