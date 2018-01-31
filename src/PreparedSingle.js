const client = require('./client');

module.exports = class PreparedSingle {
    constructor ({query, variable_types, rows, column_types, result, consistency, variables} = {}) {
        this.query = query;
        this.variable_types = variable_types;
        this.column_types = column_types;
        this.consistency = consistency;
        this.variables = variables;
        this.rows = rows || [];
        this.result = result || 'success';
    }

    async prime({rows = this.rows, result = this.result} = {}) {
        const query = this.query;
        const variable_types = this.variable_types;
        const column_types = this.column_types;

        await client.primePreparedSingle({query, variable_types, rows, result, column_types});
    }

    async getExecutions({consistency = this.consistency, variables = this.variables} = {}) {
        const query = this.query;
        const variableTypes = this.variable_types;
        return client.getPreparedStatementExecution({query, consistency, variables, variableTypes});
    }
};