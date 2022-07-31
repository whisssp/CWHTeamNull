import { canisterId,createActor,idlFactory,projectHackathon_backend } from "../../declarations/projectHackathon_backend";

let principal = ''
const displayPrincipal = document.querySelector('.display-principal')
const btnConnect = document.querySelector('.btn-connect')
const bodyTable = document.querySelector('#tbodySinhVien')

const fname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const dateOfBirth = document.querySelector("#dateofbirth");
const femaleBtn = document.querySelector("#female");
const maleBtn = document.querySelector("#male");
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const btnSave = document.querySelector(".btn-save");
const btnCancel = document.querySelector(".btn-cancel");

function fillTable() {
   projectHackathon_backend.getListCustomer().then((values) => {
      let html = ''
      console.log(values)
      values.forEach(item => {
         const customer = item[1]
         html+=` <tr>
                   <th>${item[0]}</th>
                   <th>${customer.name}</th>
                   <th>${customer.birthday}</th>
                   <th>${customer.phone}</th>
                   <th>${customer.sex}</th>
                   <th>
                     <button class="btn-update" data-index='${item[0]}'>Update</button>
                     <button class="btn-delete" data-index='${item[0]}'>Delete</button>
                   <th>
               </tr>`
      })
      bodyTable.innerHTML = html
      const btnUpdate = document.querySelector('.btn-update')
      const btnDelete = document.querySelector('.btn-delete')
      if(btnDelete)  {
         btnDelete.onclick =  (e) => {
            projectHackathon_backend.deleteAccount(parseInt(e.target.dataset.index+'')).then((t) => {})
            fillTable()
            console.log(e.target?.dataset.index)
         }
      }
   })
}

btnConnect.onclick = () => {
   getConnect()
   fillTable()
}

async function  getConnect() {
   const t = await window?.ic?.plug?.requestConnect()
   principal = await window.ic.plug.principalId
   console.log(principal)
   displayPrincipal.innerText = principal
}

btnSave.onclick = (e) => {
   e.preventDefault()
   const customer = {
      name: fname.value + ' ' + lastname.value,
      birthday: dateOfBirth.value,
      phone: phone.value,
      sex: maleBtn.checked?'Male':'Female',
      address: address.value,
   }
   projectHackathon_backend.createAccount(customer).then((t) => {})
   fillTable()
}


