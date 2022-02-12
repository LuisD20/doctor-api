# Iniciar proyecto

Antes de iniciar el proyecto se debe tener instalado "nodemon", para iniciar el proyecto por defecto se inicia en modo "development", para cambiar la opcion a modo produccion debe correr el siguiente comando primero.

`npm run start:prod`

# Mailtrap (Verificacion de email)

Para empezar a trabajar con el proyecto se necesita crear una cuenta en mailtrap para poder tener las verificacion de email.

En mailtrap demtro de las SMTP settings en "integrations" escoger nodemailer y cambiar en el archivo .env las opciones de email por las suyas.

```
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_HOST=
EMAIL_PORT=
```