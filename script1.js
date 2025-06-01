const perguntas = [
  { pergunta: "Qual o seu gênero?", opcoes: ["Masculino", "Feminino"] },
  { pergunta: "Você mora em uma zona urbana ou rural?", opcoes: ["Zona Urbana", "Zona Rural"] },
  { pergunta: "Quantas pessoas moram com você?", opcoes: ["Moro sozinho", "Moro com uma pessoa", "Moro com duas pessoas", "Moro com três ou mais"] },
  { pergunta: "Qual a sua idade?", opcoes: ["Menor de 18 anos", "18-30 anos", "30-50 anos", "60 ou mais"] },
  { pergunta: "Qual é o seu nível de escolaridade no momento?", opcoes: ["Ensino Fundamental", "Ensino Médio", "Faculdade", "Não estou estudando"] },
  { pergunta: "Você estuda em ensino público ou privado?", opcoes: ["Público", "Privado", "Educação em casa", "Não estudo"] },
  { pergunta: "Você está trabalhando no momento?", opcoes: ["Sim", "Não"] },
  { pergunta: "Em lugares públicos, você utiliza as lixeiras seletivas?", opcoes: ["Sempre", "Frequentemente", "Às vezes", "Raramente", "Nunca"] },
  { pergunta: "Você reutiliza talheres, copos ou garrafas descartáveis?", opcoes: ["Sempre", "Frequentemente", "Às vezes", "Raramente", "Nunca"] },
  { pergunta: "Com que frequência você troca de celular?", opcoes: ["1 ano", "3 anos", "5 anos", "8 anos ou mais", "Nunca troquei"] },
  { pergunta: "Você usa transporte público ou veículo próprio?", opcoes: ["Transporte Público", "Veículo Próprio", "Nenhum"] },
  { pergunta: "Você usa sacolas recicláveis?", opcoes: ["Sim", "Não"] },
  { pergunta: "Com que frequência consome alimentos processados?", opcoes: ["Sempre", "Frequentemente", "Às vezes", "Raramente", "Nunca"] },
  { pergunta: "Você joga lixo em locais inadequados?", opcoes: ["Sempre", "Frequentemente", "Às vezes", "Raramente", "Nunca"] },
  { pergunta: "Quanto tempo as luzes da sua casa ficam acesas?", opcoes: ["O dia todo", "10-12 horas", "6-8 horas", "3-4 horas", "2 horas ou menos"] },
  { pergunta: "Com que frequência toma banho?", opcoes: ["4 ou mais vezes", "3 vezes", "2 vezes", "1 vez"] },
  { pergunta: "Quanto tempo você usa eletrônicos diariamente?", opcoes: ["8h ou mais", "4-6h", "2-3h", "1h ou menos", "Nunca"] },
  { pergunta: "Quanto tempo gasta água diariamente?", opcoes: ["5h ou mais", "3-4h", "2h", "1h", "50 min ou menos"] },
  { pergunta: "Com que frequência usa produtos de plástico?", opcoes: ["Sempre", "Frequentemente", "Às vezes", "Raramente", "Nunca"] },
  { pergunta: "E produtos biodegradáveis?", opcoes: ["Sempre", "Frequentemente", "Às vezes", "Raramente", "Nunca"] },
  { pergunta: "Você já praticou compostagem?", opcoes: ["Sim", "Não"] },
  { pergunta: "Você usa energia renovável?", opcoes: ["Sim", "Não", "Pretendo usar", "Já usei no passado"] }
];

let respostas = [];
let indice = 0;

const startBtn = document.getElementById("startBtn");
const questionario = document.getElementById("questionario");
const telaFinal = document.getElementById("telaFinal");
const listaRespostas = document.getElementById("listaRespostas");
const intro = document.getElementById("intro");
const refazerBtn = document.getElementById("refazerBtn");

startBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  mostrarPergunta();
});

function mostrarPergunta() {
  if (indice >= perguntas.length) {
    finalizarQuestionario();
    return;
  }

  const questao = perguntas[indice];

  let html = `<div class="question-box"><p>${questao.pergunta}</p><form id="formPergunta">`;

  questao.opcoes.forEach((opcao, idx) => {
    const id = `opcao${indice}_${idx}`;
    html += `
      <label class="opcao-btn" for="${id}">
        <input type="radio" id="${id}" name="opcao" value="${opcao}">
        ${opcao}
      </label>`;
  });

  html += `
      <button type="button" id="btnProximo" disabled>Próximo</button>
    </form></div>`;

  questionario.innerHTML = html;
  questionario.classList.remove("hidden");

  const form = document.getElementById("formPergunta");
  const btnProximo = document.getElementById("btnProximo");
  const inputs = form.querySelectorAll('input[name="opcao"]');

  inputs.forEach(input => {
    input.addEventListener("change", () => {
      btnProximo.disabled = false;

      form.querySelectorAll("label").forEach(label => label.classList.remove("selecionado"));
      const labelSelecionado = input.closest("label");
      if (labelSelecionado) {
        labelSelecionado.classList.add("selecionado");
      }
    });
  });

  btnProximo.addEventListener("click", () => {
    const selecionado = form.opcao.value;
    if (selecionado) {
      respostas.push(selecionado);
      indice++;
      mostrarPergunta();
    }
  });
}

function finalizarQuestionario() {
  questionario.classList.add("hidden");
  telaFinal.classList.remove("hidden");

  listaRespostas.innerHTML = respostas.map((res, i) => `
    <li><strong>${perguntas[i].pergunta}</strong>: ${res}</li>
  `).join('');
}

refazerBtn.addEventListener("click", () => {
  respostas = [];
  indice = 0;
  telaFinal.classList.add("hidden");
  intro.classList.remove("hidden");
});
