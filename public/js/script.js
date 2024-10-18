(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })();



  // custform
                    // function enable() {
                    //   var check = document.getElementsByClassName("chk");
                    //   if (check.checked ){
                    //     alert("Submitted successfully. We'll contact as soon as possible.")
                    //   }  
                    //   };
//

const filter_btns = document.querySelectorAll(".filter-btn");

filter_btns.forEach( btn => btn.addEventListener("click",() =>{
  filter_btns.forEach(button => button.classList.remove("active"));
  btn.classList.add('active');

  let filterValue = btn.dataset.filter;
  console.log(filterValue);           // show in console of inspect
  $(".grid").isotope({filter: filterValue});
}));


$('.grid').isotope({
  // options
  itemSelector: '.grid-item',
  layoutMode: 'fitRows',
  transitionDuration:"0.6s",
});
                    