

  const s = document.querySelector('.Subscribe')
  const b = document.querySelector('button')
   signup.addEventListener('submit', e => {
   e.preventDefault();
 
   const formData = new FormData(signup);
   fetch(signup.getAttribute('sub'), {
     method: 'POST',
     headers: {
       'Accept': 'application/x-www-form-urlencoded',
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     body: new URLSearchParams(formData).toString()
   })
   .then(res => {
     s.classList.toggle('Subscribe--loading')
     setTimeout(() => {
       s.classList.remove('Subscribe--loading')
       s.classList.toggle('Subscribe--complete')
     }, 2000)
     
     setTimeout(() => {
       s.classList.remove('Subscribe--complete')
     })
   });
 });
 
 

 