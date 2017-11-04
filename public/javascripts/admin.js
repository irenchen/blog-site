var bus = new Vue() // for communications between components

var admin = new Vue({
    el: '#admin',
    data: {
        title: 'administration',
        currentPage: 1,
    },
    methods:{
        showPage: function(index) {
            this.currentPage = index     
        },
    },
    computed: {

    },
    created() {

    },
    mounted() {

    }
})





