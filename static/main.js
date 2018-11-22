// Vue
var vueApp = new Vue({
  el: '.app',
  data() {
    return {
      data: 0,
      editedUser: null,
      isOpenModal: false,
      form: {},
      newForm: []
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
      for (i in this.newForm) {
        if(this.newForm[i].one && typeof(this.newForm[i].one) === 'string' && this.newForm[i].two) {
          this.form[this.newForm[i].one] = this.newForm[i].two;
        }
      }
      fetch('api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          this.form
        )
      })
      .then(response => {
        if (response.ok) {
          this.initData();
          this.closeModal();
        }
      })
    },
    saveData(index) {
      fetch('api', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          this.data[index]
        )
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
      this.isOpenModal = true;
      this.form = {
        regNumber: '',
        serialNumber: '',
        manufacturer: '',
        type: '',
        date: '',
        airlines: '',
        status: ''
      },
      this.newForm = [];
    },
    closeModal() {
      this.isOpenModal = false;
    },
    addNewField() {
      this.newForm.push({
        one: '',
        two: ''
      });
    },
    deleteNewField(index) {
      this.newForm.splice(index,1);
    }
  },
  mounted() {
    this.initData();
  }
});