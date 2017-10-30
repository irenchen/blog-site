var componentMyPage1 = Vue.component('my-page-2', {
    template: `
        <div class="container row" style="height:300px;">
            <h3 class="text-center">歡迎提出問題</h3>
        </div>
    `,
    props: [],
    data: function() {
        return {
            title: 'Welcome',
            img1: ''
        }
    }
})

