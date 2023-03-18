const squares = Array.from(document.querySelectorAll('.square'))
const x = 'X';
const o = 'O';
let gameStatus = 'P1';
const modal = document.querySelector('dialog')
const modalText = modal.querySelector('h2')



squares.forEach((square) => {
  square.addEventListener('click', () => {
    if(gameStatus === 'PAUSE') return
    if(square.textContent !== '') return
    square.innerText = gameStatus == 'P1' ? x : o;
    const winningPosition = checkWinnerExistence()
    if(typeof winningPosition === 'object'){
      winner(winningPosition);
      return
    }
    if(winningPosition === 'tie'){
      showModal('Tie')
    }
    gameStatus = gameStatus === 'P1' ? 'P2' : 'P1';
  })
});

function checkWinnerExistence() {
  const board = squares.map(square => square.textContent)

  //horizontals
  for (let i = 0; i <=9; i+=3) {
    if(board[i] &&
    board[i] == board[i+1] &&
    board[i] == board[i+2]){
      return [i,i+1,i+2]
    }
  }
  //verticals
  for (let i = 0; i <=3; i++) {
    if(board[i] &&
    board[i] == board[i+3] &&
    board[i] == board[i+6]){
      return [i,i+3,i+6]
    }
  }
  //diagonals
  if(board[0] &&
  board[0] === board[4] &&
  board[0] === board[8]){
    return [0,4,8]
  }
  if(board[2] &&
  board[2] === board[4] &&
  board[2] === board[6]){
    return [2,4,6]
  }

  if(board.includes('')) return false;
  return 'tie';
}

function winner(winningPosition) {
  winningPosition.forEach(position => {
    squares[position].classList.toggle('winner',true)
  })
  showModal('The winner is: ' + gameStatus)
  gameStatus == 'PAUSE'
}

function showModal(text) {
  modalText.innerText = text
  modal.showModal()
}

modal.querySelector('button').addEventListener('click', () => {
  squares.forEach(square => {
    square.textContent= ''
    square.classList.toggle('winner',false)
    modal.close()
    gameStatus = 'P1'
  });
})