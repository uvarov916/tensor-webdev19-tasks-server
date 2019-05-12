const Session = require('../models/session.model.js');
const uniqid = require('uniqid');

exports.getUsername = (sessionId) => {
    return new Promise((resolve, reject) => {
        Session.findOne({ sessionId })
            .then((doc) => {
                resolve(doc.username);
            }).catch(err => {
                reject(err);
            });
    });
}

exports.create = (username) => {
    const sessionId = uniqid();
    const session = new Session({ sessionId, username });

    return new Promise((resolve, reject) => {
        session.save()
            .then(() => {
                resolve(sessionId);
            }).catch(err => {
                reject(err);
            });
    });
}

exports.delete = (sessionId) => {
    return new Promise((resolve, reject) => {
        Session.deleteOne({ sessionId })
            .then(() => {
                resolve(sessionId);
            })
            .catch(err => {
                reject(err);
            })
    });
}