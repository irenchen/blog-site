var componentAdminPage1 = Vue.component('admin-page-1', {
    template: `
        <div>
            <admin-article-edit v-on:update-article="renderArticles"></admin-article-edit>
            <div class="text-right">
                <button class="btn btn-default"
                        data-toggle="modal" 
                        data-target="#myModal"
                        v-on:click="createArticle">
                    發布新文章
                </button>
                <button class="btn btn-default"
                        @click="deleteAll">
                    刪除全部文章
                </button>
            </div>
            
            <div class="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>body</th>
                        <th>author</th>
                        <th>date</th>
                        <th>image</th>
                        <th>edit</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="articles.length > 0" v-for="(article, index) in articles">
                        <td>{{ article.id }}</td>
                        <td>{{ article.title }}</td>
                        <td>{{ article.body.slice(0, 30) + '...' }}</td>
                        <td>{{ article.author }}</td>
                        <td>{{ article.created }}</td>
                        <td>{{ article.image }}</td>
                        <td>
                            <button class="btn btn-link" 
                                    data-toggle="modal" 
                                    data-target="#myModal"
                                    @click="editArticle(index)">edit
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-link"
                                    @click="deleteArticle(index)">
                                    delete
                            </button>
                        </td>
                    </tr>
                </tbody>
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

