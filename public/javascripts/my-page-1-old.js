var componentMyPage1 = Vue.component('my-page-1', {
    template: `
        <div>
            <my-article-nav v-show="articleMode" v-bind:current="currentIndex" v-bind:articles="articles"></my-article-nav>
            <h3><a href="#" @click="showAll">經驗分享</a>
                <ul v-show="articleMode">
                    <li v-for="article in articles"                        
                        style="display:inline;margin-right:5px;">
                        <a href="#"
                           v-bind:class="{active: article.id === currentIndex}"
                           v-on:click="showArticle(article.id)"
                           v-show="(article.id < currentIndex + 3) && (article.id > currentIndex - 3)"
                        >{{ article.id }}</a>
                    </li>
                </ul>
            </h3>
            <div class="row" v-show="!articleMode">                
                <ul class="list-group">
                    <li v-for="article in articles" class="list-group-item">
                        <a href="#" v-on:click="showArticle(article.id)">
                        title - {{ article.title }}, author - {{ article.author }}
                        </a>                    
                    </li>
                </ul>
            </div>
            <my-article v-show="articleMode" v-bind:article="currentArticle">
            </my-article>
        </div>
    `,
    props: [],
    data: function() {
        return {
            articles: [],
            currentArticle: {},
            currentIndex: 1,
            articleMode: false,
        }
    },
    methods: {
        showAll: function() {
            this.currentIndex = 1
            this.currentArticle = {}
            this.articleMode = false
        },
        showArticle: function(id) {
            this.currentIndex = id
            this.currentArticle = this.articles[id-1]
            this.articleMode = true
        },
    },
    created() {
        axios.get('/articles.json')
            .then(res => {
                // console.log(res.data.length)
                this.articles = res.data
            })
            .catch(console.log)
        this.$parent.$on('reset-page-1', this.showAll)
    }
})

