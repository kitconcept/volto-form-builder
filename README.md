# Volto project with addons example

This is a Volto project (using Volto 5.x.x) that shows how to deal with addons as
released packages (ie. released in an npm registry) or locally while developing them.

## Branches

Two branches are provided in this repo:

- usingreleasedpackage
- usingmrsdeveloper

## Example package

Both use an example package `volto-testaddon`, which is released:
https://www.npmjs.com/package/volto-testaddon

and you can find it on github:
https://github.com/sneridagh/volto-testaddon

It features a view `DummyView` that this project will use to override the `Document` View.

## Trying it out (both branches)

Install deps:
`yarn`

start the project:
`yarn start`

## Setup your own project

Take a look at the changes for how to setup your project to work with add-ons.

### Using a released package

https://github.com/collective/volto-example-project-addons/pull/1

### Using mrs-developer

https://github.com/collective/volto-example-project-addons/pull/2
