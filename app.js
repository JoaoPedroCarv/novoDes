const express = require('express');
const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const app = express();
const { getFirestore, doc, getDoc } = require('firebase/firestore');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var firebaseConfig = {
    apiKey: "AIzaSyDxFj_u6oeefWKIMB99fMxI8pIGCX-jU9Q",
    authDomain: "autenticacao-40a42.firebaseapp.com",
    projectId: "autenticacao-40a42",
    storageBucket: "autenticacao-40a42.appspot.com",
    messagingSenderId: "429285039421",
    appId: "1:429285039421:web:170656ebd6c2007d347954"
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', async (req, res) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
        console.log(userCredential); // Adicione esta linha
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
    }
});


app.get('/home', (req, res) => {
    const user = auth.currentUser;
    const db = getFirestore(firebaseApp);
    const noticiaDocRef = doc(db, 'noticia');
    console.log(user); // Adicione esta linha
    if (user) {
        res.render('home', { user: user });
        res.render('home', {noticiaDocRef: noticiaDocRef})
    } else {
        res.redirect('/');
    }
});


app.listen(3000, () => console.log('Server started on port 3000'));
