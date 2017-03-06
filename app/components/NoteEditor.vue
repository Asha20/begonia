<template>
  <div class="modal fade" id="note-editor" tabindex="-1" role="dialog" aria-labelledby="note-editor-label">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="note-editor-label">New Note</h4>
        </div>
        <div class="modal-body">
          <form>
            <div id="note-editor__title-holder" class="form-group">
              <label for="note-editor__title">Title:</label>
              <input type="text" class="form-control" id="note-editor__title" v-model="title">
              <span id="note-editor__title-message" class="help-block hide">This field is required.</span>
            </div>
            <div id="note-editor__content-holder" class="form-group">
              <label for="note-editor__content">Content:</label>
              <textarea class="form-control" id="note-editor__content" v-model="content"></textarea>
              <span id="note-editor__content-message" class="help-block hide">This field is required.</span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="createNote">Create Note</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Events from "../events";

  export default {
    data() {
      return {
        title: "",
        content: ""
      }
    },

    methods: {
      validate(conditions) {
        const statuses = [];

        const check = function({container, condition, message}) {
          if (condition) {
            statuses.push({
              "valid": true,
              container,
              message
            });
          } else {
            statuses.push({
              "valid": false,
              container,
              message
            });
          }
        };

        conditions.forEach(condition => check(condition));

        let isSucess = true;

        for (let status of statuses) {
          if (status.valid) {
            status.container.removeClass("has-error");
            status.message.addClass("hide");
          } else {
            status.container.addClass("has-error");
            status.message.removeClass("hide");
            isSucess = false;
          }
        }

        return isSucess;
      },

      createNote() {
        const validated = this.validate([
          {
            container: $("#note-editor__title-holder"),
            condition: this.title !== "",
            message: $("#note-editor__title-message")
          },
          {
            container: $("#note-editor__content-holder"),
            condition: this.content !== "",
            message: $("#note-editor__content-message")
          }
        ]);

        if (validated) {
          Events.emit("noteCreated", {
            title: this.title,
            content: this.content
          });

          this.title = "";
          this.content = "";
          $("#note-editor").modal("hide");
        }

      }
    },

    created() {
      Events.on("openEditor", () => {
        $("#note-editor").modal("show");
      });
    }
  };
</script>