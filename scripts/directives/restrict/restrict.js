'use strict';


angular.module('sbAdminApp')
	.directive('restrict', restrict);

  restrict.$inject = ['Autenticacao'];

   function restrict(Autenticacao) {
    return {
        restrict: 'A',
        priority: 100000,
        scope: false,
        link: function() { console.log('linkFunc')},
        compile: function(element, attr, linker) {
          var accessDenied = true;
    			var user = Autenticacao.getLocalUser();

    			var attributes = attr.access.split(" ");
    			for(var i in attributes){
    				if(user.nivel_acesso == attributes[i]){
    					accessDenied = false;
    				}
    			}
          if(accessDenied){
		        element.children().remove();
            element.remove();
	        }
        }
    }
  };
