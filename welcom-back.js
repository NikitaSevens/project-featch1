
document.getElementById('personFormRegistration').addEventListener('submit', function(event) {
event.preventDefault();

const password = document.getElementById('password').value;
if (!password) {
  // Если да, берем значение из локального хранилища
  const storedPassword = localStorage.getItem('userPassword');
  return password = storedPassword;
} 



axios.get(`http://25.43.232.156:8080/people/${password}`)
.then(function(response) {
  // Обработка успешного ответа
  console.log('Данные пользователя:', response.data);

  localStorage.removeItem('userData');
  localStorage.setItem('userPassword', password);

  localStorage.setItem('userData', JSON.stringify(response.data));

  showPopup(userData);
})

axios.get(`http://25.43.232.156:8080/people/${password}/measures/correct`)
.then(function(response) {
  // Обработка успешного ответа
  console.log('Данные пользователя:', response.data);


  localStorage.setItem('userDataIdefecators', JSON.stringify(response.data));
})
.catch(function(error) {
  // Обработка ошибок
  console.error('Ошибка при получении данных пользователя:', error);
});

axios.get(`http://25.43.232.156:8080/people/${password}/measures`)
.then(function (response) {
  console.log("Полученные данные через ТЕТ 3 секунды:",response.data  );

  localStorage.setItem("formData",JSON.stringify(response.data)); // Сохранение новых данных
})
.catch(function (error) {
  console.error("Ошибка при получении данных:", error);
});
});

function redirectToWelcomPage() {
  setTimeout(function() {
      document.location = '/Html/main-page.html';
  },10000 ); // 5000 миллисекунд = 5 секунд
}




window.localStorage.removeItem('userId')




