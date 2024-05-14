import List "mo:base/List";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

actor Dkeeper {
  // public query func greet(name : Text) : async Text {
  //   return "Hello, " # name # "!";
  // };

  public type Note = {
    title : Text;
    content : Text;
    id : Nat;
  };

  stable var notes: List.List<Note> = List.nil<Note>();
  //notes := List.nil<Note>();
  stable var noteIndex: Nat = 0;
  //noteIndex := 0;

  public func createNote(titleText : Text, contentText : Text){
    //create new note object
    let newNote = {
      title = titleText;
      content = contentText;
      id = noteIndex;
    };
    //add new note to list
    notes := List.push(newNote, notes);
    //increase counter
    increaseIndex();
    
  };

  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

  public func deleteNote(id : Nat){
    notes := List.filter<Note>(notes, func note { 
      Debug.print(debug_show(note.id + id));
      note.id != id;
      });
  };

  public query func readIndex() : async Nat {
    //every time we re
    return noteIndex;
  };

  public func increaseIndex(){
    noteIndex += 1;
  }

};
