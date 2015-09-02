(function() {

window.TabObjectScene = [0];

routeApp.directive('draggable', function() {
        return function(scope, element) {
            // this gives us the native JS object
            var el = element[0];
            console.log("drag");
            el.draggable = true;

            //Ajoute simplement la classe drag a l'objet
            //Met l'id dans un data transfert
            el.addEventListener(
                'dragstart',
                function(e) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('Text', this.id);
                    this.classList.add('drag');
                    //console.log("node.name");
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragend',
                function(e) {
                    this.classList.remove('drag');
                    return false;
                },
                false
            );
        }
    });
routeApp.directive('droppable', function() {
        return {
            scope: {
                drop: '&',
                //bin: '='
            },
            link: function(scope, element) {
                // again we need the native object
                var el = element[0];
                console.log("drop");
                el.addEventListener(
                    'dragover',
                    function(e) {
                        e.dataTransfer.dropEffect = 'move';
                        // allows us to drop
                        if (e.preventDefault) e.preventDefault();
                        this.classList.add('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'dragenter',
                    function(e) {
                        this.classList.add('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'dragleave',
                    function(e) {
                        this.classList.remove('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'drop',
                    function(e) {
                        // Stops some browsers from redirecting.
                        if (e.stopPropagation) e.stopPropagation();
                        if(e.preventDefault) { e.preventDefault(); }

                        this.classList.remove('over');


                        var binId = this.id;
                        var item = document.getElementById(e.dataTransfer.getData('Text'));
                        
                        if (this.childNodes.length==0) 
                            {
                                this.appendChild(item);
                                console.log('Coucou');
                                //split la chaine blue 2, blue 5
                                var CoulorObject = item.id.split(" ");
                                //recupere l'emplacement bin et j'emleve le bin
                                window.TabObjectScene[this.id.substr(3,4)-1]=CoulorObject[0];
                                //TabObjectScene.push(item.id.substr(4));
                                //TabObjectScene.reverse();
                                //console.log(CoulorObject[0]);
                                console.log(window.TabObjectScene);
                            
                        
                                //console.log(this.childNodes);
                                
                                

                                // call the passed drop function
                                scope.$apply(function(scope) {
                                    var fn = scope.drop();
                                    if ('undefined' !== typeof fn) {
                                        fn(item.id, binId);
                                    }
                                });
                        
                            }

                        return false;
                    },
                    false
                );
            }
        }
    });

}());