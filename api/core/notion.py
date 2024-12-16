from api.core.config import settings
from notion_client import Client

NOTION_TOKEN = settings.notion_token
NOTION_DATABASE_ID = settings.notion_database_id

notion = Client(auth=NOTION_TOKEN)

def get_cyc_roster():
    return notion.databases.query(database_id=NOTION_DATABASE_ID)["results"]