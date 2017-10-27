# Puriya

Generator of express for basic setup of routes and features as well as a basic structure of whole node application for api design .

### Tech

Puriya uses a number of open source projects to work properly:


* [Node.js](https://www.nodejs.org) - evented I/O for the backend
* [Express](https://www.expressjs.com)  - fast node.js network app framework 


And of course Puriya  itself is open source with a [public repository](https://github.com/sudofy/puriya)
 on GitHub.

### Installation

Puriya requires [Node.js](https://nodejs.org/) and  [Npm](https://www.npmjs.com) to run.

How to install Puriya ?

```sh
> $ npm install -g puriya
```
### Quick Start
The quickest way to scaffold your application by following command as shown below:

```sh
> $ sudofy-api name
```
name should be entered by user ,no default value.
After that :
```sh
> $ Name:(generator) 
```
Application name is entered by user that is the name of application ,otherwise default value is 'Generator'.
```sh
> $ Mongo Url :
```
Mongo url is  the url that is needed for database connection ,default value is 
mongodb://localhost:27017/test.
```sh
> $ Secret Key :
```
Secret key is entered by user ,otherwise default secret key is 864a6s8d^&%*%$&aASU((*&uih .
```sh
> $ Seal Pass :
```
Seal Pass is enetered by user ,otherwise default seal pass is 
84a98sd4*&&%%*(%^*%^&asdas{}>894a*(*$@@8adYG&^&ASFDasd89dad.

After that all files are created .

### How to Run 
For running the application you have to verify that your mongodb is running ,otherwise your application might crashed .
Make sure that you are in the bin folder and first install node_modules folder by following command 
```sh
> $ npm install
```
After that you have to type the following command 
```sh
> $ node www
```
### How to Add Feature 
For Adding features make sure you are in the applcation folder ,then type the following command
```sh
> $ sudofy-api-feature name-of-feature
```
Name of feature is the feature that user want to create ,no default value exist .
After that 
```sh
> $ Number of data :
```
Number of data means how many key-values add in the mongoose schema ,and it should be entered by user,numeric value is only allowed.

```sh
> $ Keyname :
```
Keyname should be entered by user ,empty value is not acceptable.
```sh
> $ Type of data
```
Type of data should be selected from the given list ,if user select '0'
then list is prompt again .
After that All files related to particular feature are created.

### How to Add Route
For Adding features make sure you are in the applcation folder ,then type the following command
```sh
> $ sudofy-api-router name-of-route
```
Name of route is the name of route that user want to create, no-default value exist . But before creating a particular route ,feature should be added with same name before creating a route.
After that if a feature is already created than 
```sh
> $ Name for function :
```
Method name is entered by user that is tha name of method  
```sh
> $ Type of Route :
```
Type of route should be selected from the given list
```sh
> $ Enter Route :
```
User should enter a route here
```sh
> $ Enter query :
```
Type of query method should be selected from the given list 
```sh
> $ Enter query model :
```
Query model should be entered by user .


