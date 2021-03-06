(function(m) {
    /**
     * @module ngNode
     * @description $node service maintains and provides reference to DOM
     * elements in your templates.
     */
    m('ngNode', []);


    /**
     * @name $node
     * @description The $node service. Keeps and maintains registry, conforming to
     * scope lifecycle.
     */
    m('ngNode').service('$node', function() {
        return {
            /**
             * @description Register an element on the $node service
             * @param name {String} Key that references the node in the template
             * @param element {angular.element} DOM Node wrapped in jQLite
             * @private
             */
            _register: function(name, element) {
                this[name] = element;
            },

            /**
             * @description Removes an element from the owned properties
             * @param name {String} Key represeting DOM Node
             * @private
             */
            _unregister: function(name) {
                delete this[name];
            }
        };
    });

    /**
     * @name ng-node
     * @description Directive used to bind DOM Nodes to the service
     */
    m('ngNode').directive('ngNode', ['$node', function($node) {
        return {
            restrict: 'A',
            priority: 999, // ng-repeat goes first at 1,000
            link: function(scope, elem, attr) {
                $node._register(attr.ngNode, elem);
                scope.$on('$destroy', function() {
                    $node._unregister(attr.ngNode);
                });
            }
        }
    }]);
})(angular.module);
