import os
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow


uri = os.environ["SQLALCHEMY_DATABASE_URI"]
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app)
engine = db.engine
migrate = Migrate(app, db)
ma = Marshmallow(app)

class People(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pname = db.Column(db.String(80), unique=True, nullable=False)
    color = db.Column(db.String(120), nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128))

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    ingredients = db.Column(db.String(128), nullable=False)

#### SCHEMAS ####

class RecipeSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Recipe
    id = ma.auto_field()
    name = ma.auto_field()
    ingredients = ma.auto_field()





@app.route('/')
def greeting():
    # return '<a href="/addperson"><button>Click me</button></a>'
    return render_template("greeting.html")

@app.route('/postingrecipe')
def postingrecipe():
    return render_template("recipeform.html")

@app.route('/allrecipes')
def allrecipes():
    return render_template()







@app.route('/recipelist', methods=['GET'])
def retrieveRecipes():
    recipe_schema = RecipeSchema()
    recipes = Recipe.query.all()
    print(recipes)
    recipe_list = []
    for recipe in recipes:
        output = recipe_schema.dump(recipe)
        recipe_list.append(output)

    #output = recipe_schema.dump(recipes)
    #return jsonify({"recipes": output})
    return jsonify({"recipes": recipe_list})

@app.route('/recipepost', methods=['POST'])
def postRecipe():
    name = request.form['name']
    ingredients = request.form['ingredients']
    new_recipe = Recipe(name=name, ingredients=ingredients)
    recipe_schema = RecipeSchema()
    output = recipe_schema.dump(new_recipe)

    db.session.add(new_recipe)
    db.session.commit()

    return jsonify(output)




if __name__ == "__main__":
    db.create_all()
    app.run(host="0.0.0.0", debug=True)
