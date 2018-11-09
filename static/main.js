// Vue
var vueApp = new Vue({
  el: '.app',
  data() {
    return {
      data: 0,
      editedUser: null,
      isOpenModal: false,
      form: {
        regNumber: 0,
        serialNumber: 0,
        manufacturer: 0,
        type: 0,
        date: 0,
        airlines: 0,
        status: 0
      }
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
    sendData() {
      fetch('api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': this.form._id,
          'regNumber': this.form.regNumber,
          'serialNumber': this.form.serialNumber,
          'manufacturer': this.form.manufacturer,
          'type': this.form.type,
          'date': this.form.date,
          'airlines': this.form.airlines,
          'status': this.form.status
        })
      })
      .then(response => {
        if (response.ok) {
          this.initData();
        }
      })
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
    },
    deleteData(id) {
      fetch('api', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': id
        })
      })
      .then(res => {
        if (res.ok) return res.json()
      }).
      then(data => {
        this.initData();
      })
    },
    openModal() {
      this.isOpenModal = !this.isOpenModal;
    }
  },
  mounted() {
    this.initData();
  }
});