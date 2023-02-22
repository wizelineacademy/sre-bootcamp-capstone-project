# Setup

## Install dependencies

``` bash
pip3 install -r requirements.txt
```

## Setup dotenv (environment variables)

Copy the .env.example file to .env

``` bash
cp .env.example .env
```
Replace the values of the variables in the .env file

## Run project

``` bash
python3 api.py
```

## Endpoints

- [post] /login
- [get] /_health
- [get] /cidr-to-mask?value=?
- [get] /mask-to-cidr?value=?

