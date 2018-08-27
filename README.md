## Vue, Vuex & Firebase app

Work in progress. Forum example app built with [Vue](https://vuejs.org/),[Vue CLI](https://github.com/vuejs/vue-cli),  [Vuex](https://vuex.vuejs.org/) and [Firebase](https://firebase.google.com/) backend.


### Requirements

Node.js
Yarn

Firebase account with keys. [Get it here](https://firebase.google.com/)

```bash
  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);
```
   
### Install

1. Clone this repository:

2. `cd` into repository

3. Install dependencies 

```bash
yarn install
```

## How to use

1. Develop

```bash
yarn dev
```

2. Build for production

```bash
yarn build
```

### Live demo

[Click here](https://vue-forum-firebase.netlify.com/)
