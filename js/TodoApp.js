var Apikey="666a129560a208ee1fdbc389";
let inputdata=document.getElementById('inputdata');
let rowdata=document.getElementById('row-data');
let cancel=document.getElementById('cancel');
let success=document.getElementById('success');
let fail=document.getElementById('fail');
getallTodos();
async function addTodo(){
    if(success.classList.contains('d-block')){
        success.classList.replace('d-block','d-none')
    }
    else{
        success.classList.replace('d-none','d-block')
    }
       var body={
            title:inputdata.value,
            apiKey:Apikey
        }
       

    try{
        var response=await fetch('https://todos.routemisr.com/api/v1/todos',{
        method:'POST',
        body:JSON.stringify(body),
        headers:{'Content-Type':'application/json'}
    })
    var data=await response.json();
    getallTodos();
    console.log(data);
    }

    catch(error){
        console.log(error);
    }
}


function clearinput(){
    inputdata.value=null;
}




    inputdata.addEventListener('keyup',function(e){
        if(e.key=='Enter'){
              addTodo();
              clearinput();
        }
          
    })




    async function getallTodos(){
 
       var response= await fetch(`https://todos.routemisr.com/api/v1/todos/${Apikey}`)
           var data=await response.json();
           var list=data.todos;
        //    console.log(list)
        displayalldata(list);
    }









    function displayalldata(list){
        container='';
        for(let i=0;i<list.length;i++){
            container+= `<div  class="  mx-auto w-50 d-flex justify-content-between align-items-center">
            <p class="fs-5 ">${list[i].title}</p>
                <div class="icon rounded-5 d-flex  justify-content-center align-items-center">
                    <i onclick="deleteTodo('${list[i]._id}')" class="fa-solid fa-xmark text-light"></i>
                </div>
            
        </div>`
        }

        rowdata.innerHTML=container;
    }



    async function deleteTodo(id){
        if(fail.classList.contains('d-block')){
            fail.classList.replace('d-block','d-none')
        }
        else{
            fail.classList.replace('d-none','d-block')
        }
        var body={
            todoId:id
        }
        var response=await fetch('https://todos.routemisr.com/api/v1/todos',{
            method:'DELETE',
            body:JSON.stringify(body),
            headers:{
                'Content-Type':'application/json'
            }
        })

        var data=await response.json();
        getallTodos();
        console.log(data);

    }



