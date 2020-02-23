<template>

    <div>
       <ul>
      <li v-for="photo in photos" v-bind:key="photo.id">
        <img :src=photo.url>
      </li>
      <p>Styled with a little sass</p>
    </ul>
    </div>

</template>

<script>
const URL = 'https://jsonplaceholder.typicode.com/photos';

export default {
	data() {
    return {
         el: '#app', 
      photos: [],
      load: [],
      page: 1,
    };
  },
  mounted() {
      console.log("mounted working");
    this.getContentFromApi();
  },
  methods: {
    updateScrollEvent() {
              console.log("update scroll working");
      var updated = false;
      window.onscroll = ev => {
        var userPosition = window.innerHeight + window.scrollY;
        var height = document.body.offsetHeight;
        if (!updated && userPosition >= height) {
          updated = true;
          this.getContentFromApi();
        }
      };
    },
    getContentFromApi() {
      console.log("Getting Content From API...");
      //document.write(content);
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?_limit=5&_page=${this.page++}`
        )
        .then(res => {
                console.log("then working");
          this.photos = [...this.photos, ...res.data];
          res.data.forEach(item => {
            var img = new Image();
            img.src = item.url;
            console.log(item.url);
            img.onload = () => {
              console.log("onload working");
              this.load.push(img.src);
              if (this.load.length == this.photos.length) {
                this.updateScrollEvent();
              }
            };
          });
        })
        .catch(err => console.log(err));
    }
  }
}
</script>

<style lang="sass">
body{
    background: blue;
}
</style>

