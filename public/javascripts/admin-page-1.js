var componentAdminPage1 = Vue.component('admin-page-1', {
    template: `
        <div>
            <admin-article-edit></admin-article-edit>
            <div class="text-right">
                <button class="btn btn-default"
                        data-toggle="modal" 
                        data-target="#myModal"
                        v-on:click="createArticle">
                    發布新文章
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
                        <th>img</th>
                        <th>edit</th>
                        <th>remove</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(article, index) in articles">
                        <td>{{ article.id }}</td>
                        <td>{{ article.title }}</td>
                        <td>{{ article.body.slice(0, 30) + '...' }}</td>
                        <td>{{ article.author }}</td>
                        <td>{{ article.created }}</td>
                        <td>{{ article.img }}</td>
                        <td>
                            <button class="btn btn-link" 
                                    data-toggle="modal" 
                                    data-target="#myModal"
                                    @click="editArticle(index)">edit
                            </button>
                        </td>
                        <td><button class="btn btn-link">disable</button></td>
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
        createArticle: function() {
            this.editMode = 'create'
            this.$emit('create-article', this.editMode)
        }
    },
    created() {
        axios.get('/articles.json')
            .then(res => {
                // console.log(res.data.length)
                this.articles = res.data.reverse()
            })
            .catch(console.log)
    }
})

