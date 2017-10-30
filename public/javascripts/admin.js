var bus = new Vue() // for communications between components

var admin = new Vue({
    el: '#admin',
    data: {
        title: 'administration',
        currentPage: 1,
    },
    methods:{
        changePage: function(index) {
            console.log('trigger changePage event')
            console.log('current page = ', index)
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





