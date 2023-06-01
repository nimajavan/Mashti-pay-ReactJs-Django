from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('account.urls', namespace='account')),
    path('api/v1/', include('order.urls', namespace='order')),
    path('api/v1/', include('ticket.urls', namespace='ticket')),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token')
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL,
                                                                                        document_root=settings.
                                                                                        MEDIA_ROOT)
