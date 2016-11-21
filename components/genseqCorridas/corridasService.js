'use strict';

	angular
		.module('sbAdminApp')
		.factory('Corrida',['$http', function($http, Corrida) {
	
	var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';
		var Corrida = {
			submit: submit,
			listar_amostras: listar_amostras,
			listar_corridas_usuario: listar_corridas_usuario,
			destroy: destroy,
			update:update,
			update_amostracorrida: update_amostracorrida,
			add_amostracorrida:add_amostracorrida,
			listar_corridas: listar_corridas
		};

		return Corrida;

		function submit(sistema, servico, detalhes){
			return $http.post('http://127.0.0.1:8000/genseq_api/corrida/',{
				sistema: sistema,
				servico: servico,
				detalhes: detalhes
			});
		}
		
		function update(id, sistema, servico, detalhes){
			return $http.put('http://127.0.0.1:8000/genseq_api/corrida/' + id + '/',{
				sistema: sistema,
				servico: servico,
				detalhes: detalhes
			});
		}
		function listar_amostras(){
			return $http.get('http://127.0.0.1:8000/genseq_api/amostra/');
		}
		function listar_corridas(){
			return $http.get('http://127.0.0.1:8000/genseq_api/corrida/');
		}
		function listar_corridas_usuario(usuario){
			return $http.get('http://127.0.0.1:8000/genseq_api/corrida?user='+ usuario);
		}
		function destroy(id) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/amostracorrida/' + id + '/');
		};
		function add_amostracorrida(id_amostra, id_corrida, kit_deplecao, resultado, arquivo_gerado, barcode, ciclos_pcr, usuario){
			return $http.post('http://127.0.0.1:8000/genseq_api/amostracorrida/',{
				amostra: id_amostra,
				corrida: id_corrida,
				kit_deplecao: kit_deplecao,
				resultado: resultado,
				arquivo_gerado: arquivo_gerado,
				barcode: barcode,
				ciclos_pcr: ciclos_pcr,
				criado_por: usuario,
				atualizado_por: usuario
			});
		}
		function update_amostracorrida (id,id_amostra, id_corrida, kit_deplecao, resultado, arquivo_gerado, barcode, ciclos_pcr, usuario){
			return $http.put('http://127.0.0.1:8000/genseq_api/amostracorrida/' + id + '/',{
				amostra: id_amostra,
				corrida: id_corrida,
				kit_deplecao: kit_deplecao,
				resultado: resultado,
				arquivo_gerado: arquivo_gerado,
				barcode: barcode,
				ciclos_pcr: ciclos_pcr,
				atualizado_por: usuario
			});
		}
	}]);
