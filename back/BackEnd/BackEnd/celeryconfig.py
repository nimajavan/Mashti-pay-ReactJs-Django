broker_url = 'redis://redis:6379'
result_backend = 'redis://redis:6379'
task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']
timezone = 'Europe/Oslo'
enable_utc = True
imports = ('account.tasks')