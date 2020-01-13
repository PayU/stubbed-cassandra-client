const _ = require('lodash');
const Promise = require('bluebird');

const config = require('./src/config');
const commonQueries = require('./src/common-queries');
const client = require('./src/client');
const QuerySingle = require('./src/QuerySingle');
const PreparedSingle = require('./src/PreparedSingle');
const constants = require('./src/common');

module.exports = {
    queries: undefined,
    constants,
    init,
    primeAll,
    resetAll,
    resetHistory,
    QuerySingle,
    PreparedSingle
};

function init({
    queries,
    scassanadra_address,
    cassandra_keyspace,
    init_cassandra_driver,
    init_cassandra_migration
} = {}) {
    const options = { queries, scassanadra_address, cassandra_keyspace, init_cassandra_driver, init_cassandra_migration };
    validateParams(options);
    config.init(options);
    client.init(options);
}

async function primeAll() {
    const { init_cassandra_driver, init_cassandra_migration } = config;
    await resetAll();
    await Promise.all([
        commonQueries.init({ init_cassandra_driver, init_cassandra_migration }),
        prepareAllQueries(config.queries)

    ]);
    await client.resetHistory();
}

function validateParams({
    queries,
    scassanadra_address,
    cassandra_keyspace,
    init_cassandra_migration
}) {
    const queriesNotValid = _.some(queries, query => {
        return !(query instanceof PreparedSingle) &&
            !(query instanceof QuerySingle);
    });
    if (queriesNotValid) {
        throw new Error('`queries` must be an Object of key-value, while value is QuerySingle/PreparedSingle');
    }
    if (!scassanadra_address) {
        throw new Error('scassanadra_address is mandatory');
    }
    if (init_cassandra_migration === true && !cassandra_keyspace) {
        throw new Error('cassandra_keyspace is mandatory');
    }
}

async function prepareAllQueries(queries) {
    await Promise.map(Object.keys(queries), key => {
        return queries[key].prime();
    });
}

async function resetAll() {
    await client.reset();
};

async function resetHistory() {
    await client.resetHistory();
};
