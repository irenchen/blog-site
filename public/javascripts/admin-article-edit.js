var componentAdminArticleEdit = Vue.component('admin-article-edit', {
    template: `
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">        
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Modal Header</h4>
                    </div>
                    <div class="modal-body">
                        <p>article id : {{ newArticle.id }}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>        
            </div>
        </div>
    `,
    props: [],
    data: function() {
        return {
            newArticle: {},
            mode : '',
        }
    },
    methods: {
        editArticle: function(article, mode) {
            console.log("trigger edit article")
            console.log("mode : ", mode)
            this.mode = mode
            this.newArticle = article
        },
        createArticle: function(mode) {
            console.log("trigger create article")
            console.log("mode : ", mode)
            this.mode = mode
            this.newArticle = {}
        }
    },
    created() {
        this.$parent.$on('edit-article', this.editArticle)
        this.$parent.$on('create-article', this.createArticle)
    }
})

