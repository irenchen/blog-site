var componentMyFooter = Vue.component('my-footer', {
    template: `
        <footer class="well" style="margin-bottom:0px;">
            <div class="container row">
                <div class="col-sm-4 text-center">
                    <img :src="logo" width="30px">
                </div>
                <div class="col-sm-4 text-center">
                    <h5>&copy;2017-{{ new Date().getFullYear() }} copyright</h5>
                </div>
                <div class="col-sm-4 text-right">
                    <h5><a :href="'mailto:' + contact">{{ contact }}</a></h5>
                </div>
            
            </div>
        </footer>

    `,
    props: [],
    data: function() {
        return {
            contact: 'wonderfulyiting@hotmail.com',
            logo: 'images/logo.png',
        }
    }
})

