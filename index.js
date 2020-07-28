const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc.js");
const cryptoRandomString = require('crypto-random-string');
const {
    addUsers,
    getUserByEmail,
    addResetCode,
    getCode,
    newPassword,
    getUser
} = require('./db');
const { sendEmail } = require('./src/ses');
const { getVideos } = require("./src/yt")
app.use(compression());


app.use(
    cookieSession({
        secret: `I'm always angry`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
app.use(express.static("public"));

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


////////////////routes/////////////////////

app.get('/welcome', (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.post("/register", (req, res) => {
    const firstname = req.body.first;
    const lastname = req.body.last;
    const email = req.body.email;
    const password = req.body.password;

    hash(password)
        .then((hashedPw) => {
            addUsers(firstname, lastname, email, hashedPw)
                .then((result) => {
                    req.session.userId = result.rows[0].id;
                    res.json();
                }).catch((err) => {
                    res.json();
                    console.log("error in POST /register: ", err);
                });
        })
        .catch((err) => {
            res.json();
            console.log("error in POST /register: ", err);

        });
});


app.get("/login", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.render("login");
    }
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    getUserByEmail(email).then((result) => {
        compare(password, result.rows[0].password)
            .then((match) => {
                if (match) {
                    req.session.userId = result.rows[0].id;
                    res.redirect("/");
                } else {
                    res.render("login", { error: true });
                }
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    })
        .catch((err) => {
            console.log(err);

            res.sendStatus(500);
        });
});

app.get('/logout', (req, res) => {
    req.session.userId = null;
    res.redirect('/');
});


app.post("/resetPassword/start", (req, res) => {
    const email = req.body.email;

    getUserByEmail(email).then((result) => {
        if (result.rows.length > 0) {
            const secretCode = cryptoRandomString({
                length: 6
            });
            addResetCode(email, secretCode)
                .then((result) => {
                    console.log('result in add Reset COde', result);

                    sendEmail(email,
                        `code to reset password: ${secretCode}`,
                        'reset password')
                        .then(() => {
                            res.json();
                        })
                        .catch((err) => {
                            console.log('err in /password/reset/start', err);
                            res.sendStatus(500);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(400);
        }
    })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});


app.post("/resetPassword/verify", (req, res) => {
    const email = req.body.email;
    const newPass = req.body.newPassword;
    const secretCode = req.body.secretCode;

    getCode(email, secretCode).then((result) => {
        if (result.rows.length > 0) {
            hash(newPass)
                .then((hashedPassword) => {
                    newPassword(email, hashedPassword);
                    console.log('result in /password/reset/verify :', result);
                    res.json();
                })
                .catch((err) => {
                    res.json();
                    console.log("error in POST /register: ", err);
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(400);
        }
    })
        .catch((err) => {
            console.log("error in POST /register: ", err);
            res.sendStatus(500);
        });
});

app.get('/user', (req, res) => {

    getUser(req.session.userId)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log('err in get /user:', err);
        });
});

app.get('/videos', (req, res) => {

    getVideos("mindfulness")
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json();
            console.log("error in get videos: ", err);
            res.sendStatus(500);

        })

});

app.get('*', function (req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }

});

app.listen(8080, function () {
    console.log("I'm listening.");
});
