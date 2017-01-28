var error = '';
var index = '';
var layout = '';

var makeview = {

    makeError: function () {

        error = `extends layout
                block content
                  h1= message
                  h2= error.status
                  pre #{error.stack}
                `;

        return error;

    },

    makeIndex: function () {

        index = `extends layout
                
                block content
                h1= title
                p Welcome to #{title}
                
                `;

        return index;
    },
    makeLayout: function () {

        layout = `doctype html
                    html
                      head
                        title= title
                        link(rel='stylesheet', href='/stylesheets/style.css')
                      body
                        block content
                  `;

        return layout;
    }
};


module.exports = makeview;