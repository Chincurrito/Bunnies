var socket = io()
socket.on('handshake',function () {
  console.log('connected to server successfully')
})
var buttons = document.getElementsByClassName('bunnyNamePlate')
var skipperButton = document.getElementById('skip')
var tableContainer = document.getElementById('pickertable')
var resContainer = document.getElementById('resultsbox')
var barDivs = document.getElementsByClassName('bar')
var barPrecentBoxes = document.getElementsByClassName('precentSpan')
var barPrecents = []
var colors = ['green','aqua','olive','red', 'blue', 'purple', 'yellow', 'orange', 'pink', 'brown', 'teal', 'cornflowerblue']
for (i = 0; i<barDivs.length; i++) {
  barDivs[i].style.backgroundColor = colors[i]
  console.log(barDivs[i].style.backgroundColor)
}
resContainer.style.display = 'none'
for (i = 0; i<buttons.length;i++) {
  buttons[i].addEventListener('click',function () {
    socket.emit('Bunnypicked',this.id)
    cleanUpAndWait()
  })
}
skipperButton.addEventListener('click',function () {
  socket.emit('Bunnypicked',null)
  cleanUpAndWait()
})
socket.on('polls',function (res) {
  var total = 0
  for (i = 0; i<res.length;i++) {
    total+= res[i]
  }
  for (i = 0; i<res.length;i++) {
    if (total == 0){
      barDivs[i].style.width = '6.5vmax'
      barPrecentBoxes[i].innerHTML = '0%'
      barPrecents.push(0)
    }
    else{
      barPrecents.push(res[i]/total)
      barDivs[i].style.width = (Math.round(res[i]/total))*50+6.5 + 'vmax'
      barPrecentBoxes[i].innerHTML = (Math.round(res[i]/total))*100 + '%'
    }
  }
  console.log(res)
})
function cleanUpAndWait() {
  for (i = 0; i<buttons.length;i++) {
    buttons[i].disabled = true
  }
  pickertable.style.display = 'none';
  resContainer.style.display = 'block'
}
document.getElementById('reset').addEventListener('click',function () {
  tableContainer.style.display = 'block'
  resContainer.style.display = 'none'
})