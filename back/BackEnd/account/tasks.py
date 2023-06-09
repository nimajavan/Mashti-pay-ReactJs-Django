from BackEnd.celery import app
from kavenegar import KavenegarAPI


@app.task(name='send_sms_task')
def send_sms_task(phone_num, random_num):
    api = KavenegarAPI(
        '77634E51555442727237775751353472616B6C61306F5037565169563431326B79697A50434C785A5473413D')
    params = {'sender': '10008663', 'receptor': phone_num, 'message': random_num}
    api.sms_send(params)
