import hashlib
import jwt
class Token:
    def generateToken(self, username, input_password, Query):  
        usefulKey = 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW'
        if Query!=None:
            salt=Query[0][0]
            password=Query[0][1]
            role=Query[0][2]  
            hashPass=hashlib.sha512((input_password+salt).encode()).hexdigest()
            if hashPass==password:
                enJWT = jwt.encode({"role": role}, usefulKey, algorithm='HS256')
                return enJWT
            else:
                return False
        else:
            return False
class Restricted:
    def access_Data(self, authorization): 
        try:
            var1=jwt.decode(authorization.replace('Bearer', '')[2:-1], 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW', algorithms='HS256')
        except Exception as e:
            return False
        if 'role' in var1:
            return True  
        else:
            return False
