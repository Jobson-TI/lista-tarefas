const task = document.getElementById('task-name');
const taskList = document.getElementById('task-list');
const add = document.getElementById('adc');

function adicionarTarefa() {
    const texto = task.value.trim();
    if(texto === ''){
        alert('Digite uma tarefa');
    } else {
        criarTarefa(texto, false);
        task.value = '';
    }
    salvarTarefas();
};

function criarTarefa(texto, concluido) {
    const txt = document.createElement('li');
    const del = document.createElement('button');
    const span = document.createElement('span');

    del.textContent = 'X';
    span.textContent = texto;
    taskList.appendChild(txt);
    txt.appendChild(span);        
    txt.appendChild(del); 
    del.addEventListener('click', function (event) {
            event.stopPropagation();
            txt.remove();
            salvarTarefas();
        });
        txt.addEventListener('click', function () {
            span.classList.toggle('completo');
            salvarTarefas();
        });   
        if(concluido) {
            span.classList.add('completo');
        };
};

task.addEventListener('keydown', function (event){
    if(event.key === 'Enter'){
        adicionarTarefa();
    };
});

add.addEventListener('click', adicionarTarefa);

function salvarTarefas() {
    const tarefas = []
    const itens = taskList.querySelectorAll('span');
    
    itens.forEach(function (item){
        tarefas.push({
            texto: item.textContent,
            concluido: item.classList.contains('completo')
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
};

function carregarTarefas() {
    const list = JSON.parse(localStorage.getItem('tarefas'));

    if(list){
        list.forEach(function (tarefa){
            criarTarefa(tarefa.texto, tarefa.concluido);
        });
    } 
};

carregarTarefas();