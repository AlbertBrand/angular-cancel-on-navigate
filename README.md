# AngularJS angular-cancel-on-navigate module

Provides drop-in functionality that cancels HTTP requests when
the browser's location is changed.

## Installation

Prerequisites: an existing AngularJS project of course.

Using Bower:

```sh
bower install -S angular-cancel-on-navigate
```

Or, manually download `build/angularCancelOnNavigateModule.js` (or the
minified version) and place it somewhere in your project.

Then, add the script include in your HTML which of course should point to the right location:

```html
<script src="../bower_components/angular-cancel-on-navigate/build/angularCancelOnNavigateModule.js"></script>
```

Add the module dependency to the main app module declaration:

```js
angular
  .module('myApp', [
    ...
    'angularCancelOnNavigateModule'
  ])
```

## Configuration

When the module is included, all $http requests are automatically intercepted and
a cancel promise is registered when the request its timeout is not specified
explicitly. If you want to exclude certain $http calls from this behavior,
either provide an explicit timeout, or set the `noCancelOnRouteChange` property
to `true` in the $http options.
