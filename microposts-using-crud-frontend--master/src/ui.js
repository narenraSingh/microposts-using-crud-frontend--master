class UI{
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }

   //show post in ui with posts class
    showPosts(posts) {
 
         let output = '';

         posts.forEach((data) => {
 
            output +=`
            <div class="card mb-3">
             <div class="card-body">
             <h4 class= "card-title">${data.title}</h4>
               <p class="card-text">${data.body}</p>
                 <a href="#" class="edit card-link" data-id="${data.id}">
                  <i class= "fas fa-pencil-alt"></i>
                 </a>
                 <a href="#" class="delete  card-link" data-id="${data.id}">
                  <i class= "fas fa-trash-alt"></i>
                 </a>
              </div>
             </div>  
            `
         }); 

         this.post.innerHTML = output;
         console.log(posts);
    }

    //Show alert after post submit
    showAlert(message, className){
     
       //this.clearAlert();

       const div= document.createElement('div');

       div.className = className;

     div.appendChild(document.createTextNode(message));
       
       const container =document.querySelector('.postsContainer');

       const posts = document.querySelector('#posts');

       container.insertBefore(div,posts);

       //Timeout
        setTimeout(() => {
          this.clearAlert();
        }, 3000);
      
     }

     //Clear alert after 3 sec
      clearAlert(){
        const currentAlert =  document.querySelector('.alert');

         if(currentAlert){
           currentAlert.remove();
         }
      }

    //Clear fields after submit  
     clearFields(){
       this.titleInput.value = '';
       this.bodyInput.value = '';
     }

     //Fill form with edit
     fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body; 
        this.idInput.value = data.id;
        
        this.changeFormState('edit');
     }

      clearIdInput(){

         this.idInput.value = '';
      }

      changeFormState(type){
 
        if(type === 'edit'){

        this.postSubmit.textContent = 'Update Post';
        this.postSubmit.className = 'post-submit btn btn-warning btn-block mb-2'

       const button = document.createElement('button');

       button.className = 'post-cancel btn btn-danger btn-block';

       button.appendChild(document.createTextNode('Cancel Edit'));

       //Get parent
        const cardForm =document.querySelector('.card-form');
       //Get element to insert before
        const formEnd = document.querySelector('.form-end');

        //Insert cancel button
        cardForm.insertBefore(button,formEnd);

       } else{
          this.postSubmit.textContent = 'Post It';
          this.postSubmit.className = 'post-submit btn btn-primary btn-block';

          //Remove cancel btn if it is there
           if(document.querySelector('.post-cancel')){
              document.querySelector('.post-cancel').remove();
           }

           //Clear ID from hidden fields
            this.clearIdInput();

           //Clear text
            this.clearFields();
      }
    }
}

 export const ui = new UI();