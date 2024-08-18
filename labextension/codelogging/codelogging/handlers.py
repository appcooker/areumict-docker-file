import os
import json

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado


class RouteHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def post(self):
        # Get the raw query string
        raw_query = self.request.query
        print(raw_query)

        # Split the query string by '&' to handle multiple unnamed parameters
        unnamed_params = raw_query.split('&')
        
        # Filter out empty parameters and parse them
        unnamed_params = [param for param in unnamed_params if param]

        print(unnamed_params)

        # input_data is a dictionary with a key "code"
        input_data = self.get_json_body()
        print(input_data)

        input_data['query'] = unnamed_params
        timestamp = unnamed_params[0]

        user_ip = self.request.remote_ip
        input_data['ip'] = user_ip

        session = input_data['session']
        dir = f'../sessions/{session}'
        if not os.path.isdir(dir):
            print("make dir")
            os.makedirs(dir, exist_ok=True)
        with open(f"{dir}/{timestamp}.json", "w", encoding='utf-8') as json_file:
            json.dump(input_data, json_file, indent=2, ensure_ascii=False)

        data = {"greetings": "contents {}, enjoy JupyterLab!".format(input_data["code"])}
        self.finish(json.dumps(data))


def setup_handlers(web_app):
    host_pattern = ".*$"

    base_url = web_app.settings["base_url"]
    # Prepend the base_url so that it works in a JupyterHub setting
    route_pattern = url_path_join(base_url, "_", "contents")
    handlers = [(route_pattern, RouteHandler)]
    web_app.add_handlers(host_pattern, handlers)
