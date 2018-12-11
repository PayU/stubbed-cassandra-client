const RESULTS = {
    success: 'success',
    read_request_timeout: 'read_request_timeout',
    write_request_timeout: 'write_request_timeout',
    unavailable: 'unavailable',
    server_error: 'server_error',
    protocol_error: 'protocol_error',
    bad_credentials: 'bad_credentials',
    overloaded: 'overloaded',
    is_bootstrapping: 'is_bootstrapping',
    truncate_error: 'truncate_error',
    syntax_error: 'syntax_error',
    unauthorized: 'unauthorized',
    invalid: 'invalid',
    config_error: 'config_error',
    already_exists: 'already_exists',
    unprepared: 'unprepared',
    closed_connection: 'closed_connection'
};

module.exports.cassandra_version = '3.0.10';
module.exports.results = RESULTS;
module.exports.errors_array = Object.keys(RESULTS);
module.exports.consistency = {
    any: 'ANY',
    one: 'ONE',
    two: 'TWO',
    three: 'THREE',
    quorum: 'QUORUM',
    all: 'ALL',
    localQuorum: 'LOCAL_QUORUM',
    eachQuorum: 'EACH_QUORUM',
    serial: 'SERIAL',
    localSerial: 'LOCAL_SERIAL',
    localOne: 'LOCAL_ONE'
};