const QuerySingle = require('./QuerySingle');
const common = require('./common');
const { cassandra_keyspace } = require('./config');

module.exports.init = async ({ init_cassandra_driver, init_cassandra_migration } = {}) => {
    let p1, p2, p3, p4, p5, p6;

    // Cassandra Driver related queries
    if (init_cassandra_driver === true) {
        p1 = new QuerySingle({
            query: "SELECT * FROM system.local WHERE key='local'",
            variable_types: ['uuid', 'varchar', 'set<uuid>', 'set<uuid>', 'uuid', 'varchar', 'uuid', 'timestamp'],
            column_types: { tokens: 'set<text>' },
            rows: [
                {
                    'cluster_name': 'custom cluster name',
                    'partitioner': 'org.apache.cassandra.dht.Murmur3Partitioner',
                    'data_center': 'dc1',
                    'rack': 'rc1',
                    'tokens': [
                        '1743244960790844724'
                    ],
                    'release_version': '2.0.1'
                }
            ]
        }).prime();
        p2 = new QuerySingle({
            query: 'SELECT peer,data_center,rack,tokens,rpc_address,release_version FROM system.peers'
        }).prime();
        p3 = new QuerySingle({
            query: 'SELECT key from system.local'
        }).prime();
    }

    // Migration related queries
    if (init_cassandra_migration === true) {
        p4 = new QuerySingle({
            query: 'SELECT * FROM system.schema_keyspaces'
        }).prime();
        p5 = new QuerySingle({
            query: `USE "${cassandra_keyspace}"`
        }).prime();
        p6 = new QuerySingle({
            query: 'SELECT release_version FROM system.local',
            rows: [{
                release_version: common.cassandra_version
            }]
        }).prime();
    }
    await Promise.all([p1, p2, p3, p4, p5, p6]);
};