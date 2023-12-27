import sqlite3
import openai
from hdbcli import dbapi
from flask import g
import os
con = dbapi.connect(address='172.26.0.121', port=32015, user='SAPABAP1', password='Pa55w0rd')
file_path="/Users/nithin/Desktop/NLPusecase/querygpt/files/details.txt"
def get_table_details(con, table_name, file_path):
    cur = con.cursor()
    cur.execute(f"""SELECT TABLE_NAME, COLUMN_NAME , DDTEXT 
                FROM "_SYS_BIC"."AG_MELCO_DEMO/ZCV_NEW_TABLE" 
                Where "TABLE_NAME" = '{table_name}'""")
    res = cur.fetchall()

    with open(file_path, 'a') as file:
        file.write(f"\nTable Name: {table_name}\n")
        for item in res:
            file.write(f"{item}\n")

    print(f"Details for table '{table_name}' added to the file.")


# for table_name in selected_tables:
#     get_table_details(con, table_name, file_path)
def start(var):
    for table_name in var:
        get_table_details(con, table_name, file_path)
def execute_sql_statement( sql_statement):

    con = dbapi.connect(address='172.26.0.121', port=32015, user='SAPABAP1', password='Pa55w0rd')
    cursor = con.cursor()
    cursor.execute(sql_statement)
    result = cursor.fetchall()
    con.commit()
    file_path="/Users/nithin/Documents/DataEngineering/QueryCraft/files/sqlresult.txt"
    column_names = [column[0] for column in cursor.description]
    
    # with open(file_path, 'w') as file:
    #     result_list_of_dicts = [dict(zip(column_names, row)) for row in result]
    #     file.write(result_list_of_dicts)
    print(result)
    print(column_names)
    return result,column_names

def nlp_to_sql(query):
    file_path = "/Users/nithin/Desktop/NLPusecase/querygpt/files/details.txt"
    with open(file_path, "r") as file:
        file_content = file.read()
    response = openai.Completion.create(
    model="text-davinci-003",
    #prompt=f"Given the following SQL tables their column names and their description {file_content}, your job is to write SQL queries based on the nlp provided {query}.user query will be the description of the column name so provide the proper variable corresponding to the column name  ",
    prompt=f"Given the list of sap table name columname and their description in the format ('TAble_name', 'Column Name', 'Column description')  {file_content}your job is to convert the user query{query}into SQL statement based on the values and provide  the proper column name in the statement not the description, while providing  the sql statement add doublke quotes to the column name",
 
   max_tokens=500


    )
    sql_query = response.choices[0].text.strip()

    return sql_query
