const socket = io.connect();

export const saveNote = (title, description) => {
  socket.emit("client:newnote", {
    title,
    description,
  });
};

export const deleteNote = (id) => {
  socket.emit("client:deletenote", id);
};

export const updateNote = (_id, title, description) => {
  socket.emit("client:updatenote", {
    _id,
    title,
    description,
  });
};

export const loadNotes = (callback) => {
  socket.on("server:loadnotes", callback);
};

export const onNewNote = (callback) => {
  socket.on("server:newnote", callback);
};

export const onSelected = (callback) => {
  socket.on("server:selectednote", callback);
};

export const getNoteById = (noteId) => {
  socket.emit("client:getnote", noteId);
};