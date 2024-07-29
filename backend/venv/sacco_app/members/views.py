from django.shortcuts import render,redirect
from django.views.generic import TemplateView

from members.forms import MemberForm
from .models import Member

def register_member(request):
    if request.method == 'POST':
        form = MemberForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('member_profile', member_id=form.instance.id)
    else:
       form = MemberForm()
    return render(request, 'members/register_member.html', {'form': form})

def member_profile(request, member_id):
    member = Member.objects.get(pk=member_id)
    return render(request, 'members/member_profile.html', {'member': member})