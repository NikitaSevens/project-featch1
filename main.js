const addBtn = document.querySelector('.addBtn');
const isGravid = document.getElementById("isGravid");
addBtn.onclick = () => {
  const isGravidLabel = document.createElement('label');
  isGravidLabel.id = 'isGravidLabelID'
  isGravidLabel.for = 'isGravid';
  isGravidLabel.innerHTML = 'Gravid';

  const isGravidInputTrue = document.createElement('input');
  isGravidInputTrue.type = 'radio';
  isGravidInputTrue.id = 'radioIdTrue';
  isGravidInputTrue.value = true;
  isGravidInputTrue.name = 'radioIsGravid'
  isGravidInputTrue.className = 'radiGreen'
  isGravidInputTrue.checked = true;
  
  const isGravidInputFalse = document.createElement('input');
  isGravidInputFalse.type = 'radio';
  isGravidInputFalse.id = 'radioIdFalse';
  isGravidInputFalse.value = false;
  isGravidInputFalse.name = 'radioIsGravid'
  isGravidInputFalse.className = 'radiRed';
  isGravidInputFalse.checked = true;


  isGravid.appendChild(isGravidInputTrue)
  isGravid.appendChild(isGravidInputFalse)
  isGravid.prepend(isGravidLabel);


}

function del() {
var popup = document.getElementById("isGravidLabelID");
var popup1 = document.getElementById("radioIdTrue");
var popup2 = document.getElementById("radioIdFalse");


popup1.remove();
popup2.remove();
popup.remove();
}


document.getElementById('personForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;

  const isGravitElement = document.querySelector('input[name="radioIsGravid"]:checked');
  const isGravit = isGravitElement ? isGravitElement.value : false;

  const data = {
    name: name,
    gender: gender,
    isGravid: isGravit,
    dateOfBirth: dateOfBirth,
  };

  axios.post('http://25.43.232.156:8080/people', data)
    .then(response => {
      
      console.log('Success:', response);

      const responseData = response.data; // Получаем строку ответа
        const userPassword = responseData.split('id=')[1]; // Измените путь в зависимости от структуры ответа
      console.log('Сохраненный ID пользователя:', userPassword);

      if (localStorage.getItem('userData')) {
        localStorage.removeItem('userData');
        console.log('Данные пользователя удалены.');
    } else {
        console.log('Нет данных для удаления.');
    }

      localStorage.setItem('userData', JSON.stringify(data));
      localStorage.setItem('userPassword', userPassword);
    })
    
    .catch(error => {
      console.error('Error:', error);
    });

});

const password1 = localStorage.getItem('userPassword');
const password = JSON.parse(password1);

axios.get(`http://25.43.232.156:8080/people/${password}/measures/correct`)
.then(function(response) {

  localStorage.setItem('userDataIdefecators', JSON.stringify(response.data));
})
.catch(function(error) {
  // Обработка ошибок
  console.error('Ошибка при получении данных пользователя:', error);
});




function redirectToWelcomPage() {
  setTimeout(function() {
      document.location = '/Html/main-page.html';
  },10000 ); // 5000 миллисекунд = 5 секунд
}




