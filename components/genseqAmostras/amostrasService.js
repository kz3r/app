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
			add_projetoamostra: add_projetoamostra,
			get_amostra: get_amostra
		};

		return Amostra;

		function submit(sistema, servico, tipo_organismo, status, organismo, observacao, cod_origem, qualidade){
			return $http.post('http://127.0.0.1:8000/genseq_api/amostra/',{
				sistema: sistema,
				servico: servico,
				tipo: tipo_organismo,
				status: status,
				organismo: organismo,
				observacao:observacao,
				cod_origem:cod_origem,
				qualidade: qualidade
			});
		}
		
		function update(id, sistema, servico, tipo_organismo, status, organismo, observacao, cod_origem, qualidade){
			return $http.put('http://127.0.0.1:8000/genseq_api/amostra/' + id + '/',{
				sistema: sistema,
				servico: servico,
				tipo: tipo_organismo,
				status: status,
				organismo: organismo,
				observacao: observacao,
				cod_origem:cod_origem,
				qualidade: qualidade
			});
		}
		function get_amostra(id){
			return $http.get('http://127.0.0.1:8000/genseq_api/amostra?amostra='+ id);
		}

		function listar_amostras(){
			return $http.get('http://127.0.0.1:8000/genseq_api/amostra/');
		}

		function destroy(id) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/amostra/' + id + '/');
		}
		
		function add_projetoamostra (id_projeto, id_amostra, responsavel_envio){
			return $http.post('http://127.0.0.1:8000/genseq_api/projetoamostra/',{
				projeto: id_projeto,
				amostra: id_amostra,
				responsavel_envio: responsavel_envio
			});
		}
	}]);
