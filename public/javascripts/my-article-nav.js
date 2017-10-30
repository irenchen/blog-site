var componentMyArticleNav = Vue.component('my-article-nav', {
    template: `
        <div class="container row">
            <div class="col-xs-1" >
                <div v-if="currentPage > 1">
                    <button class="btn btn-info" @click="prevPage">Prev</button>
                </div>
                <div v-else></div>                
            </div>
            <div class="col-xs-1 text-center"
                 v-for="(article, index) in currentArticles">
                <button class="btn "
                   :class="{ 'btn-success': current == (currentPage - 1) * 10 + index ,
                             'btn-danger' : current !== (currentPage - 1) * 10 + index}"
                   @click="showArticle((currentPage - 1) * 10 + index)"
                   :title="article.title">
                    <span>{{ (currentPage - 1) * 10 + index + 1 }}</span>
                </button>
            </div>
            <div class="col-xs-1">
                <div v-if="currentPage < totalPages">
                    <button class="btn btn-info" @click="nextPage">Next</button>
                </div>
                <div v-else></div>
            </div>
            <div class="clearfix"></div>
            <div>totalPages : {{ totalPages }}, currentPage : {{ currentPage }}</div>
        </div>
    `,
    props: ['current', 'articles', 'initialPage'],
    data: function() {
        return {
            currentPage: 1,
        }
    },
    computed: {
        total: function() {
            return this.articles.length
        },
        totalPages: function() {
            return Math.ceil(this.articles.length / 10)
        },
        currentArticles: function() {
            var current = this.currentPage
            return this.articles.filter(function(a, i) {
                var min = (current - 1) * 10
                var max = min + 10
                // console.log(min, max)
                return i >= min && i < max
                // return true
            })
        }
    },
    methods: {
        showArticle: function(index) {
            this.$parent.showArticle(index)
        },
        nextPage: function() {
            this.currentPage += 1
        },
        prevPage: function() {
            this.currentPage -= 1
        }
    },
    created() {

    },
    mounted() {
        this.currentPage = this.initialPage
    }
})

