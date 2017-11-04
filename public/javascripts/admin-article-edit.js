var componentAdminArticleEdit = Vue.component('admin-article-edit', {
    template: `
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog" style="width:80%;">        
                <!-- Modal content-->
                <div class="modal-content" v-show="mode == 'create'">
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">新增文章</h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="title">作者</label>
                                <input type="text" class="form-control"
                                    id="author" name="author" 
                                    v-model="newArticle.author">
                            </div>                            
                            <div class="form-group">
                                <label for="title">文章標題</label>
                                <input type="text" class="form-control"
                                       id="title" name="title" 
                                       v-model="newArticle.title">
                            </div>
                            <div class="form-group">
                                <label for="body">文章內容</label>
                                <textarea class="form-control" rows="10"
                                    id="body" name="body"
                                    v-model="newArticle.body">
                                </textarea>
                            </div>
                            <div class="form-group">
                                <label for="youtube">內嵌youtube影片</label>
                                <input type="text" class="form-control"
                                    id="youtube" name="youtube"
                                    v-model="newArticle.youtube">
                            </div>
                            <div class="form-group">
                                <label for="image1">內嵌圖片</label>
                                <input type="file" class="form-control"
                                       id="image1" name="image1">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-info" 
                                    data-dismiss="modal"
                                    @click="createOrUpdateArticle">
                                確認新增文章
                            </button>
                            <button class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                </div>
                <div class="modal-content" v-show="mode == 'update'">
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">修改文章</h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="title">作者</label>
                                <input type="text" class="form-control"
                                    id="author" name="author" 
                                    v-model="newArticle.author">
                            </div> 
                            <div class="form-group">
                                <label for="title">文章標題</label>
                                <input type="text" class="form-control"
                                    id="title" name="title" 
                                    v-model="newArticle.title">
                            </div>
                            <div class="form-group">
                                <label for="body">文章內容</label>
                                <textarea class="form-control" rows="10"
                                    id="body" name="body" 
                                    v-model="newArticle.body">
                                </textarea>
                            </div>
                            <div class="form-group">
                                <label for="youtube">修改內嵌youtube影片</label>
                                <input type="text" class="form-control"
                                    id="youtube" name="youtube"
                                    v-model="newArticle.youtube">
                            </div>
                            <div class="form-group">
                                <label for="image2">更換內嵌圖片
                                    <img :src="newArticle.image" class="img img-thumbnail">
                                </label>
                                <input type="file" class="form-control"
                                    id="image2" name="image2">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-info"
                                    data-dismiss="modal"
                                    @click="createOrUpdateArticle">
                                    確認修改文章
                            </button>
                            <button class="btn btn-default" data-dismiss="modal">取消</button>
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
        },
        createOrUpdateArticle: function($event) {
            console.log('submit article modification')
            let formData = new FormData()
            formData.append('author', this.newArticle.author)
            formData.append('title', this.newArticle.title)
            formData.append('body', this.newArticle.body)
            formData.append('youtube', this.newArticle.youtube)
            if(this.mode === 'create') {
                formData.append('image', document.querySelector('#image1').files[0])
                axios.post('/db/article', formData)
                    .then(res => {
                        // console.log(res.data)
                        this.$emit('update-article', res.data)
                    })
                    .catch(console.log)
            } else {
                formData.append('orgImage', this.newArticle.image)
                formData.append('image', document.querySelector('#image2').files[0])
                axios.put('/db/article/' + this.newArticle.id, formData)
                    .then(res => {
                        // console.log(res.data)
                        this.$emit('update-article', res.data)
                    })
                    .catch(console.log)
            }
        }
    },
    created() {
        this.$parent.$on('edit-article', this.editArticle)
        this.$parent.$on('create-article', this.createArticle)
    }
})

