


const tab = document.querySelectorAll('.info-menu p');
// console.log(tab);
const uiItems = document. querySelectorAll('.info-items');
const ui = document.querySelector('.info__container');
console.log(uiItems);

if(ui.offsetWidth < 770){
  document.querySelector('.info-contents').style.height = "3300px";
}

// console.log(uiItems);
document.addEventListener('click', (e)=>{
  if(e.target.parentNode.className=='info-menu'){
    tab.forEach(element=> element.classList.remove('active'));
    e.target.classList.add('active');
    uiItems.forEach(element=> element.classList.remove('active'));
    const data = e.target.getAttribute('data-alt');
    document.getElementById(data).classList.add('active');
    console.log(ui.offsetWidth);
    // if(ui.offsetWidth< "769"){
    //   console.log(getComputedStyle(ui).width);
    //   if (data == 'tab4'){
    //     document.querySelector('.ui-contents').style.height = "750px";
    //   }
    //   else{
    //     document.querySelector('.ui-contents').style.height = "1100px";
    //   }
    // }
    // else{
      // console.log("desktop");
    // document.querySelector('.info-contents').style.height = "1100px";
    // }
    if(ui.offsetWidth < 770){
      document.querySelector('.info-contents').style.height = "3300px";
    }
  }
})

/* Header Trigger */
$('.trigger').click(function(){
  console.log("clicked");
  $(this).toggleClass('active')
  $('.gnb').toggleClass('active')
})
$('.gnb a, section').click(function(){
  $('.gnb, .trigger').removeClass('active')
})

$('.infoTrigger').click(function(){
  console.log("clicked");
  $(this).toggleClass('active');
  $('.info-menu').toggleClass('active');
})
$('.info-menu p').click(function(){
  $('.info-menu, .info-trigger').removeClass('active')
})