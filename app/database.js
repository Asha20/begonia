import Firebase from "firebase";

const config = {
  apiKey: "AIzaSyCzplRModOK-ir_ybndG10S6croPq1I8fU",
  authDomain: "begonia-cbe77.firebaseapp.com",
  databaseURL: "https://begonia-cbe77.firebaseio.com",
  storageBucket: "begonia-cbe77.appspot.com",
  messagingSenderId: "656500064171"
};

Firebase.initializeApp(config);

let Database = {
  db: Firebase.database(),

  loadNotes(callback) {
    return this.db.ref("notes").once("value").then(callback);
  },

  addNote(note) {
    const newNote = this.db.ref("notes").push();
    newNote.set({
      title: note.title,
      content: note.content,
      key: newNote.key
    });
    return newNote;
  },

  removeNote(key) {
    this.db.ref("notes").child(key).remove();
  }
};

export default Database;