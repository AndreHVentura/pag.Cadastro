//Funções para os formularios
document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll(".form-cadastro");
    let currentFormIndex = 0;
    function showForm(index) {
      forms.forEach((form, i) => {
        form.style.display = i === index ? "block" : "none";
      });
    }
    //Função para verificar se os campos obrigatorios foram preenchidos
    function validateForm(form) {
      const fields = form.querySelectorAll(".campo-obrigatorio");
      let isValid = true;
      fields.forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add("is-invalid");
          isValid = false;
        } else {
          field.classList.remove("is-invalid");
        }
      });
      return isValid;
    }
    //função para avançar os formularios
    document.getElementById("next-1").addEventListener("click", function () {
      if (validateForm(forms[currentFormIndex])) {
        currentFormIndex++;
        showForm(currentFormIndex);
      }
    });
    document.getElementById("next-2").addEventListener("click", function () {
      if (validateForm(forms[currentFormIndex])) {
        currentFormIndex++;
        showForm(currentFormIndex);
      }
    });
    //função para voltar os formularios
    document.getElementById("prev-2").addEventListener("click", function () {
      currentFormIndex--;
      showForm(currentFormIndex);
    });
    document.getElementById("prev-3").addEventListener("click", function () {
      currentFormIndex--;
      showForm(currentFormIndex);
    });
    //ao concluir o cadastro
    document.getElementById("save").addEventListener("click", function () {
      if (validateForm(forms[currentFormIndex])) {
        // Mostrar modal de sucesso
        var successModal = new bootstrap.Modal(
          document.getElementById("successModal"),
          {
            keyboard: false,
          }
        );
        successModal.show();
      }
    });
    showForm(currentFormIndex);
  });
  //Função para adicionar o DDI ao telefone e celular
  document.querySelectorAll(".ddi").forEach(function (ddiElement) {
    ddiElement.addEventListener("change", function () {
      var ddiValue = this.value;
      var correspondingInputId = this.id.replace("ddi", "");
      var celularInput = document.getElementById(
        "celular" + correspondingInputId
      );
      var telefoneInput = document.getElementById(
        "telefone" + correspondingInputId
      );
      if (celularInput) {
        celularInput.value = ddiValue + " ";
      }
      if (telefoneInput) {
        telefoneInput.value = ddiValue + " ";
      }
    });
  });
  // Função para formatar o celular conforme o usuário digita
  $(".celular").on("input", function () {
    var celular = $(this).val().replace(/\D/g, "");
    if (celular.length > 10) {
      celular =
        "+" +
        celular.substring(0, 2) +
        " (" +
        celular.substring(2, 4) +
        ") " +
        celular.substring(4, 5) +
        " " +
        celular.substring(5, 9) +
        "-" +
        celular.substring(9);
    }
    $(this).val(celular);
  });
  // Função para formatar o telefone conforme o usuário digita
  $(".telefone").on("input", function () {
    var telefone = $(this).val().replace(/\D/g, "");
    if (telefone.length > 9) {
      telefone =
        "+" +
        telefone.substring(0, 2) +
        " (" +
        telefone.substring(2, 4) +
        ") " +
        telefone.substring(4, 8) +
        "-" +
        telefone.substring(8);
    }
    $(this).val(telefone);
  });
  //Função para a formatação do cpf e cnpj
  document.getElementById("cnpj-cpf").addEventListener("input", function () {
    var value = this.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // Formatar CPF
    } else {
      value = value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      ); // Formatar CNPJ
    }
    this.value = value;
  });
  // Função para preencher os campos de endereço com base no CEP
  function preencherEndereco(cep) {
    document.getElementById("endereco").value = ""; // Limpa os campos de endereço, cidade e estado
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    cep = cep.replace(/\D/g, ""); // Remove caracteres especiais do CEP
    if (cep.length != 8) {
      // Verifica se o CEP possui a quantidade correta de dígitos
      alert("CEP inválido");
      return;
    }
    // Faz a requisição à API do ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          alert("CEP não encontrado");
          return;
        }
        // Preenche os campos de endereço, cidade e estado com os dados retornados pela API
        document.getElementById("endereco").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.localidade;
      })
      .catch((error) => {
        console.error("Erro ao buscar o CEP:", error);
      });
  }
  //Função para formatar o cep
  document.getElementById("cep").addEventListener("input", function () {
    var cep = this.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if (cep.length === 8) {
      cep = cep.replace(/^(\d{5})(\d{3})$/, "$1-$2"); // Formatar CEP
    }
    this.value = cep;
  });
  