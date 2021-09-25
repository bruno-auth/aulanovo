$(document).ready(function () {
    loadCidades();
    $('#telefone').mask('(00) 90000-0000');
    $('#cpf').mask('000.000.000-00');
});

function loadCidades() {
    CidadeListaCidades('').then(function (data) {
        data.forEach(obj => {
            $('#cidadeId').append('<option value="'+obj.id+'">'+obj.nome+'</option>');
        });
        $('#cidadeId').select2();
        load();
    });
}

function salvar() {
    let obj = {
        nome: ($("[name='nome']").val() || ''),
        cidadeId: ($("[name='cidadeId']").val() || ''),
        peso: (parseInt($("[name='peso']").val()) || 0),
        dataNascimento: ($("[name='dataNascimento']").val() || ''),
        telefone: ($("[name='telefone']").val() || ''),
        cpf: ($("[name='cpf']").val() || ''),
        ativo: $("[name='ativo']").prop('checked')
    };
    let id = window.location.toString().split('/').pop(); //Busca url pegando apenas o último parâmetro que é o id
    if (id && id.toLowerCase() !== 'formulario') {
        obj.id = id;
    }
    PessoaSalvar(obj).then(function () {
        window.location.href = '/pessoa';
    }, function (err) {
        alert(err);
    });
}


function mascaraTelefone(v) {

    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");

    if (r.length > 11) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
        r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (v.trim() !== "") {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}

function load() {
    let id = window.location.toString().split('/').pop(); //Busca url pegando apenas o último parâmetro que é o id
    if (id && id.toLowerCase() !== 'formulario') {
        //Se vier um id na url
        PessoaBuscaPorId(id).then(function (retorno) {
            $('[name="nome"]').val(retorno.nome);
            $('[name="cidadeId"]').val(retorno.cidadeId);
            $('#cidadeId').select2();
            $('[name="peso"]').val(retorno.peso);
            let data = moment(retorno.dataNascimento).format('YYYY-MM-DD');
            if (data) {
                $('[name="dataNascimento"]').val(data);
            }
            $('[name="cpf"]').val(retorno.cpf);

            $('[name="telefone"]').val(retorno.telefone);
            if (retorno.ativo) {
                $("[name='ativo']").prop('checked', true);
            }
        });
    }
}