import React, { useRef, useEffect } from 'react';

function CalculatorPage() {

    const displayRef = useRef(null);

    function appendToDisplay(input) {
        displayRef.current.value += input;
    }
    
    function clearDisplay() {
        displayRef.current.value = "";
    }
    
    function calculate() {
        try {
            displayRef.current.value = eval(displayRef.current.value);
        } catch (error) {
            displayRef.current.value = "Error";
        }
    }
    

    // notes 
    function popup() {
        const popupContainer = document.createElement("div");
        popupContainer.innerHTML = `
        <div id="popupContainer">
            <h1>New Note</h1>
            <textarea id="note-text" placeholder="Enter your note..."></textarea>
            <div id="btn-container">
                <button id="submitBtn">Create Note</button>
                <button id="closeBtn">Close</button>
            </div>
        </div>
    `;
        document.body.appendChild(popupContainer);

        document.getElementById("submitBtn").onclick = createNote;
        document.getElementById("closeBtn").onclick = closePopup;
    }

    // Close note popup
    function closePopup() {
        const popupContainer = document.getElementById("popupContainer");
        if (popupContainer) popupContainer.remove();
    }

    // Create new note and save to localStorage
    function createNote() {
        const popupContainer = document.getElementById('popupContainer');
        const noteText = document.getElementById('note-text').value.trim();
        if (noteText !== '') {
            const note = {
                id: new Date().getTime(),
                text: noteText
            };
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            popupContainer.remove();
            displayNotes();
        }
    }

    // Display all notes in the list
    function displayNotes() {
        const notesList = document.getElementById('notes-list');
        if (!notesList) return;

        notesList.innerHTML = '';
        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <span>${note.text}</span>
            <div id="noteBtns-container">
                <button class="editBtn" data-id="${note.id}"><i class="fa-solid fa-pen"></i></button>
                <button class="deleteBtn" data-id="${note.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
            notesList.appendChild(listItem);
        });

        document.querySelectorAll('.editBtn').forEach(button => {
            button.onclick = () => editNote(button.getAttribute('data-id'));
        });

        document.querySelectorAll('.deleteBtn').forEach(button => {
            button.onclick = () => deleteNote(button.getAttribute('data-id'));
        });
    }

    // Show edit popup for selected note
    function editNote(noteId) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const noteToEdit = notes.find(note => note.id == noteId);
        const noteText = noteToEdit ? noteToEdit.text : '';

        const editingPopup = document.createElement("div");
        editingPopup.innerHTML = `
        <div id="editing-container" data-note-id="${noteId}">
            <h1>Edit Note</h1>
            <textarea id="note-text">${noteText}</textarea>
            <div id="btn-container">
                <button id="submitBtn">Done</button>
                <button id="closeBtn">Cancel</button>
            </div>
        </div>
    `;
        document.body.appendChild(editingPopup);

        document.getElementById("submitBtn").onclick = updateNote;
        document.getElementById("closeBtn").onclick = closeEditPopup;
    }

    // Close edit popup
    function closeEditPopup() {
        const editingPopup = document.getElementById("editing-container");
        if (editingPopup) editingPopup.remove();
    }

    // Save updated note
    function updateNote() {
        const noteText = document.getElementById('note-text').value.trim();
        const editingPopup = document.getElementById('editing-container');
        const noteId = editingPopup.getAttribute('data-note-id');

        if (noteText !== '') {
            let notes = JSON.parse(localStorage.getItem('notes')) || [];
            const updatedNotes = notes.map(note =>
                note.id == noteId ? { ...note, text: noteText } : note
            );
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            editingPopup.remove();
            displayNotes();
        }
    }

    // Delete a note
    function deleteNote(noteId) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note.id != noteId);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }

    // Call this on page load
    window.onload = () => {
        displayNotes();
    }

    return (
        <header>

            <div className="componentContainer">

                <div id="calculator">
                    
                    <input id="display" ref={displayRef} readOnly></input>
                    <div id="keys">
                        <button onClick={() => appendToDisplay('+')} className="operator-btn">+</button>
                        <button onClick={() => appendToDisplay('7')}>7</button>
                        <button onClick={() => appendToDisplay('8')}>8</button>
                        <button onClick={() => appendToDisplay('9')}>9</button>
                        <button onClick={() => appendToDisplay('-')} className="operator-btn">-</button>
                        <button onClick={() => appendToDisplay('4')}>4</button>
                        <button onClick={() => appendToDisplay('5')}>5</button>
                        <button onClick={() => appendToDisplay('6')}>6</button>
                        <button onClick={() => appendToDisplay('*')} className="operator-btn">*</button>
                        <button onClick={() => appendToDisplay('1')}>1</button>
                        <button onClick={() => appendToDisplay('2')}>2</button>
                        <button onClick={() => appendToDisplay('3')}>3</button>
                        <button onClick={() => appendToDisplay('/')} className="operator-btn">/</button>
                        <button onClick={() => appendToDisplay('0')}>0</button>
                        <button onClick={() => appendToDisplay('.')}>.</button>
                        <button onClick={calculate}>=</button>
                        <button onClick={clearDisplay} className="operator-btn">C</button>
                    </div>
                </div>

                <div className="container">

                    <div className="board-header">
                        <div className="addNotesDiv" onClick={popup}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <div className="blankDiv" ></div>
                        <div className="blankDiv" ></div>
                    </div>

                    <div className="list-Container">
                        <ul id="notes-list"></ul>
                    </div>
                </div>

                <div className="musicTheme">
                    <div className="muiscContainer">
                        <div className="music-Box">
                            <iframe src="https://www.youtube.com/embed/lTRiuFIWV54?si=w9b0ihw85p8onOd_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>

                        <div className="music-Box">
                            <iframe src="https://www.youtube.com/embed/rJO84scyxqo?si=BbZUZAv_6cdUoOMS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>                        
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default CalculatorPage;