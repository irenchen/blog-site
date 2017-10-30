var componentMyNav = Vue.component('my-nav', {
    template: `
        <nav class="navbar navbar-default ">
            <div class="container-fluid">
                
                <div class="navbar-header">          
                    <a class="navbar-brand" 
                       href=""
                       @click="$emit('show-home-page')">                        
                        <span><img :src="logo" width="20">日本文化交流小站</span>
                    </a>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <li v-bind:class="{active: active == 1}"
                        v-on:click="showPage(1)"
                    ><a href="#">文章分享</a></li>
                    <li v-bind:class="{active: active == 2}"
                        v-on:click="showPage(2)"
                    ><a href="#">問與答</a></li>
                    <li v-bind:class="{active: active == 3}"
                        v-on:click="showPage(3)"
                    ><a href="#">口譯/筆譯服務</a></li>
                </ul>
            </div>
        </nav>
    `,
    props: [],
    data: function() {
        return {
            active: 1,
            logo: 'images/logo.png'
        }
    },
    methods: {
        showPage(i) {
            // console.log('show page ', i)
            this.active = i
            // bus.$emit('change-page', i)
            this.$emit('change-page', i)
        }
    }
})

