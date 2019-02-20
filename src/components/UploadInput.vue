<template>
  <v-container fluid>
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <img :src="imageUrl" height="150" v-if="imageUrl">
      <v-text-field :rules="fieldRules" :label="title" @click="pickFile" v-model="imageName" prepend-icon="attach_file"></v-text-field>
      <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
    </v-flex>
  </v-container>
</template>
<script>
export default {
  props: {
    fileChangedCallback: {
      default: undefined,
      type: Function
    },
    title: {
      default: undefined
    }
  },
  data: () => ({
    dialog: false,
    imageName: "",
    imageUrl: "",
    imageFile: "",
    fieldRules: [
      v => !!v || "Este campo é obrigatório" //testing this feature
    ],
  }),
  methods: {
    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0];
          this.fileChangedCallback({
            imageUrl: this.imageUrl,
            imageFile: this.imageFile
          });
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    }
  }
};
</script>
