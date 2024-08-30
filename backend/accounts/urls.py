from django.urls import path
from . import views

urlpatterns = [
    # Person URLs
    path('persons/', views.PersonListView.as_view(), name='person_list'),
    path('persons/<int:pk>/', views.PersonDetailView.as_view(), name='person_detail'),
    path('persons/create/', views.PersonCreateView.as_view(), name='person_create'),
    path('persons/<int:pk>/update/', views.PersonUpdateView.as_view(), name='person_update'),
    path('persons/<int:pk>/delete/', views.PersonDeleteView.as_view(), name='person_delete'),

    # Account URLs
    path('accounts/', views.AccountListView.as_view(), name='account_list'),
    path('accounts/<int:pk>/', views.AccountDetailView.as_view(), name='account_detail'),
    path('accounts/create/', views.AccountCreateView.as_view(), name='account_create'),
    path('accounts/<int:pk>/update/', views.AccountUpdateView.as_view(), name='account_update'),
    path('accounts/<int:pk>/delete/', views.AccountDeleteView.as_view(), name='account_delete'),
]
