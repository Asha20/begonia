<template>
  <div class="modal fade" id="category-editor" tabindex="-1" role="dialog" aria-labelledby="category-editor-label">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="category-editor-label">New Note</h4>
        </div>
        <div class="modal-body">
          <form>
            <div id="category-editor__name-holder" class="form-group">
              <label for="category-editor__name">Name:</label>
              <input type="text" class="form-control" id="category-editor__name" v-model="name">
              <span id="category-editor__name-message" class="help-block hide">This field is required.</span>
            </div>
            <div id="category-editor__color-holder" class="form-group">
              <label for="category-editor__color">Content:</label>
              <br>
              <select data-width="100%" class="selectpicker" id="category-editor__color" v-model="color">
                <option value="none">Pick a color...</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
              </select>
              <span id="category-editor__color-message" class="help-block hide">You need to pick a color.</span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="createCategory()">Create Category</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Events from "../events";
  import validate from "../helpers/ValidateForm";

  export default {
    data() {
      return {
        name: "",
        color: "none"
      }
    },

    computed: {
      formTests() {
        return [
          {
            container: $("#category-editor__name-holder"),
            conditions: [this.name.trim() !== ""],
            message: $("#category-editor__name-message")
          },
          {
            container: $("#category-editor__color-holder"),
            conditions: [this.color !== "none"],
            message: $("#category-editor__color-message")
          }
        ];
      }
    },

    methods: {
      createCategory() {
        if (validate(this.formTests)) {
          Events.emit("Category__create", {
            name: this.name.trim(),
            color: this.color,
          });

          this.name = "";
          this.color = "none";
          $("#category-editor").modal("hide");
        }
      }
    },

    created() {
      Events.on("Editor__open--category", () => {
        this.name = "";
        $("#category-editor").modal("show");
        $("#category-editor").on("shown.bs.modal", function() {
          $("#category-editor__name").focus();
        })
      });
    }
  };
</script>