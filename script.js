const inputTache = document.getElementById('tache');
const boutonAjouter = document.getElementById('ajouter');
const boutonSupprimer = document.getElementById('supprimer');
const liste = document.getElementById('liste');
const message = document.getElementById('message');

boutonSupprimer.style.display = 'none';

function majAffichageBoutonSupprimer() {
  const checkboxes = document.querySelectorAll('#liste input[type="checkbox"]');
  const auMoinsUnCoche = Array.from(checkboxes).some(cb => cb.checked);
  boutonSupprimer.style.display = auMoinsUnCoche ? 'block' : 'none';
}

function supprimerTachesCochees() {
  const taches = document.querySelectorAll('#liste li');
  taches.forEach(tache => {
    const checkbox = tache.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      tache.remove();
    }
  });
  majAffichageBoutonSupprimer();
}

function ajouterTache() {
  const texte = inputTache.value.trim();
  if (texte === '') {
    message.textContent = 'Écris une tâche avant d’ajouter !';
    return;
  }
  message.textContent = '';

  // On peut enlever cette ligne si on ne veut pas supprimer automatiquement les cochées à chaque ajout
  // supprimerTachesCochees();

  const nouvelleTache = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      nouvelleTache.classList.add('completed');
    } else {
      nouvelleTache.classList.remove('completed');
    }
    majAffichageBoutonSupprimer();
  });

  const texteTache = document.createTextNode(texte);

  nouvelleTache.appendChild(checkbox);
  nouvelleTache.appendChild(texteTache);
  liste.appendChild(nouvelleTache);

  inputTache.value = '';
  inputTache.focus();

  majAffichageBoutonSupprimer();
}

// Ajouter tâche au clic
boutonAjouter.addEventListener('click', ajouterTache);

// Ajouter tâche avec Enter
inputTache.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    ajouterTache();
  }
});

// Supprimer cochées au clic
boutonSupprimer.addEventListener('click', supprimerTachesCochees);