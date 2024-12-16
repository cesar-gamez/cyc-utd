from api.models.roster import Roster
from api.models.member import Member

def parse_roster(results):
    positions = {
        "executives": [],
        "senior_analysts": [],
        "junior_analysts": []
    }

    for page in results:
        props = page['properties']

        headshot = None
        if props.get('Headshot') and props['Headshot'].get('files'):
            headshot = props['Headshot']['files'][0].get('file', {}).get('url')

        member = Member(
            first_name=props.get('First Name', {}).get('title', [{}])[0].get('plain_text', ''),
            last_name=props.get('Last Name', {}).get('rich_text', [{}])[0].get('plain_text', ''),
            email=props.get('Email', {}).get('email', ''),
            major=props.get('Major', {}).get('rich_text', [{}])[0].get('plain_text', ''),
            graduation_year=props.get('Graduation Year', {}).get('number', None),
            linkedin=props.get('LinkedIn', {}).get('url'),
            headshot=headshot,
            position=props.get('Position', {}).get('rich_text', [{}])[0].get('plain_text', '')
        )
        
        if 'President' == member.position:
            positions['executives'].insert(0, member)
        elif 'President' in member.position:
            positions['executives'].append(member)
        elif 'Senior Analyst' in member.position:
            positions['senior_analysts'].append(member)
        elif 'Junior Analyst' in member.position:
            positions['junior_analysts'].append(member)

    return Roster(
        executives=positions['executives'],
        senior_analysts=sorted(positions['senior_analysts'], key=lambda x: x.first_name),
        junior_analysts=sorted(positions['junior_analysts'], key=lambda x: x.first_name)
    )