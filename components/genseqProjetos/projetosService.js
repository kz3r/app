'use strict';

	angular
		.module('sbAdminApp')
		.factory('Projeto',['$http', function($http, Projeto) {

	var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';
		var Projeto = {
			submit: submit,
			listar_projetos: listar_projetos,
			listar_projetos_usuario: listar_projetos_usuario,
			destroy: destroy,
			update:update,
			aprovar_projeto:aprovar_projeto,
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

		function update(id,nome, descricao, instituicao){
			return $http.put('http://127.0.0.1:8000/genseq_api/projeto/' + id + '/',{
				id: id,
				nome: nome,
				descricao: descricao,
				instituicao: instituicao
			});
		}
		function aprovar_projeto (id,usuario,autorizado_em, nome, descricao, instituicao){
			return $http.put('http://127.0.0.1:8000/genseq_api/projeto/' + id + '/',{
				id: id,
				autorizado_por: usuario,
				autorizado_em: autorizado_em,
				nome: nome,
				descricao: descricao,
				instituicao: instituicao
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
		function listar_projetos_usuario(usuario){
			return $http.get('http://127.0.0.1:8000/genseq_api/projeto?user='+ usuario);
		}
		function listar_papeis(){
			return $http.get('http://127.0.0.1:8000/genseq_api/papelprojeto/');
		}
		function destroy(nome) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/projeto/' + nome + '/');
		}
	}]);
