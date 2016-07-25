'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
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
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
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
            loadMyFile:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                        'components/genseqLogin/loginService.js',
                        'components/genseqLogin/loginController.js',////
                        'shared/genseqAutenticacao/autenticacaoService.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
            }
        }
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
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
             loadMyFile:function($ocLazyLoad) {
                 return $ocLazyLoad.load({
                     name:'sbAdminApp',
                     files:[
                         'components/genseqServicos/servicosService.js',
                         'components/genseqServicos/servicosController.js',
                     ]
                 })
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
              loadMyFile:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name:'sbAdminApp',
                      files:[
                          'components/genseqSistemas/sistemasService.js',
                          'components/genseqSistemas/sistemasController.js',
                      ]
                  })
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
               loadMyFile:function($ocLazyLoad) {
                   return $ocLazyLoad.load({
                       name:'sbAdminApp',
                       files:[
                           'components/genseqKitDeplecao/kitDeplecaoService.js',
                           'components/genseqKitDeplecao/kitDeplecaoController.js',
                       ]
                   })
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
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
							'components/genseqProjetos/projetosController.js',
                            'components/genseqProjetos/projetosService.js',
							'components/genseqInstituicao/instituicaoService.js',
							'components/genseqUsuarios/usuariosService.js',
                        ]
                    })
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
              loadMyFile:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name:'sbAdminApp',
                      files:[
                          'components/genseqUsuarios/usuariosService.js',
                          'components/genseqUsuarios/usuariosController.js',
                      ]
                  })
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
               loadMyFile:function($ocLazyLoad) {
                   return $ocLazyLoad.load({
                       name:'sbAdminApp',
                       files:[
                           'components/genseqUsuarios/usuariosService.js',
                           'components/genseqUsuarios/usuariosController.js',
                       ]
                   })
               }
           }
       })


     ///////////
    <!--  End of module declarations -->
    }]);
