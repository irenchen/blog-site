var componentAdminPage2 = Vue.component('admin-page-2', {
    template: `
        <div class="container">
            <div class="row">
                <div class="col-xs-10 col-xs-offset-1" style="background:#333;padding: 20px;min-height: 500px;">
                    <ul class="nav nav-pills nav-justified">
                        <li class="active"><a data-toggle="pill" href="#all">全部留言({{ this.allMessages.length }})</a></li>
                        <li><a data-toggle="pill" href="#not">未回覆留言({{ this.notRepliedMessages.length }})</a></li>
                        <li><a data-toggle="pill" href="#did">已回覆留言({{ this.didRepliedMessages.length }})</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="all" class="tab-pane fade in active">
                            <div class="panel-group">
                                <div class="panel panel-default" v-for="m in this.allMessages">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a :href="'#am' + m.id" data-toggle="collapse">
                                                {{ m.body }} by {{ m.author }} on {{ m.created }}
                                            </a>
                                            <button type="button" class="close"
                                                    @click="deleteMessageById(m.id)">
                                                    &times;
                                            </button>
                                        </h4>
                                    </div>
                                    <div :id="'am' + m.id" class="panel-collapse collapse">
                                        <div class="panel-body">{{ m.reply }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="not" class="tab-pane fade">
                            <div class="panel-group">
                                <div class="panel panel-default" v-for="m in this.notRepliedMessages">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a :href="'#nm' + m.id" data-toggle="collapse">
                                                {{ m.body }} by {{ m.author }} on {{ m.created }}
                                            </a>
                                            <button type="button" class="close"
                                                    @click="deleteMessageById(m.id)">
                                                    &times;
                                            </button>
                                        </h4>
                                    </div>
                                    <div :id="'nm' + m.id" class="panel-collapse collapse">
                                        <textarea class="form-control"
                                                  v-model="m.reply">
                                        </textarea>
                                        <p class="text-center" style="margin-top: 5px;">
                                            <button class="btn btn-success"
                                                    @click="replyMessageById(m.id, m.reply)">
                                                    Reply
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="did" class="tab-pane fade">
                            <div class="panel-group">
                                <div class="panel panel-default" v-for="m in this.didRepliedMessages">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a :href="'#dm' + m.id" data-toggle="collapse">
                                                {{ m.body }} by {{ m.author }} on {{ m.created }}
                                            </a>
                                            <button type="button" class="close"
                                                    @click="deleteMessageById(m.id)">
                                                    &times;
                                            </button>
                                        </h4>
                                    </div>
                                    <div :id="'dm' + m.id" class="panel-collapse collapse">
                                        <div class="panel-body">{{ m.reply }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-1">
                    <button class="btn btn-warning"
                            @click="updateMessageState">
                        <i class="glyphicon glyphicon-refresh"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    props: [],
    data: function() {
        return {
            allMessages: [],
        }
    },
    computed: {
        notRepliedMessages: function() {
            return this.allMessages.filter(m => !m.reply)
        },
        didRepliedMessages: function() {
            return this.allMessages.filter(m => !!m.reply)
        }
    },
    methods: {
        updateMessageState: function() {
            axios.get('/db/message')
            .then(res => {
                this.allMessages = res.data
            })
            .catch(console.log)
        },
        replyMessageById: function(mid, reply) {
            console.log(`message id : ${mid}, reply : ${reply}`)
            axios.put('/db/message/' + mid, { reply })
                .then(res => {
                    console.log(res.data)
                    this.updateMessageState()
                })
                .catch(console.log)
        },
        deleteMessageById: function(mid) {
            console.log('delete mid = ', mid)
            if(confirm('Are you sure to delete this message?')) {
                axios.delete('/db/message/' + mid)
                    .then(res => {
                        this.updateMessageState()
                    })
                    .catch(console.log)
            } else {
                // user cancel message deletion
            }            
        }
    },
    created() {
        this.updateMessageState()
    }
})

