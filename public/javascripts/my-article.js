var componentMyArticle = Vue.component('my-article', {
    template: `
        <div class="container" style="margin-top:20px;">
            <div class="row">
                <div class="col-xs-12 ">
                    <div class="well">
                        <img :src="article.image" class="img-responsive" style="margin:0 auto;"/>
                        <h2 class="text-center">{{ article.title }}</h2>
                        <h4 class="text-center">by {{ article.author }} at {{ article.created }}</h4>
                        <p class="hidden">index : {{ article.id }}</p>
                        <p>{{ article.body }}</p>
                        <div v-if="article.youtube" style="padding:30px;">
                            <div class="embed-responsive embed-responsive-4by3">
                                <iframe class="embed-responsive-item" 
                                        :src="article.youtube" 
                                        frameborder="0" 
                                        allowfullscreen>
                                </iframe>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="row text-center">
                <h5>歡迎留言</h5>
                <form class="form-horizontal col-sm-6 col-sm-offset-3">
                    <div class="form-group">
                        <label for="msgAuthor">暱稱</label>
                        <input type="text" class="form-control"
                               v-model="message.author" id="msgAuthor" name="msgAuthor"
                               required>
                        <span class="text-danger" id="msgAuthorAlert"></span>
                    </div>
                    <div class="form-group">
                        <label for="msgBody">留言</label>
                        <textarea class="form-control" rows="5" cols="30"
                                  v-model="message.body" id="msgBody" name="msgBody"
                                  required>
                        </textarea>
                        <span class="text-danger" id="msgBodyAlert"></span>
                    </div>
                    <input type="submit" class="btn btn-default"
                           @click.prevent="handleMessageSubmit" 
                           value="送出留言">
                </form>           
            </div>
            <div class="row">
                <div class="col-sm-6 col-sm-offset-3">
                    <h5 class="text-center">
                        <button class="btn btn-link" 
                                @click="showMessage = !showMessage">
                            查看留言({{ this.messages && this.messages.length || 0 }})
                        </button>
                    </h5>
                    <div v-if="showMessage" class="panel panel-success text-success" 
                         v-for="message in messages">
                        <p class="panel-heading">{{ message.body }}</p>
                        <p class="text-right">{{ message.author }} at {{ message.created }}</p>
                           
                        <div v-show="message.reply" class="panel-footer">Reply : {{ message.reply }}</div>
                    </div>
                </div>
            </div>

        </div>

    `,
    props: ['article'],
    data: function() {
        return {
            articles: [],
            currentIndex: 1,
            articleMode: false,
            message: {
                author: '',
                body: ''
            },
            messages: [],
            showMessage: false,
        }
    },
    methods: {
        getMessagesByAid: function(aid) {
            axios.get('/db/message/' + aid)
                .then(res => {
                    // console.log(res.data)
                    this.messages = res.data                    
                })
                .catch(console.log) 
        },
        handleMessageSubmit: function(evt) {
            $('#msgAuthorAlert').text('')
            $('#msgBodyAlert').text('')
            let msgAuthor = document.getElementById('msgAuthor')
            let msgBody = document.getElementById('msgBody')
            if(this.message.author.trim().length == 0) {
                $('#msgAuthorAlert').text('required')
            } else if(this.message.body.trim().length == 0) {
                $('#msgBodyAlert').text('required')
            } else {
                // console.log('message submit')
                let formData = new FormData()
                formData.append('aid', this.article.id)
                formData.append('author', this.message.author.trim())
                formData.append('body', this.message.body.trim())
                axios.post('/db/message', formData)
                    .then(res => {
                        // console.log(res.data)
                        this.messages = res.data
                        this.message.body = ''
                    })
                    .catch(console.log)
            }
            
        }
    },
    watch: {
        article: function(newArticle) {
            this.showMessage = false
            this.getMessagesByAid(newArticle.id)
        }
    },
    created() {

    },
    mounted() {
        axios.get('/db/message/' + this.article.id)
            .then(res => {
                console.log(res.data)
                this.messages = res.data                
            })
            .catch(console.log) 
    }
})

