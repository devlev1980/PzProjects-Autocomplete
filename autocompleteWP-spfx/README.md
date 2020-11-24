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
1.0|October 19, 2020|Initial version

## Technology versions used
* Angular -
Angular CLI: 8.2.2;
Typescript                   3.4.5
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
*Search profile by first name,last name or full name and highlight the search result in autocomplete         
* Angular Elements
* Using `@angular/material` A collection of UI Components
     Angular Material is a UI component library for Angular 2+/Angular JS
     developers. Angular Material components help in constructing
     attractive, consistent, and functional web pages and web
     applications while adhering to modern web design principles like
     browser portability, device independence, and graceful degradation.
     
     Main Website: https://material.angular.io/
