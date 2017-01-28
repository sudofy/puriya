var cs = '' ;

var makeCSS = function () {

    cs = `body {
  padding: 50px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

a {
  color: #00B7FF;
}
`;

    return cs ;
};

module.exports = makeCSS;