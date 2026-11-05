/* BloodMine: интерактивный каталог, аккордеон и диалог без сторонних зависимостей. */
(() => {
  const products = {
    ranks: [{name:'Цербер',price:14},{name:'Маркиз',price:39},{name:'Граф',price:59},{name:'Орион',price:99},{name:'Визирь',price:149},{name:'Феникс',price:239},{name:'Рыцарь',price:329},{name:'Правитель',price:529},{name:'Властелин',price:879},{name:'Император',price:1299}],
    cases: [{name:'Стартовый кейс',price:19},{name:'Кейс исследователя',price:49},{name:'Кейс героя',price:99},{name:'Коллекция сезона',price:149}],
    shards: [{name:'100 осколков',price:29},{name:'300 осколков',price:69},{name:'700 осколков',price:129},{name:'1500 осколков',price:249}],
    other: [{name:'Цветной ник',price:29},{name:'Эффект появления',price:49},{name:'Набор эмоций',price:79}]
  };
  const store=document.querySelector('.store');
  let category='ranks',index=1,term='month';
  const formatted=(n)=>`${n.toLocaleString('ru-RU')} ₽`;
  const price=(item)=>item.price*(category==='ranks'&&term==='forever'?5:1);
  function render(){
    if(!store)return;
    const list=document.querySelector('#product-list');list.replaceChildren();
    products[category].forEach((item,i)=>{
      const row=document.createElement('button');row.type='button';
      row.className='product-row'+(index===i?' chosen':'');
      row.setAttribute('aria-pressed',String(index===i));
      const name=document.createElement('span');name.textContent=item.name;
      const cost=document.createElement('span');cost.className='product-price';cost.textContent=`от ${formatted(item.price)} ›`;
      row.append(name,cost);row.addEventListener('click',()=>{index=i;render()});list.append(row);
    });
    document.querySelector('#preview-name').textContent=products[category][index].name;
    document.querySelector('#product-name').textContent=products[category][index].name;
    const picture=document.querySelector('#preview-image');picture.src=category==='cases'?'assets/images/chest.webp':'assets/images/player.webp';
    picture.alt=category==='cases'?'Сундук выбранного кейса':'Персонаж с выбранной привилегией';
    const ul=document.createElement('ul');
    const details=category==='ranks'?['Название в чате: '+products[category][index].name,'Цветное оформление профиля','Игровые предметы и эффекты']:['Набор: '+products[category][index].name,'Пример содержимого для демонстрации','Оплата и выдача не подключены'];
    details.forEach(d=>{const li=document.createElement('li');li.textContent=d;ul.append(li)});
    document.querySelector('#product-description').replaceChildren(ul);
    document.querySelector('#choose-product').textContent='Посмотреть за '+formatted(price(products[category][index]));
    document.querySelector('#term-group').hidden=category!=='ranks';
    document.querySelector('#term-hint').textContent=category==='ranks'?'Навсегда — стоимость ×5 от цены на месяц.':'Для этой категории действует разовая стоимость.';
    document.querySelectorAll('[data-category]').forEach(b=>{const active=b.dataset.category===category;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));});
    document.querySelectorAll('[data-term]').forEach(b=>{const active=b.dataset.term===term;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active));});
  }
  if(store){
    document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;index=0;term='month';render()}));
    document.querySelectorAll('[data-term]').forEach(b=>b.addEventListener('click',()=>{term=b.dataset.term;render()}));
    document.querySelector('#choose-product').addEventListener('click',()=>{
      const item=products[category][index];const duration=category==='ranks'?(term==='month'?'на месяц':'навсегда'):'разовая позиция';
      openDialog(item.name,`Выбрано: ${item.name}; ${duration}; цена ${formatted(price(item))}. Это демонстрационный каталог: оплата и выдача недоступны.`);
    });render();
  }
  document.querySelectorAll('.rule-heading').forEach((heading,i)=>{
    const content=heading.nextElementSibling; if(!content.id)content.id=`rule-content-${i}`;
    heading.setAttribute('aria-controls',content.id);heading.setAttribute('aria-expanded','false');
    heading.addEventListener('click',()=>{
      const open=heading.parentElement.classList.toggle('open');heading.setAttribute('aria-expanded',String(open));
      heading.querySelector('b').textContent=open?'−':'+';
    });
  });
  const overlay=document.querySelector('#dialog'); const modal=overlay?.querySelector('.modal');
  let trigger=null;
  function openDialog(title,message){
    if(!overlay)return;trigger=document.activeElement;
    document.querySelector('#dialog-title').textContent=title;document.querySelector('#dialog-text').textContent=message;
    overlay.classList.add('visible');overlay.setAttribute('aria-hidden','false');
    document.body.classList.add('dialog-open');modal.querySelector('.modal-close').focus();
  }
  function closeDialog(){
    if(!overlay)return; overlay.classList.remove('visible');overlay.setAttribute('aria-hidden','true');
    document.body.classList.remove('dialog-open');if(trigger?.isConnected)trigger.focus();
  }
  overlay?.querySelectorAll('.modal-close,.modal .orange').forEach(btn=>btn.addEventListener('click',closeDialog));
  overlay?.addEventListener('click',e=>{if(e.target===overlay)closeDialog();});
  document.addEventListener('keydown',e=>{
    if(!overlay?.classList.contains('visible'))return;
    if(e.key==='Escape'){e.preventDefault();closeDialog();}
    if(e.key==='Tab'){
      const buttons=[...modal.querySelectorAll('button:not([disabled])')];
      if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons.at(-1).focus()}
      else if(!e.shiftKey&&document.activeElement===buttons.at(-1)){e.preventDefault();buttons[0].focus()}
    }
  });
  document.querySelectorAll('[data-reward]').forEach(button=>button.addEventListener('click',()=>openDialog(button.dataset.reward,`Награда «${button.dataset.reward}» — демонстрационная коллекция BloodMine. Получение на сервере пока недоступно.`)));
})();
