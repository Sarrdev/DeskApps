let usersTasks = {};

window.onload = function() {
    const savedTasks = localStorage.getItem('usersTasks');
    if (savedTasks) {
        usersTasks = JSON.parse(savedTasks);
        displayTasks();
    }
};

function addTask() {
    const nomPersonne = document.getElementById('nom-personne').value;
    const title = document.getElementById('titre-tache').value;
    const description = document.getElementById('tache-dscription').value;
    const deadline = document.getElementById('tache-deadline').value;
    const priority = document.getElementById('tache-priorite').value;

    if (nomPersonne === '' || title === '' || description === '' || deadline === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    if (!usersTasks[nomPersonne]) {
        usersTasks[nomPersonne] = [];
    }

    const task = {
        nomPersonne,
        title,
        description,
        deadline,
        priority,
        completed: false
    };
    usersTasks[nomPersonne].push(task);
    saveTasks();
    displayTasks();
    clearForm();
}

function saveTasks() {
    localStorage.setItem('usersTasks', JSON.stringify(usersTasks));
}

function displayTasks() {
    const taskList = document.getElementById('tache-list-ul');
    taskList.innerHTML = '';

    Object.values(usersTasks).forEach(userTasks => {
        userTasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
            <strong>${task.nomPersonne}</strong><br>  
            Titre: ${task.title}<br>
            Description: ${task.description}<br>
            Date Limite: ${task.deadline}<br>
            Priorité: ${task.priority}<br> 
            État d'Avancement: ${task.completed ? 'Terminé' : 'En Cours'}
            <div class="task-actions">
                <button onclick="toggleTaskCompletion('${task.nomPersonne}', ${userTasks.indexOf(task)})" class="btn btn-toggle-completion">Marquer comme Terminé</button>
                <button onclick="editTask('${task.nomPersonne}', ${userTasks.indexOf(task)})" class="btn btn-edit">Modifier</button>
                <button onclick="deleteTask('${task.nomPersonne}', ${userTasks.indexOf(task)})" class="btn btn-delete">Supprimer</button>
            </div>
            `;
            taskList.appendChild(li);
        });
    });
}

function toggleTaskCompletion(nomPersonne, index) {
    usersTasks[nomPersonne][index].completed = !usersTasks[nomPersonne][index].completed;
    saveTasks();
    displayTasks();
}

function editTask(nomPersonne, index) {
    const updatedTitle = prompt('Nouveau titre:', usersTasks[nomPersonne][index].title);
    const updatedDescription = prompt('Nouvelle description:', usersTasks[nomPersonne][index].description);
    const updatedDeadline = prompt('Nouvelle date limite:', usersTasks[nomPersonne][index].deadline);
    const updatedPriority = prompt('Nouvelle priorité:', usersTasks[nomPersonne][index].priority);

    if (updatedTitle && updatedDescription && updatedDeadline && updatedPriority) {
        usersTasks[nomPersonne][index].title = updatedTitle;
        usersTasks[nomPersonne][index].description = updatedDescription;
        usersTasks[nomPersonne][index].deadline = updatedDeadline;
        usersTasks[nomPersonne][index].priority = updatedPriority;
        saveTasks();
        displayTasks();
    }
}

function deleteTask(nomPersonne, index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        usersTasks[nomPersonne].splice(index, 1);
        saveTasks();
        displayTasks();
    }
}

function clearForm() {
    document.getElementById('nom-personne').value = '';
    document.getElementById('titre-tache').value = '';
    document.getElementById('tache-dscription').value = '';
    document.getElementById('tache-deadline').value = '';
    document.getElementById('tache-priorite').value = 'Faible';
}
