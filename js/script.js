// Selecao dos Elementos
const todoForm = document.getElementById('todo-form');
const formControl = document.getElementById('form-control');
const todoInput = document.getElementById('todo-input');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const buttonCancel = document.getElementById('cancel-edit-btn');
const todoList = document.getElementById('todo-list');
const filterList = document.getElementById('filter');

let oldInpuVaue;

//Funcoes
const saveTodo= (text) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;

    todo.appendChild(todoTitle);
    console.log(todo);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);
    
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);
    
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-todo');
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoInput.value = ''; //Limpa a caixa de Texto
    todoInput.focus();
}

//Eventos
todoForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    // console.log('Envio')
    const inpuValue = todoInput.value;

    if(inpuValue){
        // console.log(inpuValue);
        saveTodo(inpuValue);
    }
})
// Criando a função para esconder e mostrar o formulario
const toggleForm = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (text) =>{
    const allTodos = document.querySelectorAll(".todo");

    allTodos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3');
        if(todoTitle.innerText === oldInpuVaue){
            todoTitle.innerText = text;
        }
    })
}

//Identificando um elemento butom

document.addEventListener('click', (e)=>{
    const targetEll= e.target;
    // console.log(targetEll);
    const parentEl = targetEll.closest('div');//Aplicando a acção no elemento pai mais proximo.

    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEll.classList.contains('finish-todo')){
        // if(parentEl.classList.contains('done')){
        //     parentEl.classList.remove('done');
        // }else{
        //     parentEl.classList.add('done');
        // }
        //Toda esta espreção é facilmente substituida pela linha a seguir
        parentEl.classList.toggle('done');
        // console.log('clicou Finish');
    }
    if(targetEll.classList.contains('edit-todo')){
        toggleForm();
        
        editInput.value = todoTitle; 
        oldInpuVaue = todoTitle;
        
        console.log('Clicou Edite');
    }
    if(targetEll.classList.contains('remove-todo')){
        parentEl.remove();
        // console.log('Clicou Remover');
    }
})

// Cancelar a alteração e voltar no normal 
buttonCancel.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForm();
})

editForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        //Actualizar a edição
        updateTodo(editInputValue);
    }
    toggleForm();
})