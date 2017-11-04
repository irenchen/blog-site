const assert = require('assert')
const axios = require('axios')

describe('db api', function() {
    describe('articles', function() {
        it('should return all articles', function() {
            return axios.get(`http://localhost:3000/db/article`)
                        .then(res => {
                            assert.equal(11, res.data.length)
                        })        
        })
        it('should return articles in date range', function() {
            let start = '2017-11-02'
            let stop = '2017-11-02'
            return axios.get('http://localhost:3000/db/article/range/' + start + '/' + stop)
                        .then(res => {
                            assert.equal(4, res.data.length)
                        })
        })
    })

    describe('messages', function() {
        it('should return not-replied messages', function() {
            return axios.get('http://localhost:3000/db/message/not/replied')
                        .then(res => {
                            assert.equal(1, res.data.length)
                        })
        })
        it('should return did-replied messages', function() {
            return axios.get('http://localhost:3000/db/message/did/replied')
                        .then(res => {
                            assert.equal(0, res.data.length)
                        })
        })
        it('whould return messages belong to aid = 11', function() {
            return axios.get('http://localhost:3000/db/message/11')
                        .then(res => {
                            assert.equal(1, res.data.length)
                        })
        })
    })

})

