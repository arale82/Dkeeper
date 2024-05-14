import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [newNote, setNewNote] = useState({});
  const [isFormOpen, setFormOpen] = useState(false);

  function handleChange(event){
    const { name, value } = event.target;

    setNewNote(prevValue => {
      return({
        ...prevValue,
        [name] : value
      });
    });

  }

  function handleClick(){
    setFormOpen(true);
  }

  return (
    <div>
      <form className="create-note">
        <Zoom in={isFormOpen}>
          <input style={!isFormOpen && {display: "none"}} value={newNote.title} onChange={handleChange} name="title" placeholder="Title" />
        </Zoom>
        <textarea 
          value={newNote.content}
          onClick={handleClick} 
          onChange={handleChange} name="content" placeholder="Take a note..." 
          rows={(isFormOpen) ? "3" : "1"} />
        <Zoom in={isFormOpen}>
          <Fab onClick={(event) => {
          props.onSubmit(newNote);
          setNewNote({title : "", content : ""});
      }}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
