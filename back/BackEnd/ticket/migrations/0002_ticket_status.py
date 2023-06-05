# Generated by Django 4.1.7 on 2023-06-04 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ticket', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='status',
            field=models.CharField(choices=[('in progress', 'In Progress'), ('done', 'Done')], default='in progress', max_length=50),
        ),
    ]
