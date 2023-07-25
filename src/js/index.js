var appForm = document.getElementById('app-form'); //
var listaObjetos = document.getElementById('listaObjetos'); //

var objetos = [];

appForm.onsubmit = addObjeto;

function addObjeto(e){
	e.preventDefault();

	var nome = e.target.objetoNome.value;
	var local = e.target.objetoLocal.value;

	var objeto = { nome, local };

	var validation = validarCampos(objeto);
	if(!validation.status){
		alert(validation.error);
		return;
	}

	objetos.push(objeto);
	appForm.reset();
	mostrarLista();
}

function validarCampos(objeto){
	var validation = { status: true, error: '', };

	if(objeto.nome.length === 0){
		validation.status = false;
		validation.error = 'Preencha o campo do Nome do Objeto';
	}
	else if(objeto.local.length === 0){
		validation.status = false;
		validation.error = 'Preencha o campo do Local Situado';
	}
	return validation;
}

function mostrarLista(){
	listaObjetos.innerHTML = '';
	for(objeto of objetos){
		var nomeEl = document.createElement('strong');
		nomeEl.appendChild(document.createTextNode(objeto.nome));

		var localEl = document.createElement('p');
		localEl.appendChild(document.createTextNode('Está localizado: ' + objeto.local));

		var indice = objetos.indexOf(objeto);

		var removerEl = document.createElement('a');
		removerEl.setAttribute('href', '#');
		var removerText = document.createTextNode('Remover');
		removerEl.appendChild(removerText);
		removerEl.setAttribute('onclick', 'removerObjeto(' + indice + ')');

		var alterarEl = document.createElement('a');
		alterarEl.setAttribute('href', '#');
		var alterarText = document.createTextNode('Alterar');
		alterarEl.appendChild(alterarText);
		alterarEl.setAttribute('onclick', 'alterarObjeto(' + indice + ')');

		var itemEl = document.createElement('li');
		itemEl.appendChild(nomeEl);
		itemEl.appendChild(localEl);
		itemEl.appendChild(alterarEl);
		itemEl.appendChild(removerEl);

		listaObjetos.appendChild(itemEl);
	}
}

function removerObjeto(indice){
	objetos.splice(indice, 1);
	mostrarLista();
}

function alterarObjeto(indice){
	var btnAdicionar = document.getElementById('btnAdicionar');
	var btnEditar = document.getElementById('btnEditar');
	var input_nome = document.getElementById('objetoNome');
	var input_local = document.getElementById('objetoLocal');

	btnAdicionar.setAttribute('style', 'display:none');
	btnEditar.setAttribute('style', 'display:');

	input_nome.value = objetos[indice].nome;
	input_local.value = objetos[indice].local;

	btnEditar.onclick = function(){
		var objetoAlterada = {
			nome: input_nome.value,
			local: input_local.value,
		};

		var validation = validarCampos(objetoAlterada);
		if(!validation.status){
			alert(validation.error);
			return;
		}

		input_nome.value = '';
		input_local.value = '';

		btnAdicionar.setAttribute('style', 'display:');
		btnEditar.setAttribute('style', 'display:none');

		objetos[indice] = objetoAlterada;
		mostrarLista();
	};
}

