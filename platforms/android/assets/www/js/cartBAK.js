var app = window.app || {},
business_paypal = ''; // aquí va tu correo electrónico de paypal

(function($){
	'use strict';

	//no coflict con underscores

	app.init = function(){
		//totalItems totalAmount
		var total = 0,
		items = 0
		
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		
		if(undefined != cart.items && cart.items != null && cart.items != '' && cart.items.length > 0){
			_.forEach(cart.items, function(n, key) {
			   items = (items + n.cant)
			   total = total  + (n.cant * n.price)
			});

		}

		$('#totalItems').text(items)
		$('.totalAmount').text('$ '+total+ ' USD')
		
	}

	app.createProducts = function(){
		var products = [
			{
				id : 1,
				img : 'img/logo.png',
				name : 'Libertad 5oz',
				price : 299.00,
				desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
				stock : 4
			},
			{
				id : 2,
				name : 'Libertad 5oz',
				img : 'img/logo.png',
				price : 199.00,
				desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
				stock : 2
			},
			{
				id : 3,
				name : 'Libertad 5oz',
				img : 'img/logo.png',
				price : 99.00,
				desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
				stock : 1
			},
			{
				id : 4,
				name : 'Libertad 5oz',
				img : 'img/logo.png',
				price : 80.00,
				desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
				stock : 0
			}
		],
		wrapper = $('#productosWrapper'),
		content = ''

		for(var i = 0; i < products.length; i++){

			if(products[i].stock > 0){

				content+= '<div class="coin-wrapper">'
				content+= '		<img src="'+products[i].img+'" alt="'+products[i].name+'">'
				content+= '		<span class="large-12 columns product-details">'
				content+= '			<h3>'+products[i].name+' <span class="price">$ '+products[i].price+' USD</span></h3>'
				content+= '			<h3>We have: <span class="stock">'+products[i].stock+'</span></h3>'
				content+= '		</span>'
				content+= '		<a class="large-12 columns btn submit ladda-button prod-'+products[i].id+'" data-style="slide-right" onclick="app.addtoCart('+products[i].id+');">Add to cart</a>'
				content+= '		<div class="clearfix"></div>'
				content+= '</div>'

			}

		}

		wrapper.html(content)

		localStorage.setItem('products',JSON.stringify(products))
	}

	app.addtoCart = function(id){
		var l = Ladda.create( document.querySelector( '.prod-'+id ) );

		l.start();
		var products = JSON.parse(localStorage.getItem('products')),
		producto = _.find(products,{ 'id' : id }),
		cant = 1
		if(cant <= producto.stock){
			if(undefined != producto){
				if(cant > 0){
					setTimeout(function(){
						var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
						app.searchProd(cart,producto.id,parseInt(cant),producto.name,producto.price,producto.img,producto.stock)
						l.stop();
					},2000)
				}else{
					alert('Only larger quantities are allowed to zero');
				}
			}else{
				alert('Oops! algo malo ocurrió, inténtalo de nuevo más tarde')
			}
		}else{
			alert('You can not add more of this product');
		}
	}


	app.createMenu = function(){
		var menuitemss = [{
			id: 1,
			icon: 'chevron_left',
			name: 'Home',
			url: '#'

		},
		{
			id: 2,
			icon: 'chevron_left',
			name: 'Customers',
			url: 'customer-list.html'
		},
		{
			id: 3,
			icon: 'chevron_left',
			name: 'Orders',
			url: 'orders.html'
		}
	],

		
		wrapper = $('#mainMenu'),
		content = ''

		for(var i = 0; i < menuitemss.length; i++){

			
			content += '<li class="nav-item">'
			content += '<a class="nav-link waves-effect" href="' + menuitemss[i].url + '">' + menuitemss[i].name
			content += '<span class="sr-only"></span>'
			content += '</a>'
			content += '</li>'


		}

		wrapper.html(content)

		localStorage.setItem('menuitemss',JSON.stringify(menuitemss))
	}




	app.searchProd = function(cart,id,cant,name,price,img,available){
		//si le pasamos un valor negativo a la cantidad, se descuenta del carrito
		var curProd = _.find(cart.items, { 'id': id })

		if(undefined != curProd && curProd != null){
			//ya existe el producto, aÃ±adimos uno mÃ¡s a su cantidad
			if(curProd.cant < available){
				curProd.cant = parseInt(curProd.cant + cant)
			}else{
				alert('You can not add more of this product')
			}
			
		}else{
			//sino existe lo agregamos al carrito
			var prod = {
				id : id,
				cant : cant,
				name : name,
				price : price,
				img : img,
				available : available
			}
			cart.items.push(prod)
			
		}
		localStorage.setItem('cart',JSON.stringify(cart))
		app.init()
		app.getProducts()
		app.updatePayForm()
		app.createMenu()
	}

	app.getProducts = function(){
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []},
		msg = '',
		wrapper = $('.cart'),
		total = 0
		wrapper.html('')

		if(undefined == cart || null == cart || cart == '' || cart.items.length == 0){
			wrapper.html('<div>Youe basket is empty</div>');
			$('.cart').css('left','-400%')
		}else{
			var items = '';
			_.forEach(cart.items, function(n, key) {
	
			   total = total  + (n.cant * n.price)
			   items += '<tr>'
			   //items += '<td><img src="'+n.img+'" /></td>'
			   items += '<td><span class="qant">'+n.cant+'x </span></td>'
			   items += '<td><h3 class="title">'+n.name+'</h3></td>'
			   items +='<td><span class="price">$ '+n.price+'</span></td>'
			   items +='<td> <a class="add btn-circled circled" onclick="app.updateItem('+n.id+','+n.available+')"><i class="material-icons">remove</i></a> <a onclick="app.deleteProd('+n.id+')" class="circled" ><i class="material-icons ">close</i></a></td>'
			   items += '</tr>'
			});

			//agregar el total al carrito
			items += '<tr><td colspan="2" class="total> <div id="submitForm"></div></td><td id="total" class="total right" colspan="3">Total : $ '+total+' </td></tr>'
			wrapper.html(items)
			$('.cart').css('left','0')
		}
	}

	
	app.updateItem = function(id,available){
		//resta uno a la cantidad del carrito de compras
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ,
		curProd = _.find(cart.items, { 'id': id })
			//actualizar el carrito
			curProd.cant = curProd.cant - 1;
			//validar que la cantidad no sea menor a 0
			if(curProd.cant > 0){
				localStorage.setItem('cart',JSON.stringify(cart))
				app.init()
				app.getProducts()
				app.updatePayForm()
			}else{
				app.deleteProd(id,true)
			}
	}

	app.delete = function(id){
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		var curProd = _.find(cart.items, { 'id': id })
		_.remove(cart.items, curProd);
		localStorage.setItem('cart',JSON.stringify(cart))
		app.init()
		app.getProducts()
		app.updatePayForm()
	}

	app.deleteProd = function(id,remove){
		if(undefined != id && id > 0){
			
			if(remove == true){
				app.delete(id)
			}else{
				var conf = confirm('Remove this product?')
				if(conf){
					app.delete(id)
				}
			}
			
		}
	}

	app.updatePayForm = function(){
		//eso va a generar un formulario dinamico para paypal
		//con los products y sus precios
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		var statics = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_cart"><input type="hidden" name="upload" value="1"><input type="hidden" name="currency_code" value="USD" /><input type="hidden" name="business" value="'+business_paypal+'">',
		dinamic = '',
		wrapper = $('#submitForm')

		wrapper.html('')
		
		if(undefined != cart && null != cart && cart != ''){
			var i = 1;
			_.forEach(cart.items, function(prod, key) {
					dinamic += '<input type="hidden" name="item_name_'+i+'" value="'+prod.name+'">'
					dinamic += '<input type="hidden" name="amount_'+i+'" value="'+prod.price+'">'
					dinamic += '<input type="hidden" name="item_number_'+i+'" value="'+prod.id+'" />'
					dinamic += '<input type="hidden" name="quantity_'+i+'" value="'+prod.cant+'" />'
				i++;
			})

			statics += dinamic + '<button type="submit" class="pay btn btn-success">Submit &nbsp;<i class="ion-chevron-right"></i></button></form>'

			wrapper.html(statics)
		}


		
	}

	$(document).ready(function(){
		app.init()
		app.getProducts()
		app.updatePayForm()
		app.createProducts()
		app.createMenu()
	})

})(jQuery)