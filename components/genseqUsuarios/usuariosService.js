'use strict';

	angular
		.module('sbAdminApp')
		.factory('Usuario', Usuario);

	Usuario.$inject = ['$http'];

	function Usuario($http) {

		var Usuario = {
			listar_usuarios : listar_usuarios,
			listar_niveisacesso : listar_niveisacesso,
			registro: registro,
			get: get,
			update: update
		};
        var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';

		return Usuario;

		function listar_usuarios(){
			return $http.get('http://127.0.0.1:8000/genseq_api/usuarios/');
		}
		function listar_niveisacesso(){
			return $http.get('http://127.0.0.1:8000/genseq_api/nivelacesso/');
		}

		// DEPRECIADO
		// function get(emailUsuario) {
		// 	return $http.get('http://127.0.0.1:8000/genseq_api/usuarios/' + emailUsuario + '/');
		// }

		function update(perfilUsuario) {
			return $http.put('http://127.0.0.1:8000/genseq_api/usuarios/', perfilUsuario);
		}

		function registro(email, password, nome, nivel_acesso,instituicao){
			return $http.post('http://127.0.0.1:8000/genseq_api/usuarios/',{
				email: email,
				password: password,
				nome: nome,
				nivel_acesso: nivel_acesso, //nivel usuário padrão
				instituicao:instituicao
			}).then(registroSuccess, registroError);

			//Se o usuário foi registrado com sucesso, faz login
			function registroSuccess(data, status, headers, config) {
				//Autenticacao.login(email, password);
				Snackbar.show({ pos: 'bottom-center', text: 'Usuário cadastrado com sucesso. Faça login para acessar a aplicação', actionText: 'Ocultar', actionTextColor: '#00FF00'});
				window.location = '/#/dashboard/home';
			}

			function registroError(data, status, headers, config) {
				var snackMessage = "Ocorreu um problem no cadastro."
				if(data.status == 400) {
					snackMessage = "Esse email já foi utilizado ou está indísponível.";
				} else {
						snackMessage = "Ocorreu um problema no cadastro. Por favor, contate os administradores do sistema.";
				}
				Snackbar.show({ pos: 'bottom-center', text: snackMessage, actionText: 'Ocultar', actionTextColor: '#FF0000'});
			}
		}
	}
