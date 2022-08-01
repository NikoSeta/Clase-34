import { appendNote, renderNotes, fillForm, onHandleSubmit } from "./ui.js";
import { loadNotes, onNewNote, onSelected } from "./sockets.js";

const socket = io.connect();

const saveNote = (title, description) => {
  socket.emit("client:newnote", {
    title,
    description,
  });
};

const deleteNote = (id) => {
  socket.emit("client:deletenote", id);
};

const updateNote = (_id, title, description) => {
  socket.emit("client:updatenote", {
    _id,
    title,
    description,
  });
};

const loadNotes = (callback) => {
  socket.on("server:loadnotes", callback);
};

const onNewNote = (callback) => {
  socket.on("server:newnote", callback);
};

const onSelected = (callback) => {
  socket.on("server:selectednote", callback);
};

const getNoteById = (noteId) => {
  socket.emit("client:getnote", noteId);
};

window.addEventListener("DOMContentLoaded", () => {
  loadNotes(renderNotes);
  onNewNote(appendNote);
  onSelected(fillForm);
});

const noteForm = document.querySelector("#noteForm");
noteForm.addEventListener("submit", onHandleSubmit);

module.exports = {
    saveNote,
    deleteNote,
    updateNote,
    getNoteById
}

import { deleteNote, getNoteById, saveNote, updateNote } from "./sockets.js";

const notesList = document.querySelector("#notes");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

let savedId = "";

const noteUI = (note) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${note.title}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${note._id}">delete</button>
              <button class="btn btn-secondary update" data-id="${note._id}">update</button>
          </div>
      </div>
      <p>${note.description}</p>
  </div>
`;
  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () => deleteNote(btnDelete.dataset.id));
  btnUpdate.addEventListener("click", () => getNoteById(btnDelete.dataset.id));

  return div;
};

export const renderNotes = (notes) => {
  savedId = "";
  notesList.innerHTML = "";
  notes.forEach((note) => notesList.append(noteUI(note)));
};

export const appendNote = (note) => {
  notesList.append(noteUI(note));
};

export const fillForm = (note) => {
  title.value = note.title;
  description.value = note.description;

  savedId = note._id;
};

export const onHandleSubmit = (e) => {
  e.preventDefault();
  if (savedId) {
    updateNote(savedId, title.value, description.value);
  } else {
    saveNote(title.value, description.value);
  }

  title.value = "";
  description.value = "";
};