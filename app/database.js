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
    return this.db.ref("notes")
      .once("value")
      .then(callback);
  },

  loadCategories(callback) {
    return this.db.ref("categories")
      .once("value")
      .then(callback);
  },

  createNote(note) {
    const newNote = this.db.ref("notes").push();
    newNote.set(Object.assign({}, note, {
      key: newNote.key
    }));
    return newNote;
  },

  editNote(note) {
    this.db.ref("notes").child(note.key).set(note);
    return note;
  },

  removeNote(key) {
    this.db.ref("notes").child(key).remove();
  },

  createCategory(category) {
    const newCategory = this.db.ref("categories").push();
    newCategory.set(Object.assign({}, category));
    return newCategory;
  },

  removeCategory(key) {
    this.db.ref("categories").child(key).remove();
  }
};

export default Database;