| Event Name             | Emitted when…                                                                                  | Emitted by     | Listened by      | 
|------------------------|------------------------------------------------------------------------------------------------|----------------|------------------| 
| Note__save--create     | The “Confirm” button has been pressed in the Note Editor and the editor is in “New Note” mode  | NoteEditor     | App              | 
| Note__save--edit       | The “Confirm” button has been pressed in the Note Editor and the editor is in “Edit Note” mode | NoteEditor     | App              | 
| Category__create       | The “Confirm” button has been pressed in the Category Editor                                   | CategoryEditor | App              | 
| Note__select           | A note has been pressed inside NoteList                                                        | NoteList       | App; NoteDisplay | 
| Note__edit             | The edit button next to a note has been pressed                                                | NoteList       | NoteEditor       | 
| Note__delete           | The delete button next to a note has been pressed                                              | NoteList       | App; NoteDisplay | 
| Editor__open--note     | The “Create Note” button has been pressed                                                      | NoteList       | NoteEditor       | 
| Editor__open--category | The “Create Category” button has been pressed                                                  | NoteList       | CategoryEditor   | 
