const animeForm = document.querySelector("#animeInfoForm");
const DateForm1 = document.querySelector("#diaDeLancamentoEp");
const DateForm2 = document.querySelector("#dataDeLancamento");
const modId = document.querySelector("#modId");

function excluirById() {
  let dataAllForms = JSON.parse(localStorage.getItem("animeDataLS"));
  const idAt = parseInt(document.querySelector("#removeId").value, 10);

  dataAllForms.splice(idAt, 1);

  for (let i = 0; i < dataAllForms.length; i++)
  {
    dataAllForms[i].id = i;
  }

  console.log(localStorage.getItem("animeDataLS"));
  console.log(dataAllForms[idAt]);
  console.log(dataAllForms);
  console.log(idAt);

  localStorage.setItem("animeDataLS", JSON.stringify(dataAllForms));

  inserirNaTabela();
}

function modficarById() {
  let dataAllForms = JSON.parse(localStorage.getItem("animeDataLS"));
  const idAt = modId.value;

  let animeName = document.querySelector("#name");
  let animeLink = document.querySelector("#link");
  let animeStatus = document.querySelector("#statusAcompanhamento");
  let epAtual = document.querySelector("#epAtual");
  let dateTemp;
  if (DateForm1.value !== "") {
    dateTemp = DateForm1.value;
  } else if (DateForm2.value !== "") {
    dateTemp = DateForm2.value;
  } else {
    dateTemp = "";
  }

  if (animeName.value == "") {
    animeName.value = dataAllForms[idAt].name;
  }
  if (animeLink.value == "") {
    animeLink.value = dataAllForms[idAt].link;
  }
  if (animeStatus.value == "") {
    animeStatus.value = dataAllForms[idAt].status;
  }
  if (epAtual.value == "") {
    epAtual.value = dataAllForms[idAt].ep;
  }
  if (dateTemp == "") {
    dateTemp.value = dataAllForms[idAt].date;
  }

  dataAllForms[idAt] = {
    id: idAt,
    name: animeName.value,
    link: animeLink.value,
    status: animeStatus.value,
    date: dateTemp,
    ep: epAtual.value,
  };

  console.log(localStorage.getItem("animeDataLS"));
  console.log(dataAllForms[idAt]);
  console.log(dataAllForms);
  console.log(idAt);

  localStorage.setItem("animeDataLS", JSON.stringify(dataAllForms));

  inserirNaTabela();
}

function limparTudo() {
  localStorage.clear();
  inserirNaTabela();
}

function inserirNaTabela() {
  const dataTabAnime = JSON.parse(localStorage.getItem("animeDataLS"));
  let tabela = document.querySelector("#animeList");
  tabela.innerHTML = "";

  dataTabAnime.forEach((linha) => {
    let tr = document.createElement("tr");
    tr.className = "tab_in_text";

    let colID = document.createElement("td");
    colID.innerHTML = linha.id;

    let colNameLink = document.createElement("td");
    let animeLink = document.createElement("a");
    animeLink.href = linha.link;
    animeLink.textContent = linha.name;

    let colStatus = document.createElement("td");
    colStatus.innerHTML = linha.status;

    let colEp = document.createElement("td");
    let changeEP = document.createElement("input");
    changeEP.type = "number";
    changeEP.value = linha.ep;
    changeEP.min = 0;
    changeEP.max = 2000;

    colEp.addEventListener("change", () => {
      dataTabAnime[linha.id].ep = changeEP.value;
      localStorage.setItem("animeDataLS", JSON.stringify(dataTabAnime));
      inserirNaTabela();
    });

    let colDate = document.createElement("td");
    colDate.innerHTML = linha.date;

    tabela.appendChild(tr);
    tr.appendChild(colID);
    colNameLink.appendChild(animeLink);
    tr.appendChild(colNameLink);
    tr.appendChild(colStatus);
    colEp.appendChild(changeEP);
    tr.appendChild(colEp);
    tr.appendChild(colDate);

    console.log("Executou col");
  });

  modId.max = dataTabAnime.length - 1;
}

function verificarSTLancamento() {
  const spanDateForm1 = document.querySelector("#spanPutDateLancando");
  const spanDateForm2 = document.querySelector("#spanPutDateBreve");

  const statusLancamento = document.querySelector("#statusLancamento");

  if (statusLancamento.value == "lancando") {
    spanDateForm1.style.display = "block";
    spanDateForm2.style.display = "none";

    DateForm2.value = "";
  } else if (statusLancamento.value == "breve") {
    spanDateForm1.style.display = "none";
    spanDateForm2.style.display = "block";

    DateForm1.value = "";
  } else {
    spanDateForm1.style.display = "none";
    spanDateForm2.style.display = "none";

    DateForm1.value = "";
    DateForm2.value = "";
  }
}

animeForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita o recarregamento da página quando eu envio o form

  const animeName = document.querySelector("#name");
  const animeLink = document.querySelector("#link");
  const animeStatus = document.querySelector("#statusAcompanhamento");
  const epAtual = document.querySelector("#epAtual");
  let dateTemp;
  if (DateForm1.value !== "") {
    dateTemp = DateForm1.value;
  } else if (DateForm2.value !== "") {
    dateTemp = DateForm2.value;
  } else {
    dateTemp = "";
  }

  const LSTransform = localStorage.getItem("animeDataLS");

  let animeDataAll = [];

  if (LSTransform) {
    animeDataAll = JSON.parse(LSTransform);
  }

  const objNum = animeDataAll.length;
  const animeDataForm = {
    id: objNum,
    name: animeName.value,
    link: animeLink.value,
    status: animeStatus.value,
    date: dateTemp,
    ep: epAtual.value,
  };

  animeDataAll.push(animeDataForm);

  console.log(animeDataAll);

  localStorage.setItem("animeDataLS", JSON.stringify(animeDataAll));

  console.log(localStorage.getItem("animeDataLS"));
  console.log(JSON.parse(localStorage.getItem("animeDataLS")));

  const numElements = animeForm.elements;

  for (let i = 0; i < numElements.length; i++) {
    if (
      numElements[i].type !== "submit" &&
      numElements[i].type !== "reset" &&
      numElements[i].value !== "Modificar por Id"
    ) {
      numElements[i].value = "";
    }
  }

  verificarSTLancamento();
  inserirNaTabela();
});

verificarSTLancamento();
inserirNaTabela();