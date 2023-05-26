"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token 
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)


@api.route('/protected', methods=['POST', 'GET'])
# decorator on private routes
@jwt_required()
# Protect a route with jwt_required, which will kick out requests
def handle_hello():

    response_body = {
        "message": "Now... any endpoint that requires authorization (private endpoints) should use the @jwt_required() decorator."
    }

    return jsonify(response_body), 200


@api.route("/register", methods=["POST"])
def new_user():
    rb = request.get_json()
    existing_user = User.query.filter(email=rb["email"]).first()
    if existing_user:
        return "Üser email address is already in use", 200
    new_user = User(email=rb["email"], password= generate_password_hash(rb["password"]), is_active=True)
    db.session.add(new_user)
    db.session.commit()
      # create a new token with the user id inside
    access_token = create_access_token(identity=new_user.email)
    return jsonify({ "token": access_token}), 200


@api.route("/login", methods=["POST"])
def user_login():
    rb = request.get_json()
    existing_user = User.query.filter_by(email=rb["email"]).first()
    if existing_user:
       if check_password_hash(existing_user.password, rb['password']) :
           # create a new token with the user id inside
            access_token = create_access_token(identity=existing_user.email)
            return jsonify({ "token": access_token}), 200
       else : return ('password not recognised')
    else : return ('user doesnt exist')   

           
      


@api.route("/token", methods=["POST", "GET"])
def make_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
   

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
        dictionary = {
            "message": "PRIVATE ROUTE"
        }
        return jsonify(dictionary)


