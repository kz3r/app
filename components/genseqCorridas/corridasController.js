'use strict'

angular.module('sbAdminApp')
		.controller('CorridasController', CorridasController);

	CorridasController.$inject = ['$rootScope', '$scope','$localStorage', 'Corrida','Amostra','Sistema', 'Servico', 'KitDeplecao'];

	function CorridasController($rootScope, $scope, $localStorage, Corrida, Amostra, Sistema, Servico, KitDeplecao){
		var vm = this;
		vm.listar_amostras = listar_amostras;
		vm.listar_corridas = listar_corridas;
		vm.edit_registro = edit_registro;
		vm.pick_amostra = pick_amostra;
		vm.limpar_corrida = limpar_corrida;
		vm.salvar_amostracorrida = salvar_amostracorrida;
		vm.salvar_editamostracorrida = salvar_editamostracorrida;
		vm.add_amostracorrida = add_amostracorrida;
		vm.editaddamostra = editaddamostra;
		vm.addcorrida = addcorrida;
		vm.submit = submit;
		vm.submit_edit = submit_edit;
		vm.remove = remove;
		vm.edit_remove = edit_remove;
		vm.lista_projetos=[];
		vm.lista_amostras=[];
		vm.lista_sistemas=[];
		vm.lista_servicos=[];
		vm.lista_corridas=[];
		vm.lista_kitdeplecao= [];
		vm.lista_amostracorrida=[];
		vm.lista_amostracorrida_view=[];
		vm.usuario=$localStorage.user.id;
		vm.nivel_acesso=$localStorage.user.nivel_acesso;
		listar_kitdeplecao();
		listar_amostras();
		listar_corridas();
		listar_sistemas();
		listar_servicos();
		
		function limpar_corrida(){
			vm.lista_amostracorrida=[];
			vm.lista_amostracorrida_view=[];
		}
		
		
		function listar_amostras() {
			Amostra.listar_amostras().then(projetoSuccessFn, projetoErrorFn);
			
			  function projetoSuccessFn(data, status, headers, config) {
				vm.lista_amostras = data.data;
			  }

			  function projetoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Amostras!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function listar_kitdeplecao() {
			KitDeplecao.listar_kitdeplecao().then(projetoSuccessFn, projetoErrorFn);

			  function projetoSuccessFn(data, status, headers, config) {
				vm.lista_kitdeplecao = data.data;
			  }

			  function projetoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar KitDeplecao!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function listar_corridas() {
			
			if (vm.nivel_acesso == 1){
				Corrida.listar_corridas().then(projetoSuccessFn, projetoErrorFn);
			}
			  function projetoSuccessFn(data, status, headers, config) {
				vm.lista_corridas = data.data;
			  }

			  function projetoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Corridas!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function listar_sistemas() {
			Sistema.listar_sistemas().then(sistemaSuccessFn, sistemaErrorFn);

			  function sistemaSuccessFn(data, status, headers, config) {
				vm.lista_sistemas = data.data;
			  }

			  function sistemaErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Sistemas!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function listar_servicos() {
			Servico.listar_servicos().then(servicoSuccessFn, servicoErrorFn);

			  function servicoSuccessFn(data, status, headers, config) {
				vm.lista_servicos = data.data;
			  }

			  function servicoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Servicos!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function remove(registro){
			var index = vm.lista_amostracorrida.indexOf(registro);
			vm.lista_amostracorrida.splice(index, 1);
			vm.lista_amostracorrida_view.splice(index, 1);
		}
		
		function edit_remove(index){
			vm.id_amostra = vm.lista_amostracorrida[index].id;
			Corrida.destroy(vm.id_amostra).then(amostraSuccessFn, amostraErrorFn);

			function amostraSuccessFn(data, status, headers, config) {
				vm.lista_amostracorrida.splice(index, 1);
				vm.lista_amostracorrida_view.splice(index, 1);
				listar_corridas();
				
			  }

			  function amostraErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Corrida não pode ser adicionada!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

			
		}
		function add_amostracorrida(){
			
			vm.lista_amostracorrida_view.unshift({
				amostra: vm.amostra,
				kit_deplecao:vm.kit_deplecao,
				resultado:vm.resultado,
				barcode:vm.barcode,
				ciclos_pcr:vm.ciclos_pcr,
				arquivo_gerado:vm.arquivo_gerado,
				usuario:vm.usuario
			});
			
			vm.lista_amostracorrida.unshift({
				amostra: vm.amostra.id,
				kit_deplecao:vm.kit_deplecao.id,
				resultado:vm.resultado,
				barcode:vm.barcode,
				ciclos_pcr:vm.ciclos_pcr,
				arquivo_gerado:vm.arquivo_gerado,
				usuario:vm.usuario

			});
			vm.amostra=[];
			vm.kit_deplecao=[];
			vm.resultado=[];
			vm.barcode=[]
			vm.ciclos_pcr=[];
			vm.arquivo_gerado= [];
			$('#AddAmostraModal').modal('hide');

			
		}
		function edit_registro(index) {
			listar_corridas();
			$('#EditCorridaModal').modal('show');
			limpar_corrida();
			vm.index = index;
			vm.id_corrida = vm.lista_corridas[index].id;
			vm.id = vm.lista_corridas[index].id;
			vm.sistema = vm.lista_corridas[index].sistema;
			vm.servico = vm.lista_corridas[index].servico;
			vm.detalhes = vm.lista_corridas[index].detalhes;
			var i;
			for (i in vm.lista_corridas[index].amostras){
				vm.lista_amostracorrida.unshift({
					
					id: vm.lista_corridas[index].amostras[i].id,
					amostra: vm.lista_corridas[index].amostras[i].amostra.id,
					kit_deplecao: vm.lista_corridas[index].amostras[i].kit_deplecao.id,
					resultado:vm.lista_corridas[index].amostras[i].resultado,
					arquivo_gerado:vm.lista_corridas[index].amostras[i].arquivo_gerado,
					barcode:vm.lista_corridas[index].amostras[i].barcode,
					ciclos_pcr:vm.lista_corridas[index].amostras[i].ciclos_pcr,
					corrida:vm.lista_corridas[index].id
				});
				vm.lista_amostracorrida_view.unshift({
					
					id: vm.lista_corridas[index].amostras[i].id,
					amostra: vm.lista_corridas[index].amostras[i].amostra,
					kit_deplecao: vm.lista_corridas[index].amostras[i].kit_deplecao,
					resultado:vm.lista_corridas[index].amostras[i].resultado,
					arquivo_gerado:vm.lista_corridas[index].amostras[i].arquivo_gerado,
					barcode:vm.lista_corridas[index].amostras[i].barcode,
					ciclos_pcr:vm.lista_corridas[index].amostras[i].ciclos_pcr,
					corrida:vm.lista_corridas[index].id
				});
			}
		}
		
		function submit(){

		Corrida.submit(vm.sistema.id,vm.servico.id,vm.detalhes).then(amostraSuccessFn, amostraErrorFn);

			function amostraSuccessFn(data, status, headers, config) {
				vm.resposta = angular.fromJson(data);
				vm.id_corrida = vm.resposta.data.id;
				salvar_amostracorrida();
				vm.sistema = [];
				vm.servico = [];
				vm.detalhes = [];
				SnackBar.show({ pos: 'bottom-center', text: 'Corrida adicionada com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
				$('#AddCorridaModal').modal('hide');
				listar_corridas();
			  }

			  function amostraErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Corrida não pode ser adicionada!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		
		function submit_edit(){

		Corrida.update(vm.id, vm.sistema.id,vm.servico.id,vm.detalhes).then(amostraSuccessFn, amostraErrorFn);

			function amostraSuccessFn(data, status, headers, config) {
				var i;
				for (i in vm.lista_amostracorrida){
					vm.id_amostra = vm.lista_amostracorrida_view[i].amostra.id;
					vm.sistema_amostra = vm.lista_amostracorrida_view[i].amostra.sistema.id;
					vm.servico_amostra = vm.lista_amostracorrida_view[i].amostra.servico.id;
					vm.tipo_amostra = vm.lista_amostracorrida_view[i].amostra.tipo;
					vm.organismo_amostra = vm.lista_amostracorrida_view[i].amostra.organismo;
					vm.observacao_amostra = vm.lista_amostracorrida_view[i].amostra.observacao;
					
					Amostra.update(vm.id_amostra, vm.sistema_amostra,vm.servico_amostra,vm.tipo_amostra, vm.status, vm.organismo_amostra, vm.observacao_amostra);
				}
				limpar_corrida();
				vm.id_amostracorrida=[];
				vm.amostra=[];
				vm.id_amostra=[];
				vm.sistema_amostra=[];
				vm.servico_amostra=[];
				vm.tipo_amostra=[];
				vm.organismo_amostra=[];
				vm.observacao_amostra=[];
				listar_corridas();
				vm.sistema = [];
				vm.servico = [];
				vm.detalhes = [];
				limpar_corrida();
				listar_corridas();
				SnackBar.show({ pos: 'bottom-center', text: 'Corrida salva com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
				$('#EditCorridaModal').modal('hide');
				
			  }

			  function amostraErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Corrida não pode ser adicionada!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		
		function editaddamostra(){
			vm.id_amostracorrida=[];
			vm.amostra=[];
			vm.kit_deplecao=[];
			vm.resultado=[];
			vm.barcode=[]
			vm.ciclos_pcr=[];
			vm.arquivo_gerado= [];
			$('#EditAddAmostraModal').modal('show');
		}
		function addcorrida(){
				vm.sistema = [];
				vm.servico = [];
				vm.detalhes = [];
				limpar_corrida();
			$('#AddCorridaModal').modal('show');
		}
		
		
		function salvar_editamostracorrida(){
			

			Corrida.add_amostracorrida(vm.amostra.id,vm.id_corrida, vm.kit_deplecao.id, vm.resultado, vm.arquivo_gerado, vm.barcode, vm.ciclos_pcr,vm.usuario).then(corridaSuccessFn, corridaErrorFn);
			
			function corridaSuccessFn(data, status, headers, config) {
		
				limpar_corrida();
				vm.kit_deplecao=[];
				vm.resultado=[];
				vm.barcode=[]
				vm.ciclos_pcr=[];
				vm.arquivo_gerado= [];
				listar_corridas();
				$('#EditAddAmostraModal').modal('hide');
				$('#EditCorridaModal').modal('hide');
			  }

			  function corridaErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Amostra não pode ser salva!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
			
		}		
		function salvar_amostracorrida() {
			
			var i;
			for (i in vm.lista_amostracorrida){
				
				if (vm.lista_amostracorrida[i].id != null){
					Corrida.edit_amostracorrida(vm.lista_amostracorrida[i].id,vm.lista_amostracorrida[i].amostra,vm.id_corrida, vm.lista_amostracorrida[i].kit_deplecao, vm.lista_amostracorrida[i].resultado, vm.lista_amostracorrida[i].arquivo_gerado, vm.lista_amostracorrida[i].barcode, vm.lista_amostracorrida[i].ciclos_pcr,vm.lista_amostracorrida[i].usuario).then(corridaSuccessFn, corridaErrorFn);
				}else{
					Corrida.add_amostracorrida(vm.lista_amostracorrida[i].amostra,vm.id_corrida, vm.lista_amostracorrida[i].kit_deplecao, vm.lista_amostracorrida[i].resultado, vm.lista_amostracorrida[i].arquivo_gerado, vm.lista_amostracorrida[i].barcode, vm.lista_amostracorrida[i].ciclos_pcr,vm.lista_amostracorrida[i].usuario).then(corridaSuccessFn, corridaErrorFn);
				}
				vm.id_amostra = vm.lista_amostracorrida_view[i].amostra.id;
				vm.sistema_amostra = vm.lista_amostracorrida_view[i].amostra.sistema.id;
				vm.servico_amostra = vm.lista_amostracorrida_view[i].amostra.servico.id;
				vm.tipo_amostra = vm.lista_amostracorrida_view[i].amostra.tipo;
				vm.organismo_amostra = vm.lista_amostracorrida_view[i].amostra.organismo;
				vm.observacao_amostra = vm.lista_amostracorrida_view[i].amostra.observacao;
				
				Amostra.update(vm.id_amostra, vm.sistema_amostra,vm.servico_amostra,vm.tipo_amostra, vm.status, vm.organismo_amostra, vm.observacao_amostra);
				limpar_corrida();
				vm.id_amostracorrida=[];
				vm.amostra=[];
				vm.id_amostra=[];
				vm.sistema_amostra=[];
				vm.servico_amostra=[];
				vm.tipo_amostra=[];
				vm.organismo_amostra=[];
				vm.observacao_amostra=[];
				listar_corridas();
			}
			
			function corridaSuccessFn(data, status, headers, config) {
				vm.lista_amostracorrida=[];
				vm.lista_amostracorrida_view=[];
			  }

			  function corridaErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Amostra não pode ser salva!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		function pick_amostra(registro){
			vm.amostra = registro;
		}
	}
