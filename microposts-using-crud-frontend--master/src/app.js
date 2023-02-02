import {http} from './http';
import {ui} from './ui';

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPosts);

//Listen for delete
 document.querySelector('#posts').addEventListener('click', deletePosts);

 //Listen for edit state
  document.querySelector('#posts').addEventListener('click', enableEdit);

 //Listen for cancel button
  document.querySelector('.card-form').addEventListener('click', cancelEdit);

//Get posts from http.js
function getPosts(){
    
    http.get('http://localhost:3000/posts')

    .then(data => ui.showPosts(data))
    .catch(err=> console.log(err));
}

//Submit posts from ui using post method

 function submitPosts(){

    const title= document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

     const data = {
         title,
         body
     }

    //Validate input
     if(title === '' || body == ''){
         ui.showAlert('Please fill in all fields', 'alert alert-danger');
     }
      else{

         if(id === ''){
          //Create post
            http.post('http://localhost:3000/posts', data)
             .then(data => {
                 ui.showAlert('Post Added', 'alert alert-success');
                 ui.clearFields();
                 getPosts();
             })
             .catch(err => console.log(err))

         } else{
            //Update post
             http.put(`http://localhost:3000/posts/${id}`, data)

                 .then(data => {
                     ui.showAlert('Post Updated', 'alert alert-success');
                     ui.changeFormState('add');
                     getPosts();
                 })
                 .catch(err => console.log(err))
         } 
      }
 }

  //Delete post from ui by using delete method

   function deletePosts(e){

      e.preventDefault();

       if(e.target.parentElement.classList.contains('delete')){
         const id = e.target.parentElement.dataset.id;
         if(confirm('Are You Sure?')){

             http.delete(`http://localhost:3000/posts/${id}`)

             .then(data=> {
                 ui.showAlert('Post Removed' , 'alert alert-success');
                 getPosts();
             })
             .catch(err=> console.log(err))
      }
   }
}

 function enableEdit(e){

     const id = e.target.parentElement.dataset.id;

     const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

     const body = e.target.parentElement.previousElementSibling.textContent;

     const data = {
         id,
         title,
         body
     }

     //Fill form with current post
      ui.fillForm(data);

     //console.log(e.target.parentElement.previousElementSibling.textContent);

     e.preventDefault();
 }

 //Cancel edit state
  function cancelEdit(e){
  
     if(e.target.classList.contains('post-cancel')){

         ui.changeFormState('add');
     }
     
     e.preventDefault();
}