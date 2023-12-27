import json
from flask import Flask, request, jsonify
from flask_cors import CORS
# from nlptosql import  execute_sql_statement, nlp_to_sql ,start
app = Flask(__name__)
CORS(app)
# Sample table names (replace this with your actual table names)
table_names = ['BKPF','MSEG','BSEG','KNA1','KNB1','MARA''MAKT','T001','T001W','T005T','T006',"VBAK","ACDOCA","VBAP","MARA"]

@app.route('/tables', methods=['GET'])
def get_tables():
    return jsonify(table_names)

@app.route('/process', methods=['POST'])
def process_data():
    data = request.get_json()
    selected_tables = data.get('selectedTables', [])
    print(selected_tables)
    selected_tables_list = selected_tables

    # start(selected_tables)
    print(1)
    return selected_tables

@app.route('/nlpquery',methods=['POST'])
def nlpquery():

    data = request.get_json()
    print(data)
    print(1)
    prompt = data.get('userPrompt', '')
    # prompt = request.get['prompt']
    print(prompt)
    # sqlQuery=nlp_to_sql(prompt)
    # sql_statement=sqlQuery
    return prompt

@app.route('/displaytables', methods=['GET'])
def displaytables():

    table_data = [{"MANDT":200,"VBELN":977,"POSNR":101,"MATKL":"CON","ARKTX":"SOCKET MS 21-2\"BSP(FEMALE)","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":104,"MATKL":"CON","ARKTX":"TAP SET 1-2\" BSP","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":112,"MATKL":"CON","ARKTX":"HYD HOSE 11-2\" X 1.1MTR 4SH","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":110,"MATKL":"CON","ARKTX":"CONTACTOR -32AMP, 3POLE","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":117,"MATKL":"CON","ARKTX":"STARTER S10 (4-65W)","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":118,"MATKL":"CON","ARKTX":"DRILL BIT HS.S.S.3.2MM","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":140,"MATKL":"CON","ARKTX":"TEE GI 1","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":158,"MATKL":"CON","ARKTX":"LINE TESTER","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":161,"MATKL":"CON","ARKTX":"BOTTLE FUSE","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":167,"MATKL":"CON","ARKTX":"BALLAST 20W","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":172,"MATKL":"CON","ARKTX":"HAND SHOVEL","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":183,"MATKL":"CON","ARKTX":"BATTERY-AAA","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":227,"MATKL":"CON","ARKTX":"TAP SET 10MM","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":228,"MATKL":"CON","ARKTX":"TAP SET 16MM","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":238,"MATKL":"CON","ARKTX":"HUB NUT 20MM","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":280,"MATKL":"CON","ARKTX":"ARBOR BIT A-4","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":291,"MATKL":"CON","ARKTX":"DRILL BIT 1MM","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":298,"MATKL":"CON","ARKTX":"THERMOSTAT AC","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":326,"MATKL":"CON","ARKTX":"DRILL BIT 14MM","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"},
 {"MANDT":200,"VBELN":977,"POSNR":339,"MATKL":"CON","ARKTX":"DRILL BIT 22MM","PSTYV":"TAN","FKREL":"A","UEPOS":0,"GRPOS":0,"ZIEME":"ST","MEINS":"ST"}]
    return jsonify({'tables': table_data})
if __name__ == '__main__':
    app.run(debug=True)
