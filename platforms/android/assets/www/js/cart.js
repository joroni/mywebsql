var app = window.app || {},
	business_paypal = '', // aquí va tu correo electrónico de paypal
	currency_icon = '₱';
localStorage.setItem("myCurrency", currency_icon);
(function ($) {
	'use strict';

	//no coflict con underscores

	app.init = function () {
		//totalItems totalAmount
		var total = 0,
			items = 0

		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {
			items: []
		};

		if (undefined != cart.items && cart.items != null && cart.items != '' && cart.items.length > 0) {
			_.forEach(cart.items, function (n, key) {
				items = (items + n.cant)
				total = total + (n.cant * n.price)
			});

		}

		var total_Items = $('#totalItems');
		total_Items.text(items);
		//alert(items);
		if (items == 0) {
			$(total_Items).hide();
		} else {
			$(total_Items).show();
		}
		$('.totalAmount').text(currency_icon + ' ' + total + ' USD');

	}

/*	app.checkItems = function () {
		var nonzero = $(".qtty-center");
		var qinput = nonzero.closest("input")
		var qvalue = qinput.val();
		console.log(qvalue);
		//var toggleItems = $(".cards.productsonsale .btn-number", qinput);
		if (qvalue != 0) {
			toggleItems.removeClass("hidden");
		} else {
			toggleItems.addClass("hidden");
		}

	}*/

	app.createProducts = function () {


		var products = [{
					id: 1,
					sku: 'A0000001',
					name: 'Denim Shirt',
					cat: 'Sports Wear',
					state: 'New',
					statecolor: 'red',
					size: '',
					img: 'img/products/12.jpg',
					oldprice: '',
					price: 299.00,
					desc: 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
					stock: 4,
					cname:'',
					smname:'',
					timestamp:'',
					ponumber:''
				},
				{
					id: 2,
					sku: 'A0000002',
					name: 'Drypers Mega Pack',
					cat: 'Baby',
					state: 'Sale',
					statecolor: 'green',
					size: 'Large x 62 pcs',
					img: 'img/products/baby.jpg',
					oldprice: 630.00,
					price: 503.00,
					desc: 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
					stock: 2,
					cname:'',
					smname:'',
					timestamp:'',
					ponumber:''
				},
				{
					id: 3,
					sku: 'A0000003',
					name: 'Cool Shirt',
					cat: 'Out Wear',
					state: '',
					statecolor: '',
					size: '',
					img: 'img/products/14.jpg',
					oldprice: '',
					price: 99.00,
					desc: 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
					stock: 1,
					cname:'',
					smname:'',
					timestamp:'',
					ponumber:''
				},
				{
					id: 4,
					sku: 'A0000004',
					name: '137 Degrees Iced Coffee Latte with Almond Milk Drink',
					cat: 'Coffee',
					state: '',
					statecolor: '',
					size: '3 pcs x 180 ml',
					img: 'img/products/coffee.jpg',
					oldprice: '',
					price: 80.00,
					desc: 'Perfect iced coffee latte with almond milk',
					stock: 50,
					cname:'',
					smname:'',
					timestamp:'',
					ponumber:''
				},
				{
					id: 5,
					sku: 'A0000005',
					name: 'Gingen Strong Ginger Formula Tea',
					cat: 'Tea',
					state: 'Best Seller',
					size: '',
					statecolor: 'blue',
					img: 'img/products/tea.jpg',
					oldprice: '',
					price: 440.00,
					desc: 'Hot drink with slightly sweet and strong taste from aged quality ginger',
					stock: 20,
					cname:'',
					smname:'',
					timestamp:'',
					ponumber:''
				},
				{
					id: 6,
					sku: 'A0000006',
					name: 'Cool Shirt',
					cat: 'Out Wear',
					state: '',
					statecolor: '',
					size: '3 pcs x 180 ml',
					img: 'img/products/15.jpg',
					oldprice: '',
					price: 80.00,
					desc: 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
					stock: 8,
					cname:'',
					smname:'',
					timestamp:'',
					ponumber:''
				},
			],
			wrapper = $('#productosWrapper'),
			content = '',
			oldpricing = ''
		for (var i = 0; i < products.length; i++) {
		
			if (products[i].stock > 0) {

				if(products[i].oldprice != 0 || products[i].oldprice != '') {
					 oldpricing = currency_icon + '' + products[i].oldprice;
				}else {
					oldpricing = '';
				}

				content += '<div class="col-4 col-sm-4 no-gutter">'
				content += '<div class="cards productsonsale" id="prod_click' + products[i].id + '">'
				content += '<div class="view">'
				content += '<img src="' + products[i].img + '"class="card-img-top"  alt="' + products[i].name + '">'
				content += '<a href="product-page.html" onclick=getSKU("' + products[i].sku + '") data-sku="' + products[i].sku + '">'
				content += '<div class="mask rgba-white-slight"></div>'
				content += '</a>'
				content += '</div>'
				content += '<div class="card-body text-center parent">'
				content += '<a href="#" class="grey-text truncate">'
				content += '<h5 class="category">' + products[i].cat + '</h5>'
				content += '</a>'
				content += '<div class="truncate">'
				content += '<h5>'
				content += '<a href="" class="dark-grey-text"> ' + products[i].name + '</a>'
				content += '</h5>'
				content += '<p class="badge statebadge badge-pill ' + products[i].statecolor + '">' + products[i].state + '</p>'
				content += '</div>'
				content += '<h4 class=" blue-text">'
				content += '<del>' + oldpricing + ' </del>'
				content += '<span>' + currency_icon + '' + products[i].price + ' </span>'
				content += '</h4>'
				content += '<h3 class="hidden">We have: <span class="stock">' + products[i].stock + '</span></h3>'
			/*	content += '<div class="quant-btn-group">'
				content += '<button type="button" class="btn btn-number waves-effect submit ladda-button waves-light grey-border btn-toggle prod-' + products[i].id + '"  data-type="plus" data-style="slide-right" onclick="app.addtoCart(' + products[i].id + ');">'
				content += '<img src="icons/noun_Plus_1807498-rounded-green.svg">'
				content += '</button>'
				content += '<div class="input-group qtty-center hidden">'
				content += '<span class="input-group-btn">'
				content += '<button type="button" class="btn manage-qtty  btn-number waves-effect waves-light  grey-border" onclick="app.updateItem(' + products[i].id + ',' + products[i].stock + ')"  data-type="minus">'
				content += '<img src="icons/noun_Remove_1807498-rounded-green.svg">'
				content += '</button>'
				content += '</span>'*/

				
				content += '<div class="input-group qtty-center">'
				content += '<span class="input-group-btn">'
				content += '<button type="button" class="btn manage-qtty  btn-number waves-effect waves-light  grey-border" onclick="app.updateItem(' + products[i].id + ',' + products[i].stock + ')"  data-type="minus">'
				content += '<img src="icons/noun_Remove_1807498-rounded-green.svg">'
				content += '</button>'
				content += '</span>'
				content += '<input type="number" id="prod_' + products[i].id + '" readonly name="quant[' + products[i].id + ']" class="form-control input-number quantity manage-qtty"  value="0" min="0" max="100">'
				content += '<span class="input-group-btn">'
				content += '<button type="button" class="btn btn-number waves-effect  submit ladda-button waves-light grey-border prod-' + products[i].id + '"  data-type="plus" data-style="slide-right" onclick="app.addtoCart(' + products[i].id + ');">'
				content += '<img src="icons/noun_Plus_1807498-rounded-green.svg">'
				content += '</button>'
				content += '</span>'
				content += '</div></div>'
				content += '</div>'
				content += '</div>'
				content += '</div>'


			}

		}

		wrapper.html(content);

		//wrapper2.html(content2);

		localStorage.setItem('products', JSON.stringify(products))
	}

	app.addtoCart = function (id) {
		var l = Ladda.create(document.querySelector('.prod-' + id));

		l.start();
		var products = JSON.parse(localStorage.getItem('products')),
			producto = _.find(products, {
				'id': id
			}),
			cant = 1;
		$('body').css('opacity', '0.5');
		if (cant <= producto.stock) {
			if (undefined != producto) {
				if (cant > 0) {
					setTimeout(function () {
						var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {
							items: []
						};
						app.searchProd(cart, producto.id, parseInt(cant), producto.name, producto.price, producto.img, producto.stock, producto.oldprice);

						l.stop();
						console.log(parseInt(cant))
						$('body').css('opacity', '1');
					}, 100)

				} else {
					alert('Only larger quantities are allowed to zero');
				}
			} else {
				alert('Oops! Something we wrong, try again later')
			}
		} else {
			alert('You can not add more of this product');
		}

	}

/************************* custom */

/**************************************** */
	app.searchProd = function (cart, id, cant, name, price, img, available, oldprice, cname, smname, timestamp, ponumber) {
		//si le pasamos un valor negativo a la cantidad, se descuenta del carrito
		var curProd = _.find(cart.items, {
			'id': id
		})

		if (undefined != curProd && curProd != null) {
			//ya existe el producto, aÃ±adimos uno mÃ¡s a su cantidad
			if (curProd.cant < available) {
				curProd.cant = parseInt(curProd.cant + cant)
			} else {
				alert('This product is currently out of stock')
			}
			$('#prod_' + curProd.id).val(curProd.cant);
		} else {
			//sino existe lo agregamos al carrito
			var prod = {
				id: id,
				cant: cant,
				name: name,
				price: price,
				img: img,
				available: available,
				oldprice: oldprice,
				cname: cname,
				smname:smname,
				timestamp:timestamp,
				ponumber:ponumber
			}
			cart.items.push(prod)

		}
		localStorage.setItem('cart', JSON.stringify(cart))
		app.init()
		app.getProducts()
		app.updatePayForm()

	}

	app.getProducts = function () {
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {
				items: []
			},
			msg = '',
			wrapper = $('.cart'),
			total = 0
		wrapper.html('')

		if (undefined == cart || null == cart || cart == '' || cart.items.length == 0) {
			wrapper.html('<div>Your basket is empty</div>');
			$('.cart').css('left', '-400%')
		} else {
			var items = '';
			_.forEach(cart.items, function (n, key) {
			var oldpricing='';
				if(n.oldprice != 0 || n.oldprice != '') {
					oldpricing = currency_icon + '' +n.oldprice;
			   }else {
				   oldpricing = '';
			   }


				total = total + (n.cant * n.price);
				items += '<tr>'
				//items += '<td><img src="'+n.img+'" /></td>'
				items += '<td><span class="qant">' + n.cant + '</span></td>'
				items += '<td><h3 class="title">' + n.name + '</h3></td>'
				items += '<td colspan="2"><p><del>' + oldpricing + '</del></p>'
				items += '<p><span class="price">' + currency_icon + '' + n.price + '</span></p>'
				items += '<p><span class="cname hidden">' + n.cname +'</span><span class="smname hidden">' + n.smname +'</span></p>'
				items += '<p><span class="timestamp hidden">' + n.timestamp +'</span><span class="ponumber hidden">' + n.ponumber +'</span></p></td>'
				//  items +='<td> <a class="add btn-circled circled" onclick="app.updateItem('+n.id+','+n.available+')"><i class="material-icons">remove</i></a> <a onclick="app.deleteProd('+n.id+')" class="circled" ><i class="material-icons ">close</i></a></td>'
				//	items += '<td width="100"> <a class="add btn-circled circled" onclick="app.updateItem(' + n.id + ',' + n.available + ')"><i class="material-icons">remove</i></a> <a class="btn-circled circled" onclick="app.deleteProd(' + n.id + ')" ><i class="material-icons ">close</i></a></td>'
				//items += '<td><div class="btn-group" role="group" aria-label="Edit Cart">'
				// items += '<button type="button" class="btn btn-sm btn-blue-grey lighten-5 pl-3 pr-3" onclick="app.updateItem(' + n.id + ',' + n.available + ')"><i class="material-icons">remove</i></button>'
				//items += '</div></td>'
				items += '</tr>';
				$('#prod_' + n.id).val(n.cant);
			});

			//agregar el total al carrito
			items += '<tr class="total-row"><td colspan="2" class="total> <div id="submitForm"></div></td><td id="total" class="total left" colspan="3">' + currency_icon + '' + total + ' </td></tr>'
			wrapper.html(items)
			$('.cart').css('left', '0')
		}
	}


	app.updateItem = function (id, available) {
		//resta uno a la cantidad del carrito de compras
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {
				items: []
			},
			curProd = _.find(cart.items, {
				'id': id
			})
		//actualizar el carrito
		curProd.cant = curProd.cant - 1;
		//validar que la cantidad no sea menor a 0
		if (curProd.cant > 0) {
			localStorage.setItem('cart', JSON.stringify(cart))
			app.init()
			app.getProducts()
			app.updatePayForm()
		} else {
			app.deleteProd(id, true)
		}
	}

	app.delete = function (id) {
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {
			items: []
		};
		var curProd = _.find(cart.items, {
			'id': id
		})
		$('#prod_' + id + '').val('0');
		_.remove(cart.items, curProd);
		localStorage.setItem('cart', JSON.stringify(cart))
		app.init()
		app.getProducts()
		app.updatePayForm()
	}

	app.deleteProd = function (id, remove) {
		if (undefined != id && id > 0) {

			if (remove == true) {
				app.delete(id)
			} else {
				var conf = confirm('Remove this product?')
				if (conf) {
					app.delete(id)
				}
			}

		}
	}

	app.updatePayForm = function () {
		//eso va a generar un formulario dinamico para paypal
		//con los products y sus precios
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {
			items: []
		};
		var statics = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_cart"><input type="hidden" name="upload" value="1"><input type="hidden" name="currency_code" value="USD" /><input type="hidden" name="business" value="' + business_paypal + '">',
			dinamic = '',
			wrapper = $('#submitForm')

		wrapper.html('')

		if (undefined != cart && null != cart && cart != '') {
			var i = 1;
			_.forEach(cart.items, function (prod, key) {
				dinamic += '<input type="hidden" name="item_name_' + i + '" value="' + prod.name + '">'
				dinamic += '<input type="hidden" name="amount_' + i + '" value="' + prod.price + '">'
				dinamic += '<input type="hidden" name="item_number_' + i + '" value="' + prod.id + '" />'
				dinamic += '<input type="hidden" name="quantity_' + i + '" value="' + prod.cant + '" />'
				dinamic += '<input type="hidden" name="cname_' + i + '" value="' + prod.cname + '" />'
				dinamic += '<input type="hidden" name="smname_' + i + '" value="' + prod.smname + '" />'
				dinamic += '<input type="hidden" name="timestamp_' + i + '" value="' + prod.timestamp + '" />'
				dinamic += '<input type="hidden" name="ponumber' + i + '" value="' + prod.ponumber + '" />'
				i++;
			})

			statics += dinamic + '<button type="submit" class="pay btn btn-success">Submit  <i class="ion-chevron-right"></i></button></form>'

			wrapper.html(statics)
		}


	}

	$(document).ready(function () {
		app.init()
		//app.checkItems()

		app.updatePayForm()
		app.createProducts()
		app.getProducts()

	})

})(jQuery)