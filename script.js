let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editingId = null;

function renderNotes() {
    const list = document.getElementById('note-list');
    const search = document.getElementById('search').value.toLowerCase();
    
    list.innerHTML = '';
    
    const filtered = notes.filter(note => 
        note.title.toLowerCase().includes(search) || 
        note.content.toLowerCase().includes(search)
    );

    filtered.forEach((note, index) => {
        const li = document.createElement('li');
        li.className = 'note-item' + (editingId === index ? ' active' : '');
        li.textContent = note.title || '无标题';
        li.onclick = () => loadNote(index);
        list.appendChild(li);
    });
}

function addNote() {
    notes.push({ title: '', content: '' });
    editingId = notes.length - 1;
    document.getElementById('edit-title').focus();
    renderNotes();
}

function loadNote(id) {
    editingId = id;
    const note = notes[id];
    document.getElementById('edit-title').textContent = note.title;
    document.getElementById('edit-content').value = note.content;
    renderNotes();
}

function saveNote() {
    if (editingId !== null) {
        notes[editingId] = {
            title: document.getElementById('edit-title').textContent,
            content: document.getElementById('edit-content').value
        };
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
}

function deleteNote() {
    if (editingId !== null) {
        notes.splice(editingId, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        editingId = null;
        renderNotes();
    }
}

document.getElementById('search').addEventListener('input', renderNotes);

// 初始化
renderNotes();
