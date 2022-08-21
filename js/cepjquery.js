$(document).ready(function () {
  function limpa_form() {
    $("#cep").val("");
    $("#logradouro").val("");
    $("#numero").val("");
    $("#bairro").val("");
    $("#localidade").val("");
    $("#uf").val("");
  }

  //quando o campo perde o foco
  $("#cep").blur(function () {
    var cep = $(this).val().replace(/\D/g, '');
    //verifica se o campo não está vazio
    if (cep != "") {
      var validaCep = /^[0-9]{8}$/;


      if (validaCep.test(cep)) {
        $("#logradouro").val("-");
        $("#bairro").val("-");
        $("#localidade").val("-");
        $("#uf").val("-");

        //Consulta a página do ViaCEP
        $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

          if (!("erro" in dados)) {
            //Atualiza os campos com os valores da consulta.
            $("#logradouro").val(dados.logradouro);
            $("#bairro").val(dados.bairro);
            $("#localidade").val(dados.localidade);
            $("#uf").val(dados.uf);
          }
          else {
            //CEP pesquisado não foi encontrado.
            limpa_form();
            alert("CEP não encontrado.");
          }
        });
      } else {
        limpa_form();
        alert("CEP inválido.");
      }
    } else {
      limpa_form();
    }
  });
});
