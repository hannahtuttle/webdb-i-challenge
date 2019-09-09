const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    db('accounts').select('*')
    .then(accounts => {
        res.status(200).json(accounts)
    }).catch(err => {
        res.json(err)
    })
})

server.get('/:id', (req, res) => {
    // select * from posts where id = 2
    const {id} = req.params
    db('accounts').where({id}) //always returns an array
    .first() //picks the first element of the resulting array
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        res.json(err)
    })

});

server.post('/', (req, res) => {
    // insert into posts (fields) values ()
    const accountsData = req.body
    // validate the data before inserting into db

    db('accounts').insert(accountsData, 'id')
    .then(([id]) => {
        db('accounts').where({id}) //always returns an array
        .first() //picks the first element of the resulting array
        .then(account => {
            res.status(200).json(account)
        })
    })
    .catch(err => {
        res.json(err)
    })
});

module.exports = server;