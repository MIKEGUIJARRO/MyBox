# MyBox
Web app implementation using mySQL, Nodejs, Express, Handlebars among others. This project aims to use the stack of technologies that I have learned until this moment (Local Auth, Routing, Form management, Database Queries).

## Scenario
You want to digitize the management of the transport company MiCaja.MX that distributes packages throughout Mexico.
The people in charge of carrying the packages are the truckers, from whom they want to keep: the INE, name, telephone, address, salary and state in which they live.
Of the packages transported, it is interesting to know: the package code (unique), description, Recipient's name, recipient's address, sender's name and sender's address.
A trucker distributes many packages and a package can only be distributed by a trucker.
Of the states to which the packages arrive, it is interesting to keep the state code and
the name of the state.
A package can only reach one state. However, several packages can reach one State.
Of the trucks that truckers carry, it is interesting to know the license plate, model, type of truck and wheeled.
A trucker may drive different trucks on different dates, and one truck may be driven by multiple truckers.

## Entity Relationship Diagram
![Alt text](Entity-diagram.png?raw=true "Relationship Diagram")
## Relational Diagram
![Alt text](Relational-diagram.png?raw=true "Relational Diagram")
## MySQL
The Databases and tables scripts can be found at /databases/db.sql
