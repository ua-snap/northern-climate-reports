# iem-webapp

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Run in Elastic Beakstalk

Ensure that nuxt.config.js has target: 'server'.

```bash
# Create a new EB instance
$ eb init # Go for defaults
$ eb create

# Once this has run, open application
$ eb open
```

## Redeploy in Elastic Beanstalk
```bash
$ eb deploy
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
