const navLetters = document.querySelectorAll('.letter-nav span');
const stallions = document.querySelectorAll('.stallion');
const stallionList = document.querySelector('.stallion-list');
const searchInput = document.getElementById('search');

let currentLetter = 'A'; // Default letter

// ✅ Sort stallions first by breed, then by name
const sortedStallions = Array.from(stallions).sort((a, b) => {
  const breedA = a.dataset.breed.trim().toLowerCase();
  const breedB = b.dataset.breed.trim().toLowerCase();

  if (breedA === breedB) {
    const nameA = a.querySelector('h2').textContent.trim().toLowerCase();
    const nameB = b.querySelector('h2').textContent.trim().toLowerCase();
    return nameA.localeCompare(nameB);
  }

  return breedA.localeCompare(breedB);
});

// Replace current order with sorted order
stallionList.innerHTML = '';
sortedStallions.forEach(stallion => stallionList.appendChild(stallion));

// ---- Existing functions below ----

// Show stallions for selected letter
function showLetter(letter) {
  currentLetter = letter.toUpperCase();
  searchInput.value = ''; // clear search when switching letters

  sortedStallions.forEach(stallion => {
    const breed = stallion.dataset.breed.trim().toUpperCase();
    if (breed.startsWith(currentLetter)) {
      stallion.style.display = 'block';
    } else {
      stallion.style.display = 'none';
    }
  });
}

// Search across all stallions
function searchStallions() {
  const query = searchInput.value.trim().toLowerCase();

  if (query === '') {
    showLetter('A');
    return;
  }

  sortedStallions.forEach(stallion => {
    const breed = stallion.dataset.breed.trim().toLowerCase();
    const name = stallion.querySelector('h2').textContent.trim().toLowerCase();

    if (breed.includes(query) || name.includes(query)) {
      stallion.style.display = 'block';
    } else {
      stallion.style.display = 'none';
    }
  });
}

// Letter navigation click
navLetters.forEach(letter => {
  letter.addEventListener('click', () => {
    showLetter(letter.dataset.letter);
  });
});

// Search input: filter while typing
searchInput.addEventListener('input', searchStallions);

// Search input: filter on Enter key
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchStallions();
  }
});

// Show default letter on page load
showLetter('A');
