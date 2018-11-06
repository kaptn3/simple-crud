// Vue
var vueApp = new Vue({
  el: '.app',
  data() {
    return {
      data: 0,
      editedUser: null
    }
  },
  methods: {
    initData() {
      fetch('api', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.data = data
      })
      .catch(error => console.error('Error:', error));
    },
    editData(id) {
      this.editedUser = id
    },
    saveData(index) {
      fetch('api', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': this.data[index]._id,
          'regNumber': this.data[index].regNumber,
          'serialNumber': this.data[index].serialNumber,
          'manufacturer': this.data[index].manufacturer,
          'type': this.data[index].type,
          'date': this.data[index].date,
          'airlines': this.data[index].airlines,
          'status': this.data[index].status
        })
      })
      .then(response => {
        if (response.ok) {
          this.editedUser = null;
          this.initData();
        }
      })
    }
  },
  mounted() {
    this.initData();
  }
});