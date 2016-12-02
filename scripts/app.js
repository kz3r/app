'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application..
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        controller: 'NavController',
        controllerAs: 'vm',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad, $q){

                var promiseSbAdminApp = $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[

                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
			              'shared/genseqAutenticacao/autenticacaoService.js',
                    'components/genseqLogin/loginService.js',
                    'scripts/directives/restrict/restrict.js',
                    'shared/genseqNavegacao/navController.js',
                    'bower_components/snackbar/src/js/snackbar.js'
                    ]
                });

                var promiseToggleSwitch = $ocLazyLoad.load(                {
                    name:'toggle-switch',
                    files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                    ]
                });

                var promiseNgCookies = $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                });

                var promisesArray = [promiseSbAdminApp, promiseToggleSwitch, promiseNgCookies];
                return $q.all(promisesArray);
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad, $q) {
            var promiseSbAdminApp = $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'shared/genseqAutenticacao/autenticacaoService.js',
              'scripts/directives/restrict/restrict.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            });
            var promiseNgCookies = $ocLazyLoad.load(
            {
              name:'ngCookies',
              files:['bower_components/angular-cookies/angular-cookies.js']
            });
            var promiseNgStorage = $ocLazyLoad.load(
            {
              name:'ngStorage',
              files:['bower_components/ngstorage/ngStorage.js']
            });

            var promisesArray = [promiseSbAdminApp, promiseNgCookies, promiseNgStorage];
            return $q.all(promisesArray);
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'components/genseqLogin/login.html',
        url:'/login',
        controller:'LoginController',
        controllerAs:'vm',
        resolve: {
            loadMyFile:function($ocLazyLoad, $q) {
                var promiseSbAdminApp = $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                        'components/genseqLogin/loginService.js',
                        'shared/genseqAutenticacao/autenticacaoService.js',
                        'components/genseqLogin/loginController.js'
                    ]
                });
                var promiseNgCookies = $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                });
                var promiseNgStorage = $ocLazyLoad.load(
                {
                  name:'ngStorage',
                  files:['bower_components/ngstorage/ngStorage.js']
                });

                var promisesArray = [promiseSbAdminApp, promiseNgCookies, promiseNgStorage];
                return $q.all(promisesArray);
            }
        }
    })

    /* COMENTADO PORQUE NÃO ESTAMOS USANDO CHARTS
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            var  $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
    */
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
   <!-- GENSEQ ADDITIONS -->

    <!-- Modulo Serviços -->
    .state('dashboard.servicos',{
         templateUrl:'components/genseqServicos/servicos.html',
         url:'/servicos',
         controller:'ServicosController',
	       controllerAs:'vm',
         resolve: {
             loadMyFile:function($ocLazyLoad, $q) {
                 var promiseSbAdminApp = $ocLazyLoad.load({
                     name:'sbAdminApp',
                     files:[
                         'components/genseqServicos/servicosService.js',
                         'components/genseqServicos/servicosController.js',
                     ]
                 });

                 var promisesArray = [promiseSbAdminApp];
                 return $q.all(promisesArray);
             }
         }
     })

     <!-- Modulo Sistemas -->
     .state('dashboard.sistemas',{
          templateUrl:'components/genseqSistemas/sistemas.html',
          url:'/sistemas',
          controller:'SistemasController',
		  controllerAs:'vm',
          resolve: {
              loadMyFile:function($ocLazyLoad, $q) {
                  var promiseSbAdminApp = $ocLazyLoad.load({
                      name:'sbAdminApp',
                      files:[
                          'components/genseqSistemas/sistemasService.js',
                          'components/genseqSistemas/sistemasController.js',
                      ]
                  });

                  var promisesArray = [promiseSbAdminApp];
                  return $q.all(promisesArray);
              }
          }
      })

      <!-- Modulo Kit Deplecao -->
      .state('dashboard.kit_deplecao',{
           templateUrl:'components/genseqKitDeplecao/kit_deplecao.html',
           url:'/kit_deplecao',
           controller:'KitDeplecaoController',
		   controllerAs:'vm',
           resolve: {
               loadMyFile:function($ocLazyLoad, $q) {
                   var promiseSbAdminApp = $ocLazyLoad.load({
                       name:'sbAdminApp',
                       files:[
                           'components/genseqKitDeplecao/kitDeplecaoService.js',
                           'components/genseqKitDeplecao/kitDeplecaoController.js',
                       ]
                   });

                   var promisesArray = [promiseSbAdminApp];
                   return $q.all(promisesArray);
               }
           }
       })

		<!-- Modulo Instituicao -->
      .state('dashboard.instituicao',{
           templateUrl:'components/genseqInstituicao/instituicao.html',
           url:'/instituicao',
           controller:'InstituicaoController',
		   controllerAs:'vm',
           resolve: {
               loadMyFile:function($ocLazyLoad, $q) {
                   var promiseSbAdminApp = $ocLazyLoad.load({
                       name:'sbAdminApp',
                       files:[
                           'components/genseqInstituicao/instituicaoService.js',
                           'components/genseqInstituicao/instituicaoController.js',
                       ]
                   });

                   var promisesArray = [promiseSbAdminApp];
                   return $q.all(promisesArray);
               }
           }
       })
       <!-- Modulo Projetos -->
       .state('dashboard.projetos',{
            templateUrl:'components/genseqProjetos/projetos.html',
            url:'/projetos',
            controller:'ProjetosController',
	          controllerAs:'vm',
            resolve: {
                loadMyFile:function($ocLazyLoad, $q) {
                    var promiseSbAdminApp = $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
                  					'components/genseqProjetos/projetosController.js',
                            'components/genseqProjetos/projetosService.js',
                  					'components/genseqInstituicao/instituicaoService.js',
                  					'components/genseqUsuarios/usuariosService.js',
                        ]
                    });
        						var promiseNgStorage = $ocLazyLoad.load({
        							name:'ngStorage',
        							files:['bower_components/ngstorage/ngStorage.js']
                    });

                    var promisesArray = [promiseSbAdminApp, promiseNgStorage];
                    return $q.all(promisesArray);
                }
            }
        })
		<!-- Modulo Amostras -->
		.state('dashboard.amostras',{
            templateUrl:'components/genseqAmostras/amostras.html',
            url:'/amostras',
            controller:'AmostrasController',
			controllerAs:'vm',
            resolve: {
                loadMyFile:function($ocLazyLoad, $q) {
                    var promiseSbAdminApp = $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
              							'components/genseqAmostras/amostrasController.js',
                            'components/genseqAmostras/amostrasService.js',
              							'components/genseqProjetos/projetosService.js',
              							'components/genseqServicos/servicosService.js',
              							'components/genseqSistemas/sistemasService.js',
                        ]
                    });
                    var promiseNgStorage = $ocLazyLoad.load({
      				         name:'ngStorage',
      		             files:['bower_components/ngstorage/ngStorage.js']
                    });

                    var promisesArray = [promiseSbAdminApp, promiseNgStorage];
                    return $q.all(promisesArray);
                }
            }
        })
		<!-- Modulo Corridas -->
		.state('dashboard.corridas',{
            templateUrl:'components/genseqCorridas/corridas.html',
            url:'/corridas',
            controller:'CorridasController',
            controllerAs:'vm',
            resolve: {
                loadMyFile:function($ocLazyLoad, $q) {
                    var promiseSbAdminApp = $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
            							'components/genseqCorridas/corridasController.js',
                          'components/genseqCorridas/corridasService.js',
            							'components/genseqAmostras/amostrasService.js',
            							'components/genseqServicos/servicosService.js',
            							'components/genseqSistemas/sistemasService.js',
            							'components/genseqKitDeplecao/kitDeplecaoService.js',
                        ]
                    });
                    var promiseNgStorage = $ocLazyLoad.load({
      				         name:'ngStorage',
      		             files:['bower_components/ngstorage/ngStorage.js']
                    });

                    var promisesArray = [promiseSbAdminApp, promiseNgStorage];
                    return $q.all(promisesArray);
                }
            }
        })
     <!-- Modulo Novo Usuario -->
     .state('dashboard.novo_usuario',{
          templateUrl:'components/genseqUsuarios/novo_usuario.html',
          url:'/novo_usuario',
          controller:'UsuariosController',
		  controllerAs:'vm',
          resolve: {
              loadMyFile:function($ocLazyLoad, $q) {
                  var promiseSbAdminApp = $ocLazyLoad.load({
                      name:'sbAdminApp',
                      files:[
                          'components/genseqUsuarios/usuariosService.js',
                          'components/genseqUsuarios/usuariosController.js',
                      ]
                  });
                  var promiseNgStorage = $ocLazyLoad.load(
                  {
                    name:'ngStorage',
                    files:['bower_components/ngstorage/ngStorage.js']
                  });

                  var promisesArray = [promiseSbAdminApp, promiseNgStorage];
                  return $q.all(promisesArray);
              }
          }
      })

      <!-- Modulo Editar Cadastro -->
      .state('dashboard.editar_cadastro',{
           templateUrl:'components/genseqUsuarios/editar_cadastro.html',
           url:'/editar_cadastro',
           controller:'UsuariosController',
           controllerAs:'vm',
           resolve: {
               loadMyFile:function($ocLazyLoad, $q) {
                   var promiseSbAdminApp = $ocLazyLoad.load({
                       name:'sbAdminApp',
                       files:[
                           'components/genseqUsuarios/usuariosService.js',
                           'components/genseqUsuarios/usuariosController.js',
                           'bower_components/jquery-mask/jquery.mask.js',
                       ]
                   });
                   var promiseNgStorage = $ocLazyLoad.load({
                      name:'ngStorage',
                      files:['bower_components/ngstorage/ngStorage.js']
                   });

                   var promisesArray = [promiseSbAdminApp, promiseNgStorage];
                   return $q.all(promisesArray);
               }
           }
       })//
      <!--  End of module declarations 6-->
    }]);
