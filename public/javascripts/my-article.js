var componentMyArticle = Vue.component('my-article', {
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h3 class="text-center">{{ article.title }}</h3>
                    <h5 class="text-center">by {{ article.author }} at {{ article.created }}</h5>
                    <p>index : {{ article.id }}</p>
                    <p>author : {{ article.author }}</p>
                    <p>date : {{ article.created }}</p>
                    <p>title : {{ article.title }}</p>
                    <p>body : {{ article.body }}</p>
                    <p>image : {{ article.img }}</p>
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

