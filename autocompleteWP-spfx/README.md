## external-sharing

## Summary
This Development shows how to create Custom autocomplete using `Angular elements and @pnp/spfx` package.

## Solution

Solution|Author(s)
--------|---------
External-Sharing | PzProjects

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 03, 2020|Initial version

## Technology versions used
* Angular -
Angular CLI: 7.0.7;
Typescript                   2.4.2
Webpack                      3.6.0

* Node.js- v10.22.0
* Gulp-
 CLI version: 2.3.0
 Local version: 3.9.1
* Npm- 6.14.8

## Set your environment

Please follow this guide in order to set up your SharePoint Framework development environment:
[SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)

## Preparations

* Build you webpart with 'npm run bundle' command in Angular Project (autocompleteWP)
* 
-

## Debug

- First you need to set the url of the required document library:
  Go to "serve.json" under the folder "config" and change "pageUrl" to the required document library url
  This step is not mandatory when the relevant document library remain the same!
- Move to folder where this readme exists
- In the command line run:
  - `npm install`
  - `gulp trust-dev-cert`
  - `gulp serve`

## Deploy

- Move to folder where this readme exists
- In the command line run:
  - `gulp serve --nobrowser`
  - `gulp clean`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Upload .sppkg file from sharepoint\solution to your tenant App Catalog
  E.g.: https://<tenant>.sharepoint.com/sites/AppCatalog/AppCatalog
- Only on the first upload: you need to approve Graph API request in the office365 admin center:
  office365 admin >>> Advanced (right pannel) >>> Api access 

## Features

This project contains SharePoint Framework extensions that illustrates next features:
* Command extension
  [ListView Command Set](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/building-simple-cmdset-with-dialog-api)
* Custom dialog control using `@microsoft/sp-dialog` package
* Using @pnp/sp
* Using Microsoft Graph API
  [Consume Microsoft Graph](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial)
* React
* Using `@fluentui/react` A collection of UX frameworks
  Fluent UI React is the official open-source React front-end framework designed to build experiences that fit seamlessly into a broad range of Microsoft products.
  [fluentui](https://developer.microsoft.com/en-us/fluentui#/get-started)
