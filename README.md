# Galizon App

Aplicación para gestionar la venta de diferentes productos de una tienda virtual. Todos los productos disponibles en esta aplicación proceden de https://fakestoreapi.com/. El proyecto se ha desarrollado empleando NextJS. Para gestionar los diferentes clientes que pueden acceder a la aplicación, se ha utilizado NextAuth.js (el registro en la aplicación se lleva a cabo empleado una cuenta de google). Para almacenar los diferentes pedidos se ha utilizado MongoDB. La gestión del pago de los diferentes pedidos se lleva a cabo mediante Stripe.

### Características de la Aplicación

Se puede navegar por la aplicación sin logearse, pero para poder efectuar el pedido, es necesario estar registrado correctamente en la aplicación.

Una vez el cliente se ha logeado y tiene un pedido preparado, puede acceder a la pasarela de pago (Stripe) empleando los siguientes datos para la tarjeta de crédito.

| Número de la tarjeta | MM/AA | CVC |
| -------------------- | ----- | --- |
| 4242 4242 4242 4242  | 12/24 | 123 |
