import React from 'react'

function TimeCounter() {
  window.onload = function(){
    var el = document.getElementById('seconds')
    var seconds = 120
    var x = setInterval(function(){
        seconds -= 1
        el.innerHTML = seconds  + "ثانیه باقی مانده"
        if(seconds===0){
            clearInterval(x)
        }
    },1000)
  }
    
  return (
    <span className='text-white m-3' id='seconds'></span>
  )
}

export default TimeCounter