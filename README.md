## Task
Create web-app for e-shop with admin panel.

## Stack
### Backend:
JavaScript, Node.js, Express.js, REST API, Sessions, JSON validation, AJAX, MongoDB
### Libraries:
Mongoose, AJV, crypto, deep-freeze, multer for images.
### Frontend:
JavaScript, EJS, localStorage, Sass (SCSS).

## Description

### Backend
There was created Node.js app with Express.js using MVC. There were created next modules:
-	Server module: contain main app file with base configurations of app;
-	Configuration module: contain configuration of: PORT, deepfreeze and connection to DB;
-	Model module: created models of DB entities in MongoDB - clients, categories, comments, enterprises, images, products, sessions, sizes;
-	Controller module: created functions of interaction with the DB entities (CRUD);
-	Routes module: built REST API architecture using POST and GET methods, made middleware to check if a user is logged in by session ID to enter a personal page.
-	Schemas module: create JSON validation scheme for validate the data from front.

### Frontend
There were made view of web-site using EJS, local Storage, session Storage and own styles by Sass (SCSS):
1)	Sign in and Sign up forms for users. There was used session ID to identify user on web-site;
2)	view of web-site with goods and user authorizations block;
3)	view of admin panel with forms (inputs, selection/options) to manage products, categories, images, sizes;
page for separate good with its information and possibility to create comments for the goods for logged users.


## Environment
Clone project to your machine. Use npm install to add all dependencies in project and open web-app.

## View
Sign up / Sign in forms

![image](https://user-images.githubusercontent.com/46706194/147138111-03040238-47db-4937-b4e0-887a9133642c.png)
![image](https://user-images.githubusercontent.com/46706194/147138131-f468fe6a-1523-4de1-b422-5ce537b20e90.png)

Shop-page with goods

![image](https://user-images.githubusercontent.com/46706194/147137634-8fcfe74e-30d5-4061-a4d4-63cbd2294538.png)
![image](https://user-images.githubusercontent.com/46706194/147137837-a74f12a8-6ca2-4b3c-85e0-12780fd13727.png)

Admin panel

![image](https://user-images.githubusercontent.com/46706194/147137910-626531ce-a4fb-4cbd-8aa7-95b9a16f7bc5.png)
![image](https://user-images.githubusercontent.com/46706194/147137930-c3b71154-6211-4b81-b0a3-8c4eb4d109fb.png)
![image](https://user-images.githubusercontent.com/46706194/147137943-78e06ec5-6780-4420-97fe-d0d4ae884c96.png)
![image](https://user-images.githubusercontent.com/46706194/147137995-eca91114-cf2f-45c9-b2b1-47ca9ce01533.png)
![image](https://user-images.githubusercontent.com/46706194/147138009-6e1da0c5-0b04-40ad-890c-00a420574f0c.png)
