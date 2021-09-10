from flask import *   
from convert import *  
from methods import *  
from convert import *
import mysql.connector

app = Flask(__name__)
login = Token()
protected = Restricted()
convert = CidrMaskConvert()
validate = IpValidate()


# Just a health check
@app.route("/")
def urlRoot():  
    return "OK"
# Just a health check
@app.route("/_health")
def urlHealth():
    return "OK"  
# e.g. http://127.0.0.1:8000/login
@app.route("/login", methods=['POST'])
def urlLogin():
    var1 = request.form['username']
    var2 = request.form['password']
    # This database data is here just for you to test, please, remember to define your own DB
    # You can test with username = admin, password = secret  
    # This DB has already a best practice: a salt value to store the passwords
    con = mysql.connector.connect(
        host='bootcamp-tht.sre.wize.mx',
        user='secret',
        password='noPow3r',
        database='bootcamp_tht'  
    )
    cursor=con.cursor()
    cursor.execute(f"SELECT salt, password, role from users where username ='{var1}';")
    Query= cursor.fetchall()
    var3 = login.generateToken(var1, var2, Query)
    if var3 is not False:
        r = {"data": var3}
        return jsonify(r)
    abort(401)  
# e.g. http://127.0.0.1:8000/cidr-to-mask?value=8
@app.route("/cidr-to-mask")
def urlCidrToMask():
    var1 = request.headers.get('Authorization')
    if not protected.access_Data(var1):
        abort(401)   
    val = request.args.get('value')
    r = {"function": "cidrToMask","input": val,"output": convert.cidr_to_mask(val), }
    return jsonify(r)  
# # e.g. http://127.0.0.1:8000/mask-to-cidr?value=255.0.0.0
@app.route("/mask-to-cidr")
def urlMaskToCidr():  
    var1 = request.headers.get('Authorization')
    if not protected.access_Data(var1):
        abort(401) 
    val = request.args.get('value')
    r = { "function": "maskToCidr","input": val,"output": convert.mask_to_cidr(val),}
    return jsonify(r)
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)

