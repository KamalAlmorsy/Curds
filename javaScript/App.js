// get Total 
//Create prodect
//save at local storege
//clear crud
//read
//count
////delete
//update
//search
//clean data
var title =document.getElementById('titlee');
var price =document.getElementById('price');
var taxes =document.getElementById('taxes');
var ads =document.getElementById('ads');
var discount =document.getElementById('discount');
var total =document.getElementById('total');
var count =document.getElementById('count');
var category =document.getElementById('category');
var submit =document.getElementById('submit');

let mood='create';
let tmp;
//console.log(title,price,taxes,ads,discount,total,count,category,submit)

 /*start function get total*/
 function getTotal()
 {
  if(price.value != ''){
     var result= (+price.value + +taxes.value + +ads.value) 
      - +discount.value
      total.innerHTML = result;
      total.style.background ='#0405'
  }else{
    total.innerHTML = '';
    total.style.background =''
  }
 }



/* craete func */


let dataPro;
if(localStorage.product != null){ /*i defined data before add diffrent data use this */
    dataPro=JSON.parse(localStorage.product) /*use Json parse ==> we handeled the data under by json.stringfy() , and must here return on normal to add to local storage agin + new data  */
}else{
    dataPro=[]
}
 /*مكان وجود الdata*/

  submit.onclick = function ()
  {
   var newObject ={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
   }
   if(title.value != '' && price.value != '' && category.value != '' && newObject.count <= 100){
    if(mood === 'create'){
      if(newObject.count > 1){ 
        for(let i = 0 ;i<newObject.count ; i++){ // الاضافه علي حسبب العدد المكتوب في حقل count
             dataPro.push(newObject);
        }
      }else{
        dataPro.push(newObject);
      }
     } else{
        dataPro[tmp]=newObject; /*tmp =====> فيها الانديكس اللي عاوز اعدله*/
        mood ='create';
        submit.innerHTML='Create';
        count.style.display='block';
      }
   ClearData();
   }
 
 // save local storege
    localStorage.setItem('product', JSON.stringify(dataPro));
   // console.log(dataPro);
   // data call ==> delete all data when click on create button
   ShowData(); /*work if click on button create */
  }

//   clear function 

  function ClearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value='',
    category.value=''
  }

  //read func

  function ShowData(){
    getTotal();
    var table ='';
  for(let i = 0 ; i < dataPro.length ; i++){
      table += `
          <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i});" id="update">update</button> </td>
                    <td><button onclick="DeleteData(${i});" id="delate">delate</button></td>
          </tr>
      `; 

  }
  document.getElementById('tbody').innerHTML = table;


  var btnDeleteAll =document.getElementById('deleteAll');
   if(dataPro.length > 0){
      btnDeleteAll.innerHTML=`
                     <button onclick="deleteAll();">delate All (${dataPro.length})</button>
      `
   }else{
       btnDeleteAll.innerHTML = ''
   }

}
ShowData(); /*always work always display the data */

// delate func

function DeleteData(i){
 
 dataPro.splice(i,1); /*just delete from Array */
 localStorage.product= JSON.stringify(dataPro); /*this line mean delete object from localStorege */
 ShowData(); /*call this data here mean when click on button delete delete the (td) from table   */
};

//create delete all

function deleteAll(){
    localStorage.clear(); /*delete from local storege */
    dataPro.splice(0);/*delete (all) in table from index 0 to ===== */
    ShowData(); /*to update the place in the table */
}

//count func
//add element according to count of count number put in input count....
// this code in line 61 to 67

//update data

 function updateData(i){
        title.value=dataPro[i].title;
        price.value=dataPro[i].price;
        taxes.value=dataPro[i].taxes;
        ads.value=dataPro[i].ads;
        discount.value=dataPro[i].discount;
        getTotal();
        count.style.display='none';
        category.value=dataPro[i].category;
        submit.innerHTML = 'Update';
        mood='update';
        tmp=i;
        scroll({
          top:0
        })
 }

 //search

 let searchMood='title';


 function getSearchMood(id){ /*onclick*/
  let search =document.getElementById('search');
      if(id == 'searchBytitle'){
          searchMood='title';
         }else{
           searchMood='category';
       }
          search.placeholder = 'search by '+searchMood;
             search.focus();
                  search.value = '';
                       ShowData();
       }



        function searchData (value){
          let table ='';
          for(let i = 0 ; i<dataPro.length ; i++ ){
                if(searchMood == 'title'){

                   if(dataPro[i].title.includes(value.toLowerCase())){
                    table += `
                    <tr>
                              <td>${i}</td>
                              <td>${dataPro[i].title}</td>
                              <td>${dataPro[i].price}</td>
                              <td>${dataPro[i].taxes}</td>
                              <td>${dataPro[i].ads}</td>
                              <td>${dataPro[i].discount}</td>
                              <td>${dataPro[i].total}</td>
                              <td>${dataPro[i].category}</td>
                              <td><button onclick="updateData(${i});" id="update">update</button> </td>
                             <td><button onclick="DeleteData(${i});" id="delate">delate</button></td>
                    </tr>
                `; 

                   }

   }else{
  
                    if(dataPro[i].category.includes(value.toLowerCase())){
                    table += `
                             <tr>
                             <td>${i}</td>
                             <td>${dataPro[i].title}</td>
                             <td>${dataPro[i].price}</td>
                             <td>${dataPro[i].taxes}</td>
                             <td>${dataPro[i].ads}</td>
                             <td>${dataPro[i].discount}</td>
                             <td>${dataPro[i].total}</td>
                             <td>${dataPro[i].category}</td>
                             <td><button onclick="updateData(${i});" id="update">update</button> </td>
                             <td><button onclick="DeleteData(${i});" id="delate">delate</button></td>
                              </tr>
                       `; 

      }
   }
   document.getElementById('tbody').innerHTML = table;
       }
      }

  