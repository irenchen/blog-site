var componentMyArticle = Vue.component('my-article', {
    template: `
        <div class="container" style="margin-top:20px;">
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="well">
                        <img :src="article.image" class="img-responsive" />
                        <h2 class="text-center">{{ article.title }}</h2>
                        <h4 class="text-center">by {{ article.author }} at {{ article.created }}</h4>
                        <p class="hidden">index : {{ article.id }}</p>
                        <p>{{ article.body }}</p>
                    </div>

                </div>
            </div>
            <div class="row text-center">
                <h5>歡迎留言</h5>
                <form class="form-horizontal col-sm-6 col-sm-offset-3">
                    <div class="form-group">
                        <label for="author">暱稱</label>
                        <input type="text" class="form-control"
                               v-model="author" id="author">
                    </div>
                    <div class="form-group">
                        <label for="msg">留言</label>
                        <textarea class="form-control" rows="5" cols="30"
                                  v-model="message" id="msg">
                        </textarea>
                    </div>
                </form>           
            </div>
            <div class="row text-center">
            <h5>查看留言({{ article.messages && article.messages.length || 0 }})</h5>
            </div>
        </div>

    `,
    props: ['article'],
    data: function() {
        return {
            articles: [],
            currentIndex: 1,
            articleMode: false,
            message: '',
            author: '',
        }
    },
    methods: {

    },
    created() {

    }
})

