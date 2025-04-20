
let currentTest = null;
let questions = [];

function addQuestion(prefill) {
  const index = questions.length;
  const block = document.createElement('div');
  block.className = 'question-block';
  const del = document.createElement('button');
  del.className = 'delete-q';
  del.textContent = 'Удалить вопрос';
  del.onclick = () => {
    const idx = questions.indexOf(block);
    questions.splice(idx, 1);
    block.remove();
  };
  block.appendChild(del);

  const qInput = document.createElement('input');
  qInput.type = 'text';
  qInput.placeholder = `Вопрос ${index + 1}`;
  qInput.value = prefill ? prefill.question : '';
  block.appendChild(qInput);

  const answers = prefill ? prefill.answers : ['', '', '', ''];
  const correct = prefill ? prefill.correct : 0;
  for (let i = 0; i < 4; i++) {
    const lbl = document.createElement('label');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = `correct${index}`;
    if (i === correct) cb.checked = true;
    cb.onclick = () => {
      document.querySelectorAll(`input[name='correct${index}']`).forEach(x => x.checked = false);
      cb.checked = true;
    };
    const txt = document.createElement('input');
    txt.type = 'text';
    txt.placeholder = `Ответ ${i + 1}`;
    txt.value = answers[i];
    lbl.append(cb, txt);
    block.appendChild(lbl);
  }

  document.getElementById('questions').appendChild(block);
  questions.push(block);
}

function saveTest() {
  const name = document.getElementById('test-name').value.trim();
  const course = document.getElementById('test-course').value.trim();
  if (!name || !course) return alert('Укажите название теста и курса!');

  const data = questions.map((b, i) => {
    const texts = b.querySelectorAll('input[type=text]');
    const q = texts[0].value;
    const ans = Array.from(texts).slice(1).map(x => x.value);
    const corr = Array.from(b.querySelectorAll('input[type=checkbox]')).findIndex(c => c.checked);
    return { question: q, answers: ans, correct: corr };
  });

  const all = JSON.parse(localStorage.getItem('tests')) || [];
  const testObj = { name, course, data };
  if (currentTest !== null) all[currentTest] = testObj;
  else all.push(testObj);

  localStorage.setItem('tests', JSON.stringify(all));
  alert('✅ Тест сохранён!');
  resetForm();
  loadTests();
}

function resetForm() {
  document.getElementById('test-name').value = '';
  document.getElementById('test-course').value = '';
  document.getElementById('questions').innerHTML = '';
  questions = [];
  currentTest = null;
}

function clearAll() {
  if (confirm("Удалить все тесты и контент?")) {
    localStorage.removeItem("tests");
    localStorage.removeItem("eduContent");
    resetForm();
    alert("🧹 Все тесты очищены.");
    loadTests();
  }
}

function loadTests() {
  const allTests = JSON.parse(localStorage.getItem("tests")) || [];
  const list = document.getElementById("test-list");
  if (!list) return;
  list.innerHTML = '';
  allTests.forEach((test, i) => {
    const item = document.createElement('div');
    item.className = 'test-item';
    item.innerHTML = `
      <span><b>${test.name}</b> — ${test.course}</span>
      <div>
        <button onclick="editTest(${i})">Өзгерту </button>
        <button onclick="deleteTest(${i})">Тазалау </button>
      </div>
    `;
    list.appendChild(item);
  });
}

function editTest(i) {
  const all = JSON.parse(localStorage.getItem('tests')) || [];
  const t = all[i];
  currentTest = i;
  document.getElementById('test-name').value = t.name;
  document.getElementById('test-course').value = t.course || '';
  document.getElementById('questions').innerHTML = '';
  questions = [];
  t.data.forEach(q => addQuestion(q));
}

function deleteTest(i) {
  const all = JSON.parse(localStorage.getItem('tests')) || [];
  all.splice(i, 1);
  localStorage.setItem('tests', JSON.stringify(all));
  loadTests();
}

window.addEventListener("DOMContentLoaded", loadTests);
