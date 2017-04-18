var _ = require('lodash')
var lionRouter = require('express').Router()

var lions = []
var id = 0

var updateID = function(req, res, next){
    id++
    req.body.id = id + ''
    console.log('----------------------------- ' + req.body.id )
    next()
}

lionRouter.param('id', function(req, res, next, id){
    var lion = _.find(lions, {id : id})
    if(lion){
        req.lion = lion
        next()
    }
    else{
        res.send()
    }
})

lionRouter.route('/')
    .get(function(req, res){
         console.log('----------------------------- ' )
        res.send(lions)
    })
    .post(updateID, function(req, res){
        var lion = req.body
        lions.push(lion)
        res.json(lion)
    })

lionRouter.route('/:id')
    .get(function(req, res){
        res.json(req.lion || {})
    })
    .put(function(req, res){
        var update = req.body
        if(update.id){
            delete update.id
        }
        var lionIndex = _.findIndex(lions, {id : req.params.id})
         if(!lions[lionIndex]){
             res.send()
         }else{
             var updateLion = _.assign(lions[lionIndex], update)
             res.json(updateLion)
         }
    })
    .delete(function(req, res){
        var toDelete = _.find(lions, {id: req.params.id})
        // TODO Some delete operation from the array
        res.json(toDelete)
    })

    module.exports = lionRouter