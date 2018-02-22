'use strict'

let isDown = false;
let offset = [];
let div = null;
const MENU_HEIGHT = 35;

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        let mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);

let app = new Vue({
  el: '#app',
  data: {
    blocks: [],
    editorMode: true,
    newPos: 50
  },
  methods: {
    addBlock() {
      this.blocks.push({class: {top: this.newPos, left: this.newPos}, file : null, type: null});
      this.newPos += 10;
    },
    deleteBlock(index) {
      this.blocks.splice(index, 1);
    },
    clearBlocks() {
      this.blocks = [];
    },
    mousedown(e) {
      if (e.target.className.toLowerCase() === 'block' && this.editorMode) {
        isDown = true;
        div = e.target;
        offset = [
          e.target.offsetLeft - e.clientX,
          e.target.offsetTop - e.clientY
        ];
      }
    },
    mouseup(e, index) {
      if (e.target.className.toLowerCase() === 'block' && this.editorMode) {
        isDown = false;
        this.blocks[index].class.left = (e.clientX + offset[0]);
        this.blocks[index].class.top  = (e.clientY + offset[1]);
      }
    },
    onFileChange(e, index) {
      let files = e.target.files;
      if (!files.length)
        return;
      if (files[0].type.includes('image')) {
        this.blocks[index].type = 'image';
        this.createFile(files[0], index);
      }
      else if (files[0].type.includes('audio')) {
        this.blocks[index].type = 'audio';
        this.createFile(files[0], index);
      }
      else if (files[0].type.includes('video')) {
        this.blocks[index].type = 'video';
        this.createFile(files[0], index);
      }
      else {
        this.blocks[index].type = 'wrong type';
        alert('Wrong file type');
      }
    },
    createFile(newFile, index) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.blocks[index].file = e.target.result;
      };
      reader.readAsDataURL(newFile);
    },
    deleteFile(index) {
      this.blocks[index].file = null;
      this.blocks[index].type = null;
    },
    startStop() {
      this.editorMode = !this.editorMode;

      for (let media of document.querySelectorAll('video, audio')) {
        if (!this.editorMode) {
          media.play();
        } else {
          media.pause();
        }
      }
      for (let block of this.blocks) {
        if (!this.editorMode) {
          block.class.top += MENU_HEIGHT;
        } else {
          block.class.top -= MENU_HEIGHT;
        }
      }
    }
  }
});
