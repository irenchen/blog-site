var componentAdminPage1 = Vue.component('admin-page-1', {
    template: `
        <div>
            <admin-article-edit v-on:update-article="renderArticles"></admin-article-edit>
            <div class="row">
                <div class="col-xs-8">
                    <div class="form-group" style="display:inline-block;">
                        <label for="start">起始日期</label>
                        <input type="date" id="start" name="start"
                            v-model="startDate">
                    </div>
                    <div class="form-group" style="display:inline-block;">
                        <label for="stop">結束日期</label>
                        <input type="date" id="stop" name="stop"
                            v-model="stopDate">
                    </div>
                    <button class="btn btn-default" id="dateRangeBtn"
                            @click="handleDateRange">設定時間區間</button>
                </div>
                <div class="col-xs-4 text-right">
                    <button class="btn btn-default" style="margin:5px;"
                            data-toggle="modal" 
                            data-target="#myModal"
                            v-on:click="createArticle">
                        發布新文章
                    </button>
                    <button class="btn btn-default" style="margin:5px;"
                            @click="deleteAll">
                        刪除全部文章
                    </button>
                </div>
            </div>
            <div style="display:inline-block;margin-left: 45%;">文章總數 : {{ this.articles.length }}</div>
            <div class="bg-primary" style="padding: 0 10px;">                
                <table class="table table-responsive bg-primary">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>title</th>
                            <th>body</th>
                            <th>author</th>
                            <th>date</th>
                            <th>video</th>
                            <th>image</th>
                            <th>edit</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="articles.length > 0" v-for="(article, index) in articles">
                            <td>{{ article.id }}</td>
                            <td>{{ article.title }}</td>
                            <td>{{ article.body.slice(0, 10) + '...' }}</td>
                            <td>{{ article.author }}</td>
                            <td>{{ article.created }}</td>
                            <td>{{ article.youtube && article.youtube.slice(0, 10) + '...' }}</td>
                            <td>{{ article.image.slice(0, 10) + '...' }}</td>
                            <td>
                                <button class="btn btn-link" style="color:#ccc"
                                        data-toggle="modal" 
                                        data-target="#myModal"
                                        @click="editArticle(index)">edit
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-link" style="color:#555"
                                        @click="deleteArticle(index)">
                                        delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    props: [],
    data: function() {
        return {
            articles: [],
            currentArticle: {},
            currentIndex: 1,
            editMode: '',
            startDate: '',
            stopDate: '',
        }
    },
    methods: {
        editArticle: function(index) {
            console.log("edit article index = ", index)
            this.currentIndex = index
            this.currentArticle = this.articles[index]
            this.editMode = 'update'
            this.$emit('edit-article', this.currentArticle, this.editMode)
        },
        deleteArticle: function(index) {
            if(confirm('Are you sure to delete this article?')) {
                let articleId = this.articles[index].id
                console.log("remove article id = ", articleId)
                axios.delete('/db/article/' + articleId)
                    .then(res => {
                        // console.log(res)
                        this.renderArticles(res.data)
                    })
                    .catch(console.log)
            } else {

            }
        },
        createArticle: function() {
            this.editMode = 'create'
            this.$emit('create-article', this.editMode)
        },
        renderArticles(articles) {
            this.articles = articles
        },
        deleteAll: function() {
            if(confirm('Are you sure to delete all articles?')) {
                axios.delete('/db/article')
                .then(res => {
                    // console.log(res)
                    this.renderArticles([])
                })
                .catch(console.log)
            } else {

            }
        },
        handleDateRange: function() {
            if( this.startDate && this.stopDate ) {
                axios.get(`/db/article/range/${this.startDate}/${this.stopDate}`)
                    .then(res => {
                        this.renderArticles(res.data)
                    })
                    .catch(console.log)
            } else {
                $('#dateRangeBtn').text('請先設定日期').css('color', 'red')
                setTimeout(() => {
                    $('#dateRangeBtn').text('設定時間區間').css('color', 'black')
                }, 2000)
            }
        }
    },
    created() {
        axios.get('/db/article')
            .then(res => {
                this.articles = res.data
            })
            .catch(console.log)
        // axios.get('/articles.json')
        //     .then(res => {
        //         // console.log(res.data.length)
        //         this.articles = res.data.reverse()
        //     })
        //     .catch(console.log)
    }
})

