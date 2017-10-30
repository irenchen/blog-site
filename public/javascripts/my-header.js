var componentMyHeader = Vue.component('my-header', {
    template: `
        <header>
            <img src="images/landmark1.jpg" class="img-responsive">
        </header>
    `,
    props: [],
    data: function() {
        return {
            title: 'Welcome',
            img1: ''
        }
    }
})

