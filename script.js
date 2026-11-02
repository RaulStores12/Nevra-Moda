const products=[
{id:1,name:'Top básico blanco',price:14.99,category:'tops',image:'assets/producto-1.jpg',sizes:['XS','S','M','L'],tag:'NUEVO'},
{id:2,name:'Jersey off shoulder',price:24.99,category:'jerseys',image:'assets/producto-2.jpg',sizes:['S','M','L'],tag:'MÁS VENDIDO'},
{id:3,name:'Pantalón wide leg',price:29.99,category:'pantalones',image:'assets/producto-3.jpg',sizes:['34','36','38','40','42'],tag:''},
{id:4,name:'Blazer oversize',price:34.99,category:'chaquetas',image:'assets/producto-4.jpg',sizes:['S','M','L'],tag:'NUEVO'},
{id:5,name:'Vestido negro',price:27.99,category:'vestidos',image:'assets/producto-5.jpg',sizes:['XS','S','M','L'],tag:''},
{id:6,name:'Sudadera comfy',price:29.99,category:'sudaderas',image:'assets/producto-6.jpg',sizes:['S','M','L','XL'],tag:''}
];
let cart=JSON.parse(localStorage.getItem('nevra-cart')||'[]');
const money=n=>n.toLocaleString('es-ES',{style:'currency',currency:'EUR'});
function updateCount(){const el=document.getElementById('cart-count');if(el)el.textContent=cart.reduce((n,p)=>n+p.qty,0)}
function render(list=products){const root=document.getElementById('products');if(!root)return;root.innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}">${p.tag?`<span class="tag">${p.tag}</span>`:''}</div><div class="product-info"><h3>${p.name}</h3><p>${money(p.price)}</p><div class="product-actions"><select id="size-${p.id}" aria-label="Talla de ${p.name}">${p.sizes.map(s=>`<option value="${s}">${s}</option>`).join('')}</select><button class="add-button" onclick="addToCart(${p.id})">AÑADIR</button></div></div></article>`).join('')}
function addToCart(id){const p=products.find(x=>x.id===id);const size=document.getElementById('size-'+id).value;const found=cart.find(x=>x.id===id&&x.size===size);if(found)found.qty++;else cart.push({...p,size,qty:1});localStorage.setItem('nevra-cart',JSON.stringify(cart));updateCount();alert('Prenda añadida a tu bolsa.')}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{const f=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===f));render(f==='todos'?products:products.filter(p=>p.category===f));}));
render();updateCount();
