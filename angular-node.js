/**
 * @module ngNode
 * @description $node service maintains and provides reference to DOM
 * elements in your templates.
 */
angular.module('ngNode', []);


/**
 * @name $node
 * @description The $node service. Keeps and maintains registry, conforming to
 * scope lifecycle.
 */
angular.module('ngNode').service('$node', function() {
    return {
        /**
         * @description Register an element on the $node service
         * @param name {String} Key that references the node in the template
         * @param element {angular.element} DOM Node wrapped in jQLite
         * @private
         */
        _registerElement: function(name, element) {
            this[name] = element;
        },

        /**
         * @description Removes an element from the owned properties
         * @param name {String} Key represeting DOM Node
         * @private
         */
        _unregisterElement: function(name) {
            delete this[name];
        }
    };
});

/**
 * @name ng-node
 * @description Directive used to bind DOM Nodes to the service
 */
angular.module('ngNode').directive('ngNode', ['$node', function($node) {
    return {
        restrict: 'A',

        link: function(scope, elem, attr) {
            $node._registerElement(attr.ngNode, elem);
            scope.$on('$destroy', function() {
                $node._unregisterElement(attr.ngNode);
            });
        }
    }
}]);

