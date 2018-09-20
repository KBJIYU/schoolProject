var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/user');
var CSEvent = require('../models/event');
var ObjectID = require('mongodb').ObjectID;
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

if (!web3.isConnected()) {

    // show some dialog to ask the user to start a node

} else {

    // start web3 filters, calls, etc

    // FOR TESTING
    console.log('/////////////////////////////////for testing//////////////////////////////////////')

    // toHEX
    var str = web3.toHex({ test: 'test' });
    console.log(str); // '0x7b2274657374223a2274657374227d'

    // CHECK IF ADDRESS
    var isAddress = web3.isAddress("0x8888f1f195afa192cfee860698584c030f4c9db1");
    console.log(isAddress); // true

    // PEER COUNT
    var peerCount = web3.net.peerCount;
    console.log(peerCount); // 0 .....

    // set default account
    //var defaultAccount = web3.eth.defaultAccount;
    //console.log(defaultAccount); // ''

    // GET BALANCE FROM ADDRESS
    var balance = web3.eth.getBalance("0x8fd723bcff5680fc903bf6d7045995a992dfc920");
    console.log(balance); // instanceof BigNumber
    console.log(balance.toString(10)); // '1000000000000'
    console.log(balance.toNumber()); // 1000000000000

    //GET BLOCK INFO
    var info = web3.eth.getBlock(300);
    console.log(info);

    //Get the numbers of transactions sent from this address.
    var number = web3.eth.getTransactionCount("0x8fd723bcff5680fc903bf6d7045995a992dfc920");
    console.log(number); // 1


    // FOR TESTING
    console.log('/////////////////////////////////end testing//////////////////////////////////////')
}

// GET home page.
router.get('/', function(req, res, next) {
    var version = web3.version.api;
    console.log(version); // "0.2.0"
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    return res.redirect('/login');
                } else {
                    csevents = mongoose.model('CSEvent');
                    csevents.find({}, {}, function(e, docs) { res.render('index', { "cseventlist": docs }); });
                }
            }
        });
});

// GET register page 
router.get('/register', function(req, res, next) {
    res.render('register')
})

// POST resgister page
router.post('/register', function(req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('密碼不正確,請回上一頁重新輸入');
        err.status = 400;
        res.send('密碼不正確,請回上一頁重新輸入');
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {


        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        }

        //create in mongodb
        User.create(userData, function(error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });


    } else {
        var err = new Error('請確認所有欄位已正確填入');
        err.status = 400;
        return next(err);
    }
})

// GET login page 
router.get('/login', function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    return res.render('login')
                } else {
                    res.render('alreadylogin', { userwho: user.username })
                }
            }
        });
})

// POST login page
router.post('/login', function(req, res, next) {
    if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
            if (error || !user) {
                var err = new Error('登入帳號 或 密碼 輸入錯誤');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    } else {
        var err = new Error('請確認所有欄位已正確填入');
        err.status = 400;
        return next(err);
    }
})

// GET alreadylogin page
router.get('/alreadylogin', function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    return res.redirect('/notyetlogin');
                } else {
                    res.render('alreadylogin', { userwho: user.username })
                }
            }
        });
})

// GET notyetlogin page
router.get('/notyetlogin', function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    res.render('notyetlogin')
                } else {
                    res.redirect('/alreadylogin')
                }
            }
        });
})

// GET profile page
router.get('/profile', function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    return res.redirect('/notyetlogin');
                } else {
                    // res.render('profile', { urid: user.username, urmail: user.email });
                    res.render('profile', { urid: user.username, urmail: user.email, urcreate: user.eventcreate, urpair: user.eventpair })
                        // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + user.password + '<br><a type="button" href="/logout">Logout</a>')
                }
            }
        });
});

// GET logout logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                res.render('logout')
            }
        });
    }
});

// EVENT
// GET createevent page
router.get('/createevent', function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    return res.redirect('/notyetlogin');
                } else {
                    res.render('createevent');
                }
            }
        });
});

// POST createevent page
router.post('/createevent', function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    return res.redirect('/notyetlogin');
                } else {
                    if (req.body.eventtype &&
                        req.body.eventpeople &&
                        req.body.eventpoint &&
                        req.body.eventtime) {
                        console.log('aaaa11');
                        var eventData = {
                            eventtype: req.body.eventtype,
                            eventpeople: req.body.eventpeople,
                            eventpoint: req.body.eventpoint,
                            eventtime: req.body.eventtime,
                            eventcreator: user.username
                        }
                        var n = new CSEvent();
                        n.eventtype = req.body.eventtype;
                        n.eventpeople = req.body.eventpeople;
                        n.eventpoint = req.body.eventpoint;
                        n.eventtime = req.body.eventtime;
                        n.eventcreator = user.username;
                        n.eventstate = '1'; //預設1 進行中
                        n.eventpaircount = 0; //預設0 尚未有人參加)
                        // console.log(n);

                        n.save(function(err, eev) {
                            if (err) return console.error(err);
                            console.log(eev);
                            User.update({ "username": eev.eventcreator }, {
                                $addToSet: { eventcreate: eev.id }
                            }).exec(function(err, r) {
                                console.log('fuccccc', r)
                            })
                        });
                        console.log('aaaa33');
                        return res.redirect('/');

                    } else {
                        var err = new Error('請確認所有欄位已正確填入');
                        err.status = 400;
                        return next(err);
                    }
                }
            }
        });
})

// GET creatorprofile page
router.get('/creatorprofile/:creatorname', function(req, res, next) {
    var whoname = req.params.creatorname;
    console.log(whoname);
    users = mongoose.model('User');
    users.findOne({ "username": whoname }, function(e, docs) { res.render('creatorprofile', { "creatorinfo": docs }) })

})

// GET eventinfo page
router.get('/eventinfo/:id', function(req, res, next) {
    // var ObjectID = require('mongodb').ObjectID;
    // var eventId = new ObjectID(req.params.word);
    var objectId = mongoose.Types.ObjectId(req.params.id);
    csevents = mongoose.model('CSEvent');
    console.log(typeof(req.params.id));
    console.log(typeof(objectId));
    csevents.findOne({ "_id": objectId }, function(e, docs) { res.render('eventinfo', { "cseventinfo": docs }) });
})

// POST pair action request
router.post('/eventinfo/:id', function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    return res.redirect('/notyetlogin');
                } else {
                    // get event collections
                    var objectId = mongoose.Types.ObjectId(req.params.id);
                    csevents = mongoose.model('CSEvent');
                    console.log(typeof(req.params.id));
                    console.log(typeof(objectId));
                    // find and modify
                    csevents.findOne({ "_id": objectId }, function(e, docs) {
                        console.log(docs)

                        // check state == '1'
                        if (docs.eventstate == '1') {
                            console.log('state=', docs.eventstate, '目前參與人數=', docs.eventpaircount, '/', docs.eventpeople, '可配對');

                            // eventpaircount 
                            tempCount = docs.eventpaircount += 1;
                            docs.update({
                                $set: { eventpaircount: tempCount }
                            }).exec(function(err, r) {
                                console.log('pair數字更新成功', r)
                            });

                            // eventpairusername  
                            docs.update({
                                $addToSet: { eventpairusername: user.username }
                            }).exec(function(err, r) {
                                console.log('名單人加入成功', r)
                            });

                            // user.pairlist
                            console.log(user, 'dasdasdass');
                            user.update({
                                $addToSet: { eventpair: docs._id }
                            }).exec(function(err, r) {
                                console.log(user.eventpair)
                            });
                            // re-CHECK state
                            if (docs.eventpaircount == docs.eventpeople) {
                                docs.update({
                                    $set: { eventstate: '2' }
                                }).exec(function(err, r) {
                                    console.log('因為人數', docs.eventpaircount, docs.eventpeople, '狀態更改', r);
                                });
                            } else {
                                console.log('狀態沒變,人數未滿 ');
                                res.render('pairstate', { pairResult: '恭喜，配對成功。!' });
                            }
                        }
                        // state == '2'
                        else {
                            console.log('sorry its end.')
                            res.render('pairstate', { pairResult: '抱歉，配對失敗。此配對已完結。' });
                        }
                    });

                }
            }
        });
})


// POST pair action request
// router.get
/*
1.抓取 申請配對者之 user.username   req.session.userId
2.讀取 現在state 是否ok(=1) 
    if eventstate == 1  
        > 將配對者a之id加入該事件之 eventpairusername
        > 將該事件eventpaircount + 1 
        > 將該事件之id 加入 user之pairlist
        > 檢測 eventpaircount 是否 == eventpeople 
            > if yes
                > 更改該事件 eventstate = 2(已完成)
    else 
        > 則跳至"事件已額滿"頁面。



*/
module.exports = router;