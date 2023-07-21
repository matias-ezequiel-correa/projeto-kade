var appForm = document.getElementById('app-form');
var listaPessoas = document.getElementById('listaPessoas');

var pessoas = [];

appForm.onsubmit = addPessoa;
btnOrdenar.onclick = ordenarLista;

function addPessoa(e){
	e.preventDefault();

	console.log(e);

	var nome = e.target.pessoaNome.value;
	var sobrenome = e.target.pessoaSobrenome.value;

	var pessoa = { nome, sobrenome };

	var validation = validarCampos(pessoa);
	if(!validation.status){
		alert(validation.error);
		return;
	}

	pessoas.push(pessoa);
	appForm.reset();
	mostrarLista();
	console.log(pessoas);
}

function validarCampos(pessoa){
	var validation = { status: true, error: '', };

	if(pessoa.nome.length === 0){
		validation.status = false;
		validation.error = 'Preencha o campo do Nome do Objeto';
	}
	else if(pessoa.sobrenome.length === 0){
		validation.status = false;
		validation.error = 'Preencha o campo do Local Situado';
	}
	return validation;
}

function mostrarLista(){
	listaPessoas.innerHTML = '';
	for(pessoa of pessoas){
		var nomeEl = document.createElement('strong');
		nomeEl.appendChild(document.createTextNode(pessoa.nome));

		var localEl = document.createElement('p');
		localEl.appendChild(document.createTextNode('O objeto está localizado: ' + pessoa.sobrenome));

		var indice = pessoas.indexOf(pessoa);

		var removerEl = document.createElement('a');
		removerEl.setAttribute('href', '#');
		var removerText = document.createTextNode('Remover');
		removerEl.appendChild(removerText);
		removerEl.setAttribute('onclick', 'removerPessoa(' + indice + ')');

		var alterarEl = document.createElement('a');
		alterarEl.setAttribute('href', '#');
		var alterarText = document.createTextNode('Alterar');
		alterarEl.appendChild(alterarText);
		alterarEl.setAttribute('onclick', 'alterarPessoa(' + indice + ')');

		var itemEl = document.createElement('li');
		itemEl.appendChild(nomeEl);
		itemEl.appendChild(localEl);
		itemEl.appendChild(alterarEl);
		itemEl.appendChild(removerEl);

		listaPessoas.appendChild(itemEl);
	}
}

function removerPessoa(indice){
	pessoas.splice(indice, 1);
	mostrarLista();
}

function alterarPessoa(indice){
	var btnCadastrar = document.getElementById('btnCadastrar');
	var btnEditar = document.getElementById('btnEditar');
	var input_nome = document.getElementById('pessoaNome');
	var input_sobrenome = document.getElementById('pessoaSobrenome');

	btnCadastrar.setAttribute('style', 'display:none');
	btnEditar.setAttribute('style', 'display:');

	input_nome.value = pessoas[indice].nome;
	input_sobrenome.value = pessoas[indice].sobrenome;

	btnEditar.onclick = function(){
		var pessoaAlterada = {
			nome: input_nome.value,
			sobrenome: input_sobrenome.value,
		};

		var validation = validarCampos(pessoaAlterada);
		if(!validation.status){
			alert(validation.error);
			return;
		}

		input_nome.value = '';
		input_sobrenome.value = '';

		btnCadastrar.setAttribute('style', 'display:');
		btnEditar.setAttribute('style', 'display:none');

		pessoas[indice] = pessoaAlterada;
		mostrarLista();
	};
}
