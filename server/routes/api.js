const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/ip', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/getAllDNS', (req, res) => {
    connection((db) => {
        db.collection('bindings')
            .find()
            .toArray()
            .then((allDNS) => {
                response.data = allDNS;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

//Get one user  
router.get('/users/:name',(req, res) => {
    console.log('hit find a person in api.js')
    connection((db => {
        db.collection('users')
        .find({'name': req.params.name})
        .then((users) => {
            res.users
        })
        .catch((err) => {
            sendError(err, res);
        });
    }));
});

//Get one user by _id 
router.get('/userss/:_id',(req, res) => {
    console.log('hit find a person with _id in api.js')
    console.log(req.params._id);
    connection((db => {
        db.collection('users')
        .findOne({_id: new ObjectID(req.params._id)})
        .then((users) => {
            console.log(users.name);
            res.json(user)
        })
    }));
});

//Add new data
router.post('/addUser', (req, res) => {
    console.log(req.body.name);
    connection((db) => {
    db.collection('users')
        .insertOne({"name":req.body.name})
    .then(console.log('success'))
    .catch((err) => {
        sendError(err, res);
    });
});
});

//add new DNS
router.post('/addDNS', (req, res) => {
    console.log(req.body.subdomain);
    console.log(req.body.primaryip);
    console.log(req.body.remark);

    connection((db) => {
    db.collection('bindings')
        .insertOne({"subdomain":req.body.subdomain, "primaryip": req.body.primaryip, "remark": req.body.remark})
    .then(console.log('success'))
    .catch((err) => {
        sendError(err, res);
    });
});
});

//update DNS
router.put('/updateDNS', (req, res) => {
    //show _id
    console.log("in api.js=====")
    connection((db) => {
        db.collection('bindings')
        .updateOne({'subdomain': req.body.prev_subdomain}, {$set: {'subdomain': req.body.subdomain}},
        {'primaryip': req.body.prev_primaryip}, {$set: {'primaryip': req.body.primaryip}},
        {'remark': req.body.prev_remark}, {$set: {'remark': req.body.remark}})
        .then(console.log('success'))    
        .catch((err) => {
                sendError(err, res);
            });
    });
});

router.delete('/deleteDNS/:_id', (req, res) => {
    //show _id
    
    console.log(ObjectID(req.params._id))
    console.log(new ObjectID(req.params._id))
    connection((db) => {
        db.collection('bindings')
        .remove({_id: new ObjectID(req.params._id)})
        .catch((err) => {
            sendError(err, res);
        });
    });
});

//delete one user 
router.delete('/deleteUser/:_id', (req, res) => {
    //show _id
    
    console.log(ObjectID(req.params._id))
    console.log(new ObjectID(req.params._id))
    connection((db) => {
        db.collection('users')
        .remove({_id: new ObjectID(req.params._id)})
        .then(console.log('deteled jane success'))
        .catch((err) => {
            sendError(err, res);
        });
    });
});


//update user data
router.put('/updateUser', (req, res) => {
    //show _id
    console.log("in api.js=====")
    console.log(req.body.name);
    console.log(req.body.prev_name);
    connection((db) => {
        db.collection('users')
        .updateOne({'name': req.body.prev_name}, {$set: {'name': req.body.name}})
        .then(console.log('success'))    
        .catch((err) => {
                sendError(err, res);
            });
    });
});



module.exports = router;