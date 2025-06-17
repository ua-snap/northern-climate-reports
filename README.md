# Northern Climate Reports

A tool for presenting complex climate data in a format that is useful for rightsholders, stakeholders and land managers.

## Initial setup

### Install dependencies

Install nvm on your workstation if you have not already:

https://github.com/nvm-sh/nvm

Then run:

```bash
$ nvm use lts/fermium
$ npm install
```

### Enable website hosting on the AWS S3 bucket:

**_The following command should be run only during the initial setup of the S3
bucket. Do not run this command again or it will wipe out the S3 website
redirection rules._**

```
aws s3 website s3://northernclimatereports.org/ --index-document index.html --error-document index.html
```

### Add website redirection rules to S3 bucket

Website redirection rules need to be added to the S3 bucket for data to hydrate
properly when a report is referenced directly by its URL (permalink).

From the AWS web interface for the S3 bucket, go to:

Properties → Static website hosting → Edit

In the "Redirection rules" text area, add the following:

```
[
    {
        "Condition": {
            "HttpErrorCodeReturnedEquals": "404"
        },
        "Redirect": {
            "HostName": "northernclimatereports.org",
            "Protocol": "https",
            "ReplaceKeyPrefixWith": "#!/"
        }
    },
    {
        "Condition": {
            "HttpErrorCodeReturnedEquals": "403"
        },
        "Redirect": {
            "HostName": "northernclimatereports.org",
            "Protocol": "https",
            "ReplaceKeyPrefixWith": "#!/"
        }
    }
]
```

Code in `components/App.vue` catches and routes these redirects into fully
hydrated report pages.

## Development

### Set environment variables if necessary

The following environment variables can be set to change the API and map service
endpoints:

| Environment variable | Default                                |
| -------------------- | -------------------------------------- |
| GEOSERVER_URL        | https://gs.earthmaps.io/geoserver      |
| RASDAMAN_URL         | https://zeus.snap.uaf.edu/rasdaman/ows |
| SNAP_API_URL         | https://earthmaps.io                   |

### Run locally in development mode

Serve with hot reload at http://localhost:3000:

```
$ npm run dev
```

### Playwright tests

To run the Playwright tests for this webapp, set any necesary environment variables, then run the webapp:

```
npm run dev
```

Make sure the local webapp is running as expected. Then, in another terminal window, run the following

```
npx playwright install # Install Playwright browsers
npx playwright test --ui
```

## Deployment

Set environment variables if necessary, then run:

```
$ npm run generate
$ aws s3 cp dist s3://northernclimatereports.org/ --acl public-read --recursive
```

You will also need to invalidate the CloudFront cache for
northernclimatereports.org. Find the distribution for northernclimatereports.org
in the AWS CloudFront web interface, then go to:

Invalidations → Create invalidation

Use the following CLI command:

```
aws cloudfront create-invalidation --distribution_id EZEXS6RHS812M --paths "/*"
```

For detailed explanation on how things work, check out
[Nuxt.js docs](https://nuxtjs.org).
