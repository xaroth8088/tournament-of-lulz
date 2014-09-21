""" This is a thin wrapper around the MySQL connector library.
    This serves two major purposes:
        1) It permits a common abstraction point for things like connection pooling, automatic backtrace comments, SQL
            minification, logging, etc.
        2) It simplifies unit testingby removing the need to mock everything about the MySQL connector library.
"""

import mysql.connector


def get_connection(config):
    if config['database'].get('unix_socket', None):
        connection = mysql.connector.connect(user=config['database']['user'],
                                             database=config['database']['schema'],
                                             password=config['database']['password'],
                                             unix_socket=config['database']['unix_socket'],
                                             autocommit=True)
    else:
        connection = mysql.connector.connect(user=config['database']['user'],
                                             database=config['database']['schema'],
                                             password=config['database']['password'],
                                             host=config['database']['host'], port=config['database']['port'],
                                             autocommit=True)

    return connection


def fetchall(connection, sql, params=None):
    cursor = connection.cursor()
    cursor.execute(sql, params)
    data = cursor.fetchall()
    return data


def fetchone(connection, sql, params=None):
    cursor = connection.cursor()
    cursor.execute(sql, params)
    row = cursor.fetchone()
    return row


def update(connection, sql, params=None):
    cursor = connection.cursor()
    cursor.execute(sql, params)
    return cursor.rowcount


def insert(connection, sql, params=None):
    cursor = connection.cursor()
    cursor.execute(sql, params)
    return cursor.lastrowid


def delete(connection, sql, params=None):
    cursor = connection.cursor()
    cursor.execute(sql, params)
    return cursor.rowcount
