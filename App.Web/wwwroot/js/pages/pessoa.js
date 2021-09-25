$(document).ready(function () {
    $('#busca').keypress(function (e) {
        if (e.which === 13) {
            load();
        }
    });
    load();
});

function load() {
    let nome = $('[name="nome"]').val();
    let pesoMaiorQue = ($('[name="pesoMaiorQue"]').val() || 0);
    let pesoMenorQue = ($('[name="pesoMenorQue"]').val() || 0);
    PessoaListaPessoas(nome, pesoMaiorQue, pesoMenorQue).then(function (data) {
        $('#table tbody').html('');
        data.forEach(obj => {
            let idd = "'"+obj.id+"'";

            $('#table tbody').append('' +
                '<tr id="obj-' + obj.id + '">' +
                '<td>' + (obj.nome || '--') + '</td>' +
                '<td>' + (obj.peso || '--') + '</td>' +
                '<td>' + (moment(obj.dataNascimento).format('DD/MM/YYYY') || '--') + '</td>' +
                '<td>' + (obj.cidade.nome || '--') + '</td>' +
                '<td>' + (obj.ativo === true ? 'Ativo' : 'Inativo') + '</td>' +
                '<td>' + (obj.telefone || '--') + '</td>' +
                '<td>' + (cpf(obj.cpf) || '--') + '</td>' +
                '<td><button type="button" class="btn btn-primary fas fa-pencil-alt" onclick="window.location.href = \'/pessoa/formulario/' + obj.id + '\'"></button> <button type="button" class="btn btn-danger fas fa-trash" onclick="excluir(' + idd + ');"></button></td>' +
                '</tr>');
        });
        $('#table-pessoas').dataTable();
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
    return r;
    }
}

function cpf(v) {
    v = v.replace(/\D/g, "")                    
    v = v.replace(/(\d{3})(\d)/, "$1.$2")       
    v = v.replace(/(\d{3})(\d)/, "$1.$2")       
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") 
    return v
}

function excluir(id) {
    PessoaRemover(id).then(function () {
        alert('Pessoa removida com sucesso');
        window.location.reload(false);
    });
}

