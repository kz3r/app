'use strict';

	angular
		.module('sbAdminApp')
		.factory('Projeto',['$http', function($http, Projeto) {
	
	var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';
		var Projeto = {
			submit: submit,
			listar_projetos: listar_projetos,
			destroy: destroy,
			update:update,
			add_membros:add_membros,
			update_membros:update_membros,
			delete_membro:delete_membro,
			listar_papeis:listar_papeis
		};

		return Projeto;

		function submit(nome, descricao, instituicao){
			return $http.post('http://127.0.0.1:8000/genseq_api/projeto/',{
				nome: nome,
				descricao: descricao,
				instituicao: instituicao
			});
		}
		
		function update(id,nome, descricao, instituicao,membros){
			return $http.put('http://127.0.0.1:8000/genseq_api/projeto/' + id + '/',{
				id: id,
				nome: nome,
				descricao: descricao,
				instituicao: instituicao,
				membros:membros
			});
		}
		function update_membros(id,usuario,projeto,papel){
			return $http.put('http://127.0.0.1:8000/genseq_api/usuarioprojeto/' + id + '/',{
				id: id,
				usuario: usuario,
				projeto: projeto,
				papel: papel
			});
		}
		function add_membros(usuario,projeto,papel){
			return $http.post('http://127.0.0.1:8000/genseq_api/usuarioprojeto/',{
				usuario: usuario,
				projeto: projeto,
				papel: papel
			});
		}
		function delete_membro(id){
			return $http.delete('http://127.0.0.1:8000/genseq_api/usuarioprojeto/'+ id + '/',{
				id:id
			});
		}
		function listar_projetos(){
			return $http.get('http://127.0.0.1:8000/genseq_api/projeto/');
		}
		function listar_papeis(){
			return $http.get('http://127.0.0.1:8000/genseq_api/papelprojeto/');
		}
		function destroy(nome) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/projeto/' + nome + '/');
		}
	}]);
