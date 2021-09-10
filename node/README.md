# Setup
### Install dependencies.
```bash
npm install
```
### Setup dotenv (environment vars).
Copy the file .env.example to .env
```bash
cp .env.example
```
Remplace the values of the vars in the .env file.

### Run proyect.
```bash
npm start
```

### Endpoints
- [post] /login
- [get] /_health
- [get] /mask/${cidr}
- [get] /cidr/${mask}
