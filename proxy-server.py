from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_request(path):
    base_url = 'https://afro.fjelltopp.org/'
    url = f'{base_url}{path}'

    if request.method == 'GET':
        response = requests.get(url, params=request.args)
    elif request.method == 'POST':
        response = requests.post(url, json=request.json)
    elif request.method == 'PUT':
        response = requests.put(url, json=request.json)
    elif request.method == 'DELETE':
        response = requests.delete(url, params=request.args)

    return jsonify(response.json()), response.status_code


if __name__ == '__main__':
    app.run()
