var componentMyHeader = Vue.component('my-header', {
    template: `
        <header>
            <img src="/images/landmark1.jpg" class="img-responsive" style="margin: 0 auto;">
        </header>
    `,
    props: [],
    data: function() {
        return {
            title: 'Welcome',
        }
    }
})

