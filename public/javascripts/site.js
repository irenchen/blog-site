var bus = new Vue() // for communications between components

var site = new Vue({
    el: '#site',
    data: {
        title: 'root',
        currentPage: 1,
    },
    methods:{
        showPage: function(index) {
            // console.log('trigger changePage event')
            this.currentPage = index
            this.$emit('reset-page-1')     
        },
        showHomePage: function() {
            this.currentPage = 1
            this.$emit('reset-page-1')
        }
    },
    computed: {

    },
    created() {
        // bus.$on('change-page', function(index) {
        //     console.log('trigger changePage event')
        //     site.currentPage = index
        // })
    },
    mounted() {
        
    }
})





