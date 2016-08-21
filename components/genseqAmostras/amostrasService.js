'use strict';

	angular
		.module('sbAdminApp')
		.factory('Amostra',['$http', function($http, Amostra) {
	
	var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';
		var Amostra = {
			submit: submit,
			listar_amostras: listar_amostras,
			destroy: destroy,
			update:update,
			add_membros:add_membros,
			update_membros:update_membros,
			delete_membro:delete_membro
		};

		return Amostra;

		function submit(nome, descricao, instituicao){
			return $http.post('http://127.0.0.1:8000/genseq_api/amostra/',{
				nome: nome,
				descricao: descricao,
				instituicao: instituicao
			});
		}
		
		function update(id,nome, descricao, instituicao,membros){
			return $http.put('http://127.0.0.1:8000/genseq_api/amostra/' + id + '/',{
				id: id,
				nome: nome,
				descricao: descricao,
				instituicao: instituicao,
				membros:membros
			});
		}
		function update_membros(id,usuario,amostra,papel){
			return $http.put('http://127.0.0.1:8000/genseq_api/usuarioamostra/' + id + '/',{
				id: id,
				usuario: usuario,
				amostra: amostra,
				papel: papel
			});
		}
		function add_membros(usuario,amostra,papel){
			return $http.post('http://127.0.0.1:8000/genseq_api/usuarioamostra/',{
				usuario: usuario,
				amostra: amostra,
				papel: papel
			});
		}
		function delete_membro(id){
			return $http.delete('http://127.0.0.1:8000/genseq_api/usuarioamostra/'+ id + '/',{
				id:id
			});
		}
		function listar_amostras(){
			return $http.get('http://127.0.0.1:8000/genseq_api/amostra/');
		}

		function destroy(nome) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/amostra/' + nome + '/');
		}
	}]);
