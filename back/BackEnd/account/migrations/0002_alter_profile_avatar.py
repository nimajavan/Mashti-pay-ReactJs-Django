# Generated by Django 4.1.7 on 2023-04-15 00:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(default='avatar/avatar.png', upload_to='profile/avatar/'),
        ),
    ]
