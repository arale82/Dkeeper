import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { DKeeper, dkeeper_backend } from "../../../declarations/dkeeper_backend";
import { Notes } from "@mui/icons-material";

function App() {
  const [note, setNote] = useState([]);
  const [noteIndex, setNoteIndex] = useState(0);

  useEffect(() => {
    readNotes();
    readIndex();
  }, []);

  async function readIndex(){
    const fetchIndex = await dkeeper_backend.readIndex();
    setNoteIndex(parseInt(fetchIndex));
  }

  async function readNotes(){
    const fetchNotes = await dkeeper_backend.readNotes();
    setNote(fetchNotes);
  }

  function addNote(newNote){
    setNote(prevValue => {
      return [{
        title : newNote.title, 
        content : newNote.content,
        id : noteIndex}, ...prevValue];
    });

    dkeeper_backend.createNote(newNote.title, newNote.content);
    setNoteIndex(noteIndex+1);
  }

  function deleteNote(key){
    console.log("deletekey"+key);
    setNote(prevValue => {
      return prevValue.filter((note) => parseInt(note.id) !== key)
    });
    dkeeper_backend.deleteNote(parseInt(key));
  }

  return (
    <div>
      <Header />
      <CreateArea onSubmit={addNote} />
      {note.map(note => 
      <Note key={parseInt(note.id)} id={parseInt(note.id)}
        title={note.title}
        content={note.content}
        deleteButton={deleteNote} />
      )}
      
      <Footer />
    </div>
  );
}

export default App;
