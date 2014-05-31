## ngNode
#### Lightweight directive helper service


Provides the $node helper service to directives for easy access to DOM Elements in their templates.

To use, add the `ng-node` attribute to the desired HTML Elements and pass the desired $node property name as value.
For example, using `ng-node="btnCancel` will make `$node.btnCancel` available on the service for the directive.

Improves mainainability and readibility.

__HTML__

```html
<my-directive>
  <button ng-node="btnHome">
    <label>Home</label>
  </button>
  
  <button ng-node="btnContact">
    <label>Contact</label>
  </button>
  
  <div class="output" ng-node="txtOutput"></div>
</my-directive>
```

__JS__

```js
angular.module('myModule', ['ngNode']);
angular.module('myModule').directive('myDirective', function($node) {
  /* ... */
  return {
    restrict: 'E',
    link: function() {
      $node.btnHome.on('click', goHome);
      $node.htnContact.on('click', showContact);
      $node.txtOutput.html('Hello world!');
    }
  }
});
```

WARNING: Do not use within controllers. DOM Manipulation should only be done in directives according to AngularJS best practices.
