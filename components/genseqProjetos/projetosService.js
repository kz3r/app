'use strict';

	angular
		.module('sbAdminApp')
		.factory('Projeto',['$http', function($http, Projeto) {
	
	var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';
		var Projeto = {
			submit: submit,
			listar_projetos: listar_projetos,
			destroy: destroy,
			update:update
		};

		return Projeto;

		function submit(nome, descricao, instituicao, membros){
			return $http.post('http://127.0.0.1:8000/genseq_api/projeto/',{
				nome: nome,
				descricao: descricao,
				instituicao: instituicao,
				membros: membros
			});
		}
		
		function update(id,nome, descricao, instituicao, membros){
			return $http.put('http://127.0.0.1:8000/genseq_api/projeto/' + id + '/',{
				id: id,
				nome: nome,
				descricao: descricao,
				instituicao: instituicao,
				membros: membros
			});
		}
		
		function listar_projetos(){
			return $http.get('http://127.0.0.1:8000/genseq_api/projeto/');
		}

		function destroy(nome) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/projeto/' + nome + '/');
		}
	}]);
