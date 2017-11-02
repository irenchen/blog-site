var componentMyPage1 = Vue.component('my-page-1', {
    template: `
        <div>
            <my-article-nav 
                v-show="articleMode" 
                v-bind:current="currentIndex"
                v-bind:initialPage="currentPage" 
                v-bind:articles="articles">
            </my-article-nav>

            <div class="row" v-show="!articleMode && articles.length > 0" v-for="row in rows">
                <div class="col-sm-4" v-for="(article, index) in articles.slice(row*3, (row+1)*3)">
                    <div class="well">
                        <a href="#" class="article-anchor" v-on:click="showArticle(row*3 + index)">
                            <img v-bind:src="article.image" class="img-rounded img-responsive">
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
            <div class="text-center" v-show="!articleMode">
                <button id="more" class="btn btn-danger">More...</button>
            </div>
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
            offset: 0,
            limit: 9,
        }
    },
    methods: {
        showAll: function() {
            // this.currentIndex = 0
            // this.currentArticle = {}
            // this.currentPage = 1
            this.articleMode = false
        },
        showArticle: function(index) {
            this.currentIndex = index
            this.currentArticle = this.articles[index]
            this.currentPage = Math.ceil(index / 10)
            this.articleMode = true
        },
    },
    computed: {
        rows: function() {
            let arr = new Array(Math.ceil(this.articles.length / 3)).fill(1)
            console.log('rows size = ', arr.length)
            return arr.map((e, i) => i)
        }
    },
    created() {
        axios.get('/db/article/' + this.offset + '/' + this.limit)
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
        this.$parent.$on('reset-page-1', this.showAll)
    },
    mounted() {
        // console.log("window inner height : ", window.innerHeight)
        // Rx.Observable.fromEvent(window, 'scroll')
        //     .debounceTime(1000)
        //     .subscribe(evt => console.log(window.scrollY))
        let moreBtn = document.getElementById('more')
        let sub = Rx.Observable.fromEvent(moreBtn, 'click')
                    .map(() => moreBtn.textContent = 'loading articles...')
                    .debounceTime(1000)
                    .switchMap(() => {
                        this.offset += this.limit
                        return Rx.Observable.fromPromise(axios.get('/db/article/' + this.offset + '/' + this.limit))
                    })
                    .subscribe(
                        (res) => {
                            console.log(res)
                            if(res.data.length > 0) {
                                this.articles = [...this.articles, ...res.data]
                                moreBtn.textContent = 'More...'
                            } else {
                                console.log(`no more articles...`)
                                moreBtn.textContent = 'no more articles'
                                moreBtn.setAttribute('disabled', true)
                            }
                        },
                        (err) => {
                            console.log(err)
                        }
                    )
    }
})

