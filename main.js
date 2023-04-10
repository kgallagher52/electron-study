document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const file = document.querySelector('input').files[0];
  console.log(file)
});