const helpers = {
    //It is not possible to use nested helpers in hbs
    /* ifCond: (value1, value2, options) => {
        console.log(value1 + " && " + value2);
        if (value1 === value2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }, */
    eachState: (states, stateDriverResidence, options) => {
        var options = '';
        states.forEach(state => {
            if (state.id == stateDriverResidence) {
                options = options +
                    '<option value=\"' + state.id + '\"selected>'
                    + state.name +
                    '</option> \n';
            } else {
                options = options +
                    '<option value=\"' + state.id + '\">'
                    + state.name +
                    '</option> \n';
            }
        });
        return options;
    }
};

module.exports = helpers;