module.exports.init = ({
    queries,
    scassanadra_address,
    cassandra_keyspace,
    init_cassandra_driver,
    init_cassandra_migration
}) => {
    Object.assign(module.exports, { queries, scassanadra_address, cassandra_keyspace, init_cassandra_driver, init_cassandra_migration });
};

module.exports.scassanadra_address = undefined;
module.exports.cassandra_keyspace = undefined;
module.exports.queries = [];
module.exports.init_cassandra_driver = false;
module.exports.init_cassandra_migration = false;