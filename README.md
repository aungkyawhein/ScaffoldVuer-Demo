# A basic 3D model viewer

This is a simple demo app based on ScaffoldVuer developed in the ABI with additional controls.

The purpose of this app is to test out the rendering capabilities and features of ScaffoldVuer.

This app is developed using [VueJS version 2](https://v2.vuejs.org/) with user interface components from [elementUI](https://element.eleme.io/#/en-US).

This app has been compiled and tested with node version 12 and 14.

## Accessing information of the models dialog

The models dialog displays information of various 3D models and the information is accessed from a google spreadsheet. To gain access to the google spreadsheet using the API you are required to create credentials for a service account.
Further information that will help is available:
[create a service account](https://cloud.google.com/iam/docs/service-accounts-create) and [create credentials for a service account](https://developers.google.com/workspace/guides/create-credentials).

Once you have created credentials for a service account, you will have the private key and service email to access the spreadsheet.

The top level of your repository clone should contain a file named .env and in it you will find three environment variables - `VUE_APP_GOOGLE_PRIVATE_KEY`, `VUE_APP_GOOGLE_SERVICE_EMAIL` and `VUE_APP_GOOGLE_SPREADSHEET_ID`.
You should copy and paste the private key and service email to `VUE_APP_GOOGLE_PRIVATE_KEY` and `VUE_APP_GOOGLE_SERVICE_EMAIL`, respectively.

## Installing Node version 12 and 14 using VM

We recommand using Node Version Manager (NVM) to install different versions of node, the documentation for installing and using NVM can be found [here](https://github.com/nvm-sh/nvm). There are also many tutorials available.

## To run the app

```bash
npm install
npm run serve
```

## To test

```bash
npm run cypress:open
```

- Select "Component Testing"
- Select browser (Chrome)
- Click "ModelsTable" from specs
- Press "R" (or) "Run all tests" again (known issue)

## Known issues

The first run of the test will fail due to data loading. Still trying to intercept with mock data.
