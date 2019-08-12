# Final project -  Integration pattern module
SNACK is a series of web applications implemented so that customers can check the status of their transactions and various reports. 
The goal of the implementation is to reduce latency in response and manage the cadence of requests to avoid system outages.

The four projects were developed with the javascript framework NestJS using the "RabbitMQ RPC library" for communication with the RabbitMQ messaging system. We are using a horizontal architecture for the comunications.   

# Container Diagram
![image](https://drive.google.com/uc?export=view&id=1LIFyy5H4yR_P77OU7pmmbBg39bN8Tvt8)

# Projects:

### Consolidated_company_data
This project is used to get all the consolidated data of the customer.

Run developer mode:
- Go to the folder:
```sh
$ cd consolidated_company_data
```
- Install all node dependecies:
```sh
$ npm install
```
Run server in dev mode:
```sh
$ npm run start:dev
```

## Snack_main_company
This project is used to obtain snack data of the customer.

Run developer mode:

- Go to the folder:
```sh
$ cd snack_main_company
```
- Install all node dependecies:
```sh
$ npm install
```
- Run server in dev mode:
```sh
$ npm run start:dev
```
## Company_1
This project is used to obtain company_1 data of the customer.

Run developer mode:

- Go to the folder:
```sh
$ cd company_1
```
- Install all node dependecies:
```sh
$ npm install
```
- Run server in dev mode:
```sh
$ npm run start:dev
```
## Company_2 
This project is used to obtain company_2 data of the customer.

Run developer mode:

- Go to the folder:
```sh
$ cd company_2
```
- Install all node dependecies:
```sh
$ npm install
```
- Run server in dev mode:
```sh
$ npm run start:dev
```