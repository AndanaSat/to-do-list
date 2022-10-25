<template>
  <div class="list">
    <h2>Add</h2>
    <form>
      <p>activity :</p>
      <input type="text" v-model="iactivity">
      <p>type :</p>
      <select v-model="itype">
        <option>personal</option>
        <option>work</option>
      </select>
      <div class="time">
        <p>hour :</p>
        <input type="text" v-model="ihour">
        <p>date :</p>
        <input type="text" v-model="idate">
        <p>month :</p>
        <input type="text" v-model="imonth">
        <button @click="addData()">add</button>
      </div>
    </form>
    <br>
    <h2>Edit</h2>
    <form>
      <p>activity :</p>
      <input type="text" v-model="eactivity">
      <p>type :</p>
      <select v-model="etype">
        <option>personal</option>
        <option>work</option>
      </select>
      <div class="time">
        <p>hour :</p>
        <input type="text" v-model="ehour">
        <p>date :</p>
        <input type="text" v-model="edate">
        <p>month :</p>
        <input type="text" v-model="emonth">
      </div>
    </form>
    <br>
    <br>
    <h3>To Do List</h3>
    <br>
    <br>
    <p>show: </p>
    <select v-model="show">
      <option>all</option>
      <option>personal</option>
      <option>work</option>
    </select>
    <br>
    <br>
    <br>
    <table>
      <tr>
        <td>activity</td>
        <td>type</td>
        <td>hour</td>
        <td>time</td>
        <td>check</td>
        <td>delete</td>
        <td>edit</td>
      </tr>
    </table>
    <table v-if="show == 'all'">
      <tr v-for="(fblist, id) in fblists" :key="id">
        <td>{{ fblist.activity }}</td>
        <td>{{ fblist.type }}</td>
        <td>{{ fblist.hour }}</td>
        <td>{{ fblist.time }}</td>
        <td><button @click="checkList(fblist)">check</button></td>
        <td><button @click="removeData(fblist)">delete</button></td>
        <td><button @click="editData(fblist)">edit</button></td>
      </tr>
    </table>
    <table v-if="show == 'personal'">
      <tr v-for="(fblist, id) in fblists" :key="id">
        <td v-if="fblist.type == 'personal'">{{ fblist.activity }}</td>
        <td v-if="fblist.type == 'personal'">{{ fblist.type }}</td>
        <td v-if="fblist.type == 'personal'">{{ fblist.hour }}</td>
        <td v-if="fblist.type == 'personal'">{{ fblist.time }}</td>
        <td v-if="fblist.type == 'personal'"><button @click="checkList(fblist)">check</button></td>
        <td v-if="fblist.type == 'personal'"><button @click="removeData(fblist)">delete</button></td>
        <td v-if="fblist.type == 'personal'"><button @click="editData(fblist)">edit</button></td>
      </tr>
    </table>
    <table v-if="show == 'work'">
      <tr v-for="(fblist, id) in fblists" :key="id">
        <td v-if="fblist.type == 'work'">{{ fblist.activity }}</td>
        <td v-if="fblist.type == 'work'">{{ fblist.type }}</td>
        <td v-if="fblist.type == 'work'">{{ fblist.hour }}</td>
        <td v-if="fblist.type == 'work'">{{ fblist.time }}</td>
        <td v-if="fblist.type == 'work'"><button @click="checkList(fblist)">check</button></td>
        <td v-if="fblist.type == 'work'"><button @click="removeData(fblist)">delete</button></td>
        <td v-if="fblist.type == 'work'"><button @click="editData(fblist)">edit</button></td>
      </tr>
    </table>
    <br>
    <br>
    <h3>Alredy Checked</h3>
    <br>
    <table>
      <tr>
        <td>activity</td>
        <td>type</td>
        <td>hour</td>
        <td>time</td>
        <td>uncheck</td>
      </tr>
      <tr v-for="(fblist, id) in fblists" :key="id">
        <td v-if="fblist.status == true">{{ fblist.activity }}</td>
        <td v-if="fblist.status == true">{{ fblist.type }}</td>
        <td v-if="fblist.status == true">{{ fblist.hour }}</td>
        <td v-if="fblist.status == true">{{ fblist.time }}</td>
        <td v-if="fblist.status == true"><button @click="checkList(fblist)">uncheck</button></td>
      </tr>
    </table>

  </div>
</template>

<script>
  import { initializeApp } from "firebase/app";
  import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "@firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyDCwJzpI9mE0BZNWGSmLlBn2Zitk0itwHg",
    authDomain: "todolist-6d472.firebaseapp.com",
    projectId: "todolist-6d472",
    storageBucket: "todolist-6d472.appspot.com",
    messagingSenderId: "868258812620",
    appId: "1:868258812620:web:cbe3b409eb49a3d52e6869"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  /*onMounted(() => {
    onSnapshot(collection(db, "lists"), (querySnapshot) => {
      const fblist = []
      querySnapshot.forEach((doc) => {
        const list = {
          id: doc.id,
          activity: doc.data().activity,
          type: doc.data().type,
          hour: doc.data().hour,
          time: doc.data().time,
          status: doc.data().status
        }
        fblist.push(list);
      })
      lists.value = fblist;
    })
  });*/

  export default {
    name: 'ListView',
    data () {
      return {
        show: "",
        iactivity: "",
        itype: "",
        ihour: "",
        idate: "",
        imonth: "",
        eactivity: "",
        etype: "",
        ehour: "",
        edate: "",
        emonth: "",
        fblists: [],
        lists: [],
      }
    },
    mounted () {
      this.load();
    },
    methods: {
      async addData () {
        try {
          const doc = await addDoc(collection(db, "lists"), {
            activity: this.iactivity,
            type: this.itype,
            hour: this.ihour,
            time: this.idate + "/" + this.imonth,
            status: false,
          });
          console.log("document written with id :", doc.id);
          this.load();
        }
        catch(err) {
          console.log("error when adding document :", err);
        }
      },
      
      async removeData (fblist){
        try {
          await deleteDoc(doc(db, "lists", fblist.id));
          console.log("removing document with id :", fblist.id);
          this.load();
        }
        catch(err) {
          console.log("error when deleting document :", err);
        }
      },

      async editData (fblist) {
        try {
          const docRef = doc(db, "lists", fblist.id);
          var list = {
            activity: this.eactivity,
            type: this.etype,
            hour: this.ehour,
            time: this.edate + "/" + this.emonth,
          }
          await updateDoc(docRef, list);
          this.load();
          console.log("updated a document with id :", fblist.id);
        }
        catch(err) {
          console.log("error when updating data with id", fblist.id, err);
        }
      },

      async checkList (fblist) {
        try {
          const docRef = doc(db, "lists", fblist.id);
          var list = {
            status: !fblist.status
          }
          await updateDoc(docRef, list);
          this.load();
          console.log("updated a document with id :", fblist.id);
        }
        catch(err) {
          console.log("error when updating data with id", fblist.id, err);
        }
      },

      async load () {
        try {
          const querySnapshot = await getDocs(collection(db, "lists"));
          this.fblists = [];
          querySnapshot.forEach((doc) => {
            var list = {
              id: doc.id,
              activity: doc.data().activity,
              type: doc.data().type,
              hour: doc.data().hour,
              time: doc.data().time,
              status: doc.data().status
            };
            this.fblists.push(list);
          })
          this.lists.push(this.fblists);
          console.log(this.lists);
        }
        catch(err) {
          console.log(err.massage);
        }
      }
    },
  }
</script>
