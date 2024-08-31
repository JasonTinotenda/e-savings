from django.urls import path
from .views import (
    PersonListView, PersonDetailView, PersonCreateView, PersonUpdateView, PersonDeleteView,
    AccountListView, AccountDetailView, AccountCreateView, AccountUpdateView, AccountDeleteView
)

urlpatterns = [
    # Person URLs
    path('persons/', PersonListView.as_view(), name='person_list'),
    path('person/<int:pk>/', PersonDetailView.as_view(), name='person_detail'),
    path('person/create/', PersonCreateView.as_view(), name='person_create'),
    path('person/<int:pk>/edit/', PersonUpdateView.as_view(), name='person_update'),
    path('person/<int:pk>/delete/', PersonDeleteView.as_view(), name='person_delete'),

    # Account URLs
    path('accounts/', AccountListView.as_view(), name='account_list'),
    path('account/<int:pk>/', AccountDetailView.as_view(), name='account_detail'),
    path('account/create/', AccountCreateView.as_view(), name='account_create'),
    path('account/<int:pk>/edit/', AccountUpdateView.as_view(), name='account_update'),
    path('account/<int:pk>/delete/', AccountDeleteView.as_view(), name='account_delete'),
]
