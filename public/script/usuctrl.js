angular.module("socialize").controller("usuctrl", function ($scope,$http) {
	$scope.app = "socialize";
	$scope.usuarios = [];

	$scope.adicionarUsuario = function () {
		
		$http.post("usuario/salvar",{params:{"usuario":$scope.usuarioform}})
		.success(function (data) {
			delete $scope.usuarioform;
			alert(data);
			$scope.salvo = true;
			$scope.cadastraUsuario.$setPristine();
		}).error(function (data) {
			$scope.erro = true;
			$scope.message = "Aconteceu um problema: " + data;
		});
	};

	function redirecionar(){
		dados = {cod:localStorage.getItem("cod"),token:localStorage.getItem("token")};
		$http.get("redi",{params:{"dados":dados}})
		.success(function (data) {
			localStorage.setItem("nome",data.nome);
			window.location = data.url;
		}).error(function (data) {
			$scope.erro = true;
			$scope.message = "Aconteceu um problema: " + data;
		});
	}

	$scope.entrar = function () {
		$http.post("autorize",{params:{"usuario":$scope.loginform}})
		.success(function (data) {
			delete $scope.loginform;
			$scope.loginUsuario.$setPristine();
			//console.log(data.cod)
			localStorage.setItem("cod",data.cod);
			localStorage.setItem("token",data.token);
			redirecionar();
			
		}).error(function (data) {
			alert(data);
			$scope.erro = true;
		});
	};
						
});