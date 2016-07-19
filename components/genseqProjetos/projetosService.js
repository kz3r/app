'use strict'

angular
		.module('sbAdminApp')
		.factory('Projeto', Projeto);

	Projeto.$inject = ['$http'];

	function Projeto($http) {

		var Projeto = {
			submit: submit,
			listar_projetos: listar_projetos,
			destroy: destroy
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

		function listar_projetos(){
			return $http.get('http://127.0.0.1:8000/genseq_api/projeto/');
		}

		function destroy(nome) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/projeto/' + nome + '/');
		}
	}
