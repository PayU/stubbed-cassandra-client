const rp = require('request-promise');
const _ = require('lodash');

let preparedStatementExecution;
let primePreparedStatement;
let primeQueryStatement;

module.exports.init = ({scassanadra_address}) => {
    preparedStatementExecution = rp.defaults({
        baseUrl: `http://${scassanadra_address}`,
        uri: '/prepared-statement-execution',
        json: true
    });
    primePreparedStatement = rp.defaults({
        baseUrl: `http://${scassanadra_address}`,
        uri: '/prime-prepared-single',
        json: true
    });
    primeQueryStatement = rp.defaults({
        baseUrl: `http://${scassanadra_address}`,
        uri: '/prime-query-single',
        json: true
    });
};

module.exports.primeQuerySingle = async ({query, consistency, variable_types, rows, result, column_types}) => {
    await primeQueryStatement.post({
        body: {
            when: { query, consistency },
            then: { variable_types, rows, result, column_types }
        }
    });
};
module.exports.primePreparedSingle = async ({query, consistency, variable_types, rows, result, column_types}) => {
    await primePreparedStatement.post({
        body: {
            when: { query, consistency },
            then: { variable_types, rows, result, column_types }
        }
    });
};

module.exports.getPreparedStatementExecution = async ({query, consistency, variables, variableTypes} = {}) => {
    const response = await preparedStatementExecution.get();

    const predicate = _.pickBy({
        preparedStatementText: query,
        variableTypes,
        consistency,
        variables
    });
    return _.filter(response, predicate);
};

module.exports.resetHistory = async () => {
    preparedStatementExecution.delete();
};

module.exports.reset = async () => {
    await Promise.all([
        preparedStatementExecution.delete(),
        primePreparedStatement.delete()
    ]);
};