import Firebase from "firebase";

const config = {
  apiKey: "AIzaSyCzplRModOK-ir_ybndG10S6croPq1I8fU",
  authDomain: "begonia-cbe77.firebaseapp.com",
  databaseURL: "https://begonia-cbe77.firebaseio.com",
  storageBucket: "begonia-cbe77.appspot.com",
  messagingSenderId: "656500064171"
};

Firebase.initializeApp(config);

const Database = {
  db: Firebase.database(),

  notes(uid) {
    return this.db.ref("users/" + uid);
  },

  categories(uid) {
    return this.db.ref("categories/" + uid);
  },

  loadNotes(uid, callback) {
    return this.notes(uid)
      .once("value")
      .then(callback);
  },

  loadCategories(uid, callback) {
    return this.categories(uid)
      .once("value")
      .then(callback);
  },

  createNote(uid, note) {
    const newNote = this.notes(uid).push();
    newNote.set(Object.assign({}, note, {
      key: newNote.key
    }));
    return newNote;
  },

  editNote(uid, note) {
    this.notes(uid).child(note.key).set(note);
    return note;
  },

  removeNote(uid, key) {
    this.notes(uid).child(key).remove();
  },

  createCategory(uid, category) {
    const newCategory = this.categories(uid).push();
    newCategory.set(Object.assign({}, category));
    return newCategory;
  },

  removeCategory(uid, key) {
    this.categories(uid).child(key).remove();
  }
};

const Auth = Firebase.auth();

export {Database, Auth};