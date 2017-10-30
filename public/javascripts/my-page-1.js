var componentMyPage1 = Vue.component('my-page-1', {
    template: `
        <div>
            <my-article-nav 
                v-show="articleMode" 
                v-bind:current="currentIndex"
                v-bind:initialPage="currentPage" 
                v-bind:articles="articles">
            </my-article-nav>

            <div class="row" v-show="!articleMode">
                <div class="col-sm-4" v-for="(article, index) in articles">
                    <div class="well">
                        <a href="#" class="article-anchor" v-on:click="showArticle(index)">
                            <img src="/images/landmark2.jpg" class="img-rounded img-responsive">
                            <p>{{ article.title }}</p>
                            <p>{{ article.body.slice(0, 30) + '...' }}</p>
                        </a>
                    </div>                    
                </div>
            </div>
            <my-article 
                v-show="articleMode" 
                v-bind:article="currentArticle">
            </my-article>
        </div>
    `,
    props: [],
    data: function() {
        return {
            articles: [],
            currentArticle: {},
            currentIndex: 0,
            currentPage: 1,
            articleMode: false,
        }
    },
    methods: {
        showAll: function() {
            this.currentIndex = 0
            this.currentArticle = {}
            this.currentPage = 1
            this.articleMode = false
        },
        showArticle: function(index) {
            this.currentIndex = index
            this.currentArticle = this.articles[index]
            this.currentPage = Math.ceil(index / 10)
            this.articleMode = true
        },
    },
    created() {
        axios.get('/articles.json')
            .then(res => {
                // console.log(res.data.length)
                this.articles = res.data.reverse()
            })
            .catch(console.log)
        this.$parent.$on('reset-page-1', this.showAll)
    }
})

