module.exports = {
    "helpers": {
        "if_or": function (v1, v2, options) {
            if (v1 || v2) {
                return options.fn(this);
            }

            return options.inverse(this);
        }
    },
    "prompts": {
        "name": {
            "type": "string",
            "required": true,
            "message": "Project name"
        },
        "description": {
            "type": "string",
            "required": false,
            "message": "Project description",
            "default": "A Vue.js project"
        },
        "author": {
            "type": "string",
            "message": "Author"
        },
        "router": {
            "type": "confirm",
            "message": "Install vue-router?"
        },
        "vuex": {
            "type": "confirm",
            "message": "Install vuex?"
        },
        "lodash": {
            "type": "confirm",
            "message": "Install Lodash?",
        },
        "ws": {
            "type": "confirm",
            "message": "Install ws?",
            "default": false
        }
    },
    "filters": {
        "server.js": "ws",
    },
    "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/Zper/vue-webpack-cli"
};