const {results} = require('./common');
const client = require('./client');

module.exports = class QuerySingle {
    constructor ({query, variable_types, rows, column_types, result, consistency, variables} = {}) {
        this.query = query;
        this.variable_types = variable_types;
        this.column_types = column_types;
        this.consistency = consistency;
        this.variables = variables;
        this.rows = rows || [];
        this.result = result || results.success;
    }

    async prime({rows = this.rows, result = this.result} = {}) {
        const query = this.query;
        const variable_types = this.variable_types;
        const column_types = this.column_types;

        await client.primeQuerySingle({query, variable_types, rows, result, column_types});
    }
};