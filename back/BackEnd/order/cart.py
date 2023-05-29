from .models import DollarPrice, BuyOrder

CART_SESSION_ID = 'cart'


class Cart:
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(CART_SESSION_ID)
        if not cart:
            cart = self.session[CART_SESSION_ID] = {}
        self.cart = cart

    def add(self, order, quantity):
        order_id = str(order.id)
        if order_id not in self.cart:
            dollar = int(DollarPrice.objects.get(id=1).price)
            total = dollar * int(quantity)
            self.cart[order_id] = {'quantity': quantity, 'price': total, 'order_id': order_id}
        self.save()

    def remove(self, order_id):
        del self.cart[str(order_id)]
        self.save()

    def remove_all(self):
        self.session[CART_SESSION_ID] = {}
        self.save()

    def __iter__(self):
        order_id = self.cart.keys()
        print(order_id)
        orders = BuyOrder.objects.filter(id__in=order_id)
        for order in orders:
            self.cart[str(order.id)]['order'] = order

    def save(self):
        self.session.modified = True
