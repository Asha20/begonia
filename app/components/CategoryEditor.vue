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
              <label for="category-editor__color">Color:</label>
              <br>
              <input v-model="color" type="color">
            </div>
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="confirm()">Confirm</button>
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
        color: "#000000"
      }
    },

    computed: {
      formTests() {
        return [
          {
            container: $("#category-editor__name-holder"),
            conditions: [this.name.trim() !== ""],
            message: $("#category-editor__name-message")
          }
        ];
      }
    },

    methods: {
      confirm() {
        if (validate(this.formTests)) {
          Events.emit(this.mode.name, Object.assign(
            {},
            {
              name: this.name.trim(),
              color: this.color,
            },
            this.mode.name === "Category__save--create" ? {} :
            {
              key: this.mode.category.key
            }
          ));

          this.name = "";
          this.color = "#000000";
          $("#category-editor").modal("hide");
        }
      }
    },

    created() {
      Events.on("Editor__open--category", () => {
        this.name = "";
        this.color = "#000000";
        $("#category-editor").modal("show");
        $("#category-editor").on("shown.bs.modal", function() {
          $("#category-editor__name").focus();
        });

        this.mode = {
          name: "Category__save--create"
        };

        $("#note-editor__category").selectpicker("refresh");
      });

      //

      Events.on("Category__edit", category => {
        this.name = category.name;
        this.color = category.color;
        this.mode = {
          name: "Category__save--edit",
          category
        };

        $("#category-editor").modal("show");
        $("#category-editor__color").selectpicker("refresh");
      });
    },

    filters: {
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }
  };
</script>