
let myTableBody = document.getElementById('tBodyId');

// view
let myModelTit = document.getElementById('modelTitleId');
let myModelDesc = document.getElementById('modelDescriptionId');

//Add item into a Todo 
function addItemFn() 
{
        console.log('add Fn.....');
        myTit = document.getElementById('titleId').value;
        myDesc = document.getElementById('descriptionId').value;

        if(myTit!= "" && myDesc!="")
        {
            if(localStorage.getItem('myItem') == null)
            {
                
                itemArray = [];
                itemArray.push([myTit, myDesc]);
                localStorage.setItem('myItem', JSON.stringify(itemArray));
            } 
            else 
            {
                itemArrayStr = localStorage.getItem('myItem');
                itemArray = JSON.parse(itemArrayStr);
                itemArray.push([myTit, myDesc]);
                localStorage.setItem('myItem', JSON.stringify(itemArray));
            }
        } 
        else {
            console.log("fields are empty")
        }

        reActivity();
}

//refresh
function reActivity()
{
    console.log("refresh activity call");
    // calling back todoitems activity
    if(localStorage.getItem('myItem') == null) 
    {
        itemArray = [];
        localStorage.setItem('myItem', JSON.stringify(itemArray));
    }
    else 
    {
        itemArrayStr = localStorage.getItem('myItem');
        itemArray = JSON.parse(itemArrayStr);
    }

    rowStr();
}

// row structure
function rowStr() 
{
    console.log("row structure call");
    let str="";
    itemArray.forEach((element,index) => {
        str += `
        <tr>
        <th scope="row">${index +1}</th>
        <td><center>${element[0]}</center></td> 
       
        <td><center>
           <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#showDesModelId" onclick="viewDescFn(${index})">View</button>

          <button class="btn btn-sm btn-primary" onclick= "deleteFn(${index})" >Done</button>
        </center></td>
        </tr>
        `;
    });

    myTableBody.innerHTML = str;
}

// refresh activity call
reActivity();


//on click delete Fn
function deleteFn(itemIndex) {
    console.log("item Deleted");
    if(confirm("Task completed.."))
    {
        itemArrayStr = localStorage.getItem('myItem');
        itemArray = JSON.parse(itemArrayStr);

        itemArray.splice(itemIndex, 1);
        localStorage.setItem('myItem', JSON.stringify(itemArray));
    }
    reActivity();
}

function clearListFn(itemIndex) {
    console.log("clearing list");
    if(confirm("Do u really want to clear a whole list..?"))
    {
        itemArrayStr = localStorage.getItem('myItem');
        itemArray = JSON.parse(itemArrayStr);
        itemArray.splice(itemIndex, itemArray.length);
        localStorage.setItem('myItem', JSON.stringify(itemArray));
    }
    reActivity();
}

function viewDescFn(myViewIndex)
{
    console.log("view desc call");
    let strTit="";
    let strDesc="";
    itemArray.forEach((element,index) => {
        
        if(index == myViewIndex) 
        {
            strTit += ` 
            <h3><center>${element[0]}</center></h3>  `;
            
            strDesc += `       
            <div class="mb-5">
              <label class="col-form-label">Description</label>

              <textarea class="form-control" id="modelDescriptionId">${element[1]}</textarea>
              
              <div class="form-text">
                <ul>
                 <li>from right bottom corner you can extract list for better view..</li>
                </ul>
              </div>
            </div>

            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
            `;
        }
        
    });

    myModelTit.innerHTML = strTit;
    myModelDesc.innerHTML = strDesc;

}




















// bootstrap js - control of 'model'
// myShowModel.addEventListener('show.bs.modal', () => {

// });

// des model
// myShowDesModel.addEventListener('click', viewDescFn(itemDesc));














// let str="";
// itemArray.forEach((element,index) => {
//     str += `
//     <tr>
//     <th scope="row">${index +1}</th>     //num of tasks
//     <td><center>${element[0]}</center></td>   //num of title 
   
//     <td><center>
//        <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#showDesModelId" onclick="viewDescFn(${index},${element[1]})">View</button>
// deleting particular item with index position 

//       <button class="btn btn-sm btn-primary" onclick= "deleteFn(${index})" >Done</button>
//     </center></td>
//     </tr>
//     `;
// });

// myTableBody.innerHTML = str;