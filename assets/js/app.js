var selectedCategory = 'ranks';
var selectedIndex = 1;
var selectedTerm = 'На месяц';
var products = {
  ranks: [
    {name: 'Цербер', price: 14}, {name: 'Маркиз', price: 39}, {name: 'Граф', price: 59},
    {name: 'Орион', price: 99}, {name: 'Визирь', price: 149}, {name: 'Феникс', price: 239},
    {name: 'Рыцарь', price: 329}, {name: 'Правитель', price: 529}, {name: 'Властелин', price: 879}, {name: 'Император', price: 1299}
  ],
  cases: [{name: 'Стартовый кейс',price: 19},{name: 'Кейс исследователя',price: 49},{name: 'Кейс героя',price: 99},{name: 'Коллекция сезона',price: 149}],
  shards: [{name: '100 осколков',price: 29},{name: '300 осколков',price: 69},{name: '700 осколков',price: 129},{name: '1500 осколков',price: 249}],
  other: [{name: 'Цветной ник',price: 29},{name: 'Эффект появления',price: 49},{name: 'Набор эмоций',price: 79}]
};
function renderProducts() {
  var list = document.getElementById('product-list');
  if (!list) return;
  list.innerHTML = '';
  products[selectedCategory].forEach(function(item,index) {
    var row = document.createElement('div');
    row.className = 'product-row' + (index === selectedIndex ? ' chosen' : '');
    row.innerHTML = '<span>' + item.name + '</span><span class="product-price">от ' + item.price + ' ₽ ›</span>';
    row.onclick = function(){ selectedIndex = index; renderProducts(); };
    list.appendChild(row);
  });
  var product = products[selectedCategory][selectedIndex];
  document.getElementById('preview-name').textContent = product.name;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('preview-image').src = selectedCategory === 'cases' ? 'assets/images/chest.png' : 'assets/images/player.png';
  var details = selectedCategory === 'ranks'
    ? '<li>Название в чате — <span>' + product.name + '</span></li><li>Оформление профиля — <span>цвет и стиль</span></li><li>Дополнительный набор — <span>предметы</span></li><li>Коллекция эффектов — <span>для персонажа</span></li>'
    : '<li>Выбранный набор — <span>' + product.name + '</span></li><li>Описание игровой коллекции</li><li>Содержимое можно посмотреть в каталоге</li>';
  document.getElementById('product-description').innerHTML = '<ul>' + details + '</ul>';
  document.getElementById('choose-product').textContent = 'Выбрать за ' + product.price + ' ₽';
}
function setCategory(category) {
  selectedCategory = category; selectedIndex = 0;
  document.querySelectorAll('.tab').forEach(function(tab){tab.className = 'tab' + (tab.getAttribute('data-category') === category ? ' active' : '');});
  renderProducts();
}
function setTerm(element,term) {
  selectedTerm = term;
  document.querySelectorAll('.terms span').forEach(function(item){item.className='';});
  element.className='selected';
}
function openDialog(title,text) {
  document.getElementById('dialog-title').textContent=title;
  document.getElementById('dialog-text').textContent=text;
  document.getElementById('dialog').classList.add('visible');
}
function closeDialog(){document.getElementById('dialog').classList.remove('visible');}
function selectProduct(){
  var item=products[selectedCategory][selectedIndex];
  openDialog(item.name,'Вы выбрали «'+item.name+'», срок: '+selectedTerm.toLowerCase()+'. Это демонстрация каталога: оплата и выдача игровых товаров недоступны.');
}
function showReward(name){openDialog(name,'Пример награды «'+name+'». Здесь можно изучить оформление коллекции. Получение предметов на игровом сервере не подключено.');}
function toggleRule(element){
  var rule=element.parentNode;rule.classList.toggle('open');
  element.querySelector('b').textContent=rule.classList.contains('open')?'−':'+';
}
renderProducts();
document.getElementById('dialog').addEventListener('click',function(event){if(event.target===this)closeDialog();});
