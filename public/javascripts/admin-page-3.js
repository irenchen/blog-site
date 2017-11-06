var componentAdminPage3 = Vue.component('admin-page-3', {
    template: `
        <div class="container" style="min-height:500px;">
            <div v-html="content"></div>
        </div>
    `,
    props: [],
    data: function() {
        return {
            content: '<p>hello</p>'
        }
    },
    computed: {

    },
    methods: {
        
    },
    created() {
        
    }
})

