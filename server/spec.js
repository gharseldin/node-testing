var app = require('./server')

// supertest is doing the http tests
// chai is doing the assertions and all
// both are running against mocha not node
var request = require('supertest')
var chai = require('chai').expect 



describe('[LIONS]', function(){
    it('should GET all Lions', function(done){
        request(app)
            .get('/lions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp){
                chai(resp.body).to.be.an('array')
                done()
            })
    })

    it('should create a lion', function(done){

        var lion = {
                name: 'Simba',
                age: 14,
                group: 'Lion King',
                gender: 'male'
            }

        request(app)
            .post('/lions')
            .send(lion)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, resp){
                chai(resp.body).to.be.an('object')
                done()
            })
    })

    it('should delete a lion', function(done){

        var lion = {
            name: 'Simba',
            age: 14,
            group: 'Lion King',
            gender: 'male'
        }

        request(app)
            .post('/lions')
            .send(lion)
            .set('Accept', 'application/json')
            .end(function(err, resp){
                var respLion = resp.body
                request(app)
                    .delete('/lions/'+ respLion.id)
                    .end(function(err, resp){
                        chai(resp.body).to.eql(respLion)
                        done()
                    })
            })
    })

        it('should update a lion', function(done){

        var lion = {
            name: 'Simba',
            age: 14,
            group: 'Lion King',
            gender: 'male'
        }

        request(app)
            .post('/lions')
            .send(lion)
            .set('Accept', 'application/json')
            .end(function(err, resp){
                var respLion = resp.body
                request(app)
                    .put('/lions/'+ respLion.id)
                    .send({
                        name: 'new name'
                    })
                    .end(function(err, resp){
                        chai(resp.body.name).to.equal('new name')
                        done()
                    })
            })
    })
})