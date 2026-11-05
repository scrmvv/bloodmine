var interactivePanels = document.querySelectorAll('.product-row, .reward-card, .news-card');
document.addEventListener('mousemove',function(event){
  for(var i=0;i<interactivePanels.length;i++){
    var rectangle=interactivePanels[i].getBoundingClientRect();
    interactivePanels[i].style.boxShadow='0 0 '+(8+Math.abs(event.clientX-rectangle.left)%16)+'px rgba(255,90,0,0.08)';
    var currentWidth=interactivePanels[i].offsetWidth;
    interactivePanels[i].style.backgroundPosition=(event.clientX%currentWidth)+'px '+event.clientY+'px';
  }
});
