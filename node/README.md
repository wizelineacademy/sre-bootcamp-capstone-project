# Setup

## Install dependencies

``` bash
npm install
```

## Setup dotenv (environment variables)

Copy the .env.example file to .env

``` bash
cp .env.example .env
```
Replace the values of the variables in the .env file

## Run project

``` bash
npm start
```

## Endpoints

- [post] /login
- [get] /_health
- [get] /mask/${cidr}
- [get] /cidr/${mask}
