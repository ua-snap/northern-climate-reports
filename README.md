# iem-webapp

## Build setup

### Install dependencies

```bash
$ npm install
```

### Set environment variables if necessary

The following environment variables can be set to change the API and map service
endpoints.

| Environment Variable | Default                                 |
| -------------------- | --------------------------------------- |
| GEOSERVER_URL        | https://gs.mapventure.org/geoserver/wms |
| RASDAMAN_URL         | https://zeus.snap.uaf.edu/rasdaman/ows  |
| SNAP_API_URL         | https://earthmaps.io                    |

### Run locally in development mode

```
# serve with hot reload at localhost:3000
$ npm run dev
```

### Build for production and deploy to AWS S3 bucket

Set environment variables if necessary, then:

```
$ npm run generate
$ aws s3 cp dist s3://northernclimatereports.org/ --acl public-read --recursive
```

You will also need to invalidate the CloudFront cache for northernclimatereports.org

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
